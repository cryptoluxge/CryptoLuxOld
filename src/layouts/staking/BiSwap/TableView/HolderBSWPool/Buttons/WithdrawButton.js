import { useState, useEffect, useRef } from "react";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { getBSWHolderPoolContract } from "utils/BiSwapHelpers/cotractHelpers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

function WithdrawButton() {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [bswBalance, setBswBalance] = useState();
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3(window.ethereum);
  const HolderBSWContract = getBSWHolderPoolContract(chainId);

  async function getStakedBalance() {
    const shares = await HolderBSWContract.methods.userInfo(account).call();
    const getPricePerFullShare = await HolderBSWContract.methods.getPricePerFullShare().call();
    const currentBsw = web3.utils.fromWei(shares[0], "ether") * web3.utils.fromWei(getPricePerFullShare, "ether");
    setBswBalance(currentBsw);
    if (currentBsw === 0) {
      document.getElementById("unstakeButtonHolderBSW").disabled = true;
    }
  }

  async function setMaxBsw() {
    document.getElementById("bswToWithdraw").value = bswBalance;
  }

  async function withdraw() {
    const getPricePerFullShare = await HolderBSWContract.methods.getPricePerFullShare().call();
    const getPricePerFullShareInEther = web3.utils.fromWei(getPricePerFullShare, "ether");
    const stakeValue = document.getElementById("bswToWithdraw").value;
    const sharesValue = Number(stakeValue) / Number(getPricePerFullShareInEther);
    const sharesValueInWei = web3.utils.toWei(String(sharesValue), "ether");
    console.log(typeof stakeValue);
    console.log(typeof bswBalance);
    if (Number(stakeValue) === bswBalance) {
      await HolderBSWContract.methods
        .withdrawAll()
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById("withdrawButtonHolderBSW").disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("withdrawButtonHolderBSW").disabled = false;
        })
        .on("error", (error) => {
          document.getElementById("withdrawButtonHolderBSW").disabled = false;
          console.log("ERROR", error);
        })
        .then((receipt) => {
          console.log(receipt);
          if (receipt.status === true) {
            console.log("??????????????????????????????");
          } else {
            console.log("?????? ??????????????????????????????");
          }
        });
    } else {
      await HolderBSWContract.methods
        .withdraw(sharesValueInWei)
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById("withdrawButtonHolderBSW").disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("withdrawButtonHolderBSW").disabled = false;
        })
        .on("error", (error) => {
          document.getElementById("withdrawButtonHolderBSW").disabled = false;
          console.log("ERROR", error);
        })
        .then((receipt) => {
          console.log(receipt);
          if (receipt.status === true) {
            console.log("??????????????????????????????");
          } else {
            console.log("?????? ??????????????????????????????");
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
    if (active === true) {
      getStakedBalance();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiButton id="unstakeButtonHolderBSW" onClick={() => handleOpenWallet()} variant="gradient" color="primary">
          -
        </SuiButton>
      ) : null}
      <Modal open={openWallet} onClose={handleCloseWallet} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SuiBox sx={style}>
          <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
            <SuiTypography mb={2} id="modal-modal-title" variant="h6" component="h2">
              ????????????????????????
            </SuiTypography>
            <SuiTypography onClick={handleCloseWallet} sx={{ cursor: "pointer" }} mb={2} variant="h6" component="h2">
              X
            </SuiTypography>
          </SuiBox>
          <SuiBox>
            <Grid container spacing={2}>
              <Grid item>
                <SuiTypography sx={{ fontSize: 14 }}>???????????????????????????:</SuiTypography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item>
                <SuiInput id="bswToWithdraw" placeholder="BSW ???????????????????????????" />
              </Grid>
              <Grid item>
                <SuiButton onClick={() => setMaxBsw()} color="info">
                  MAX
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
          <SuiBox>
            <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2">
              ????????????????????????????????????: {bswBalance}
            </SuiTypography>
          </SuiBox>
          <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2" fontWeight="bold">
            ???????????????????????????????????? ?????? ?????????????????????????????? ???????????????????????? ??????????????????????????? ???????????????!
          </SuiTypography>
          <Divider />
          <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
            <SuiButton id="withdrawButtonHolderBSW" onClick={() => withdraw()} sx={{ ml: 1 }} variant="gradient" color="primary">
              ????????????????????????
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

export default WithdrawButton;
