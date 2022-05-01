import { useState, useEffect, useRef } from "react";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import Modal from "@mui/material/Modal";
import Info from "components/Info";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { getCakeVaultV2 } from "utils/PancakeSwapHelpers/contractHelpers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

function WithdrawButton() {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [cakeBalance, setCakeBalance] = useState();
  const [withdrawFee, setWithdrawFee] = useState(Number);
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3(window.ethereum);
  const cakeVaultV2 = getCakeVaultV2(chainId);

  async function getStakedBalance() {
    const shares = await cakeVaultV2.methods.userInfo(account).call();
    const getPricePerFullShare = await cakeVaultV2.methods.getPricePerFullShare().call();
    const currentCake = web3.utils.fromWei(shares[0], "ether") * web3.utils.fromWei(getPricePerFullShare, "ether");
    setCakeBalance(currentCake);

    if (Number(currentCake) === 0) {
      document.getElementById("CakeVaultUnstakeButton").disabled = true;
    }
  }

  async function calculateWithdrawFee() {
    const shares = await cakeVaultV2.methods.userInfo(account).call();
    const getFee = await cakeVaultV2.methods.calculateWithdrawFee(account, shares[0]).call();
    setWithdrawFee(web3.utils.fromWei(getFee, "ether"));
  }

  async function withdraWFeeCalculator(e) {
    const calculate = (1 / 100) * Number(e.target.value);
    setWithdrawFee(calculate);
  }

  async function setMaxCakes() {
    document.getElementById("cakeToWithdraw").value = cakeBalance;
  }

  async function withdraw() {
    const getPricePerFullShare = await cakeVaultV2.methods.getPricePerFullShare().call();
    const getPricePerFullShareInEther = web3.utils.fromWei(getPricePerFullShare, "ether");
    const stakeValue = document.getElementById("cakeToWithdraw").value;
    const sharesValue = Number(stakeValue) / Number(getPricePerFullShareInEther);
    const sharesValueInWei = web3.utils.toWei(String(sharesValue), "ether");
    console.log(typeof stakeValue);
    console.log(typeof cakeBalance);
    if (Number(stakeValue) === cakeBalance) {
      await cakeVaultV2.methods
        .withdrawAll()
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById("CakeVaultWithdrawButton").disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("CakeVaultWithdrawButton").disabled = false;
        })
        .on("error", (error) => {
          document.getElementById("CakeVaultWithdrawButton").disabled = false;
          console.log("ERROR", error);
        })
        .then((receipt) => {
          console.log(receipt);
          if (receipt.status === true) {
            console.log("დადასტურდა");
          } else {
            console.log("არ დადასტურდა");
          }
        });
    } else {
      await cakeVaultV2.methods
        .withdraw(sharesValueInWei)
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById("CakeVaultWithdrawButton").disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("CakeVaultWithdrawButton").disabled = false;
        })
        .on("error", (error) => {
          document.getElementById("CakeVaultWithdrawButton").disabled = false;
          console.log("ERROR", error);
        })
        .then((receipt) => {
          console.log(receipt);
          if (receipt.status === true) {
            console.log("დადასტურდა");
          } else {
            console.log("არ დადასტურდა");
          }
        });
    }
  }

  const darkMode = localStorage.getItem("darkMode");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 311,
    bgcolor: darkMode === "dark" ? "#1c1c1c" : "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 2,
  };

  useEffect(() => {
    if (active === true && chainId === 56) {
      getStakedBalance();
      calculateWithdrawFee();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active, chainId]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiButton id="CakeVaultUnstakeButton" fullWidth onClick={() => handleOpenWallet()} variant="gradient" color="primary">
          -
        </SuiButton>
      ) : null}
      <Modal open={openWallet} onClose={handleCloseWallet} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SuiBox sx={style}>
          <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
            <SuiTypography mb={2} id="modal-modal-title" variant="h6" component="h2">
              გამოტანა
            </SuiTypography>
            <SuiTypography onClick={handleCloseWallet} sx={{ cursor: "pointer" }} mb={2} variant="h6" component="h2">
              X
            </SuiTypography>
          </SuiBox>
          <SuiBox>
            <Grid container spacing={2}>
              <Grid item>
                <SuiTypography sx={{ fontSize: 14 }}>რაოდენობა:</SuiTypography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item>
                <SuiInput id="cakeToWithdraw" placeholder="CAKE რაოდენობა" onChange={(e) => withdraWFeeCalculator(e)} />
              </Grid>
              <Grid item>
                <SuiButton onClick={() => setMaxCakes()} color="info">
                  MAX
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
          <SuiBox mt={1} mb={2}>
            <Info name="დასტეიკებული: " data={cakeBalance} />
          </SuiBox>
          {Number(withdrawFee) > 0 ? <Info name="Unstaking Fee: " data={`${Number(withdrawFee).toFixed(4)} CAKE`} /> : null}
          <Divider />
          <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
            <SuiButton id="CakeVaultWithdrawButton" onClick={() => withdraw()} sx={{ ml: 1 }} variant="gradient" color="primary">
              გამოტანა
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

export default WithdrawButton;
