import { useState, useEffect, useRef } from "react";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { getBSWContract, getManualBSWContract } from "utils/BiSwapHelpers/cotractHelpers";

function DepositButton() {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [bswBalance, setBswBalance] = useState();
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3(window.ethereum);
  const BSWContract = getBSWContract(chainId);
  const ManualBSWContract = getManualBSWContract(chainId);

  async function getBswBalance() {
    const balance = await BSWContract.methods.balanceOf(account).call();
    setBswBalance(web3.utils.fromWei(balance, "ether"));
  }

  async function setMaxBsws() {
    document.getElementById("bswToDeposit").value = bswBalance;
  }

  async function stakeButtonState(e) {
    const value = Number(e.target.value);
    if (value > Number(bswBalance)) {
      document.getElementById("stakeButtonManualBSW").disabled = true;
    } else if (value <= 0) {
      document.getElementById("stakeButtonManualBSW").disabled = true;
    } else if (Number(bswBalance) > value > 0) {
      document.getElementById("stakeButtonManualBSW").disabled = false;
    }
  }

  async function stake() {
    const stakeValue = document.getElementById("bswToDeposit").value;
    if (stakeValue === " ") {
      console.log("შეიყვანეთ რაოდენობა!");
    } else if (Number(stakeValue) <= 0) {
      console.log("შეიყვანეთ რაოდენობა!");
    } else if (Number(stakeValue) > 0) {
      const bswToWei = web3.utils.toWei(stakeValue, "ether");
      await ManualBSWContract.methods
        .enterStaking(bswToWei)
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById("stakeButtonManualBSW").disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("stakeButtonManualBSW").disabled = false;
        })
        .on("error", (error) => {
          document.getElementById("stakeButtonManualBSW").disabled = false;
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
    if (active === true) {
      getBswBalance();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiButton onClick={() => handleOpenWallet()} variant="gradient" color="primary">
          +
        </SuiButton>
      ) : null}
      <Modal open={openWallet} onClose={handleCloseWallet} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SuiBox sx={style}>
          <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
            <SuiTypography mb={2} id="modal-modal-title" variant="h6" component="h2">
              დასტეიკება
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
                <SuiInput id="bswToDeposit" onChange={(e) => stakeButtonState(e)} placeholder="BSW რაოდენობა" />
              </Grid>
              <Grid item>
                <SuiButton onClick={() => setMaxBsws()} color="info">
                  MAX
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
          <SuiBox>
            <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2">
              ბალანსი: {bswBalance}
            </SuiTypography>
          </SuiBox>
          <Divider />
          <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
            <SuiButton href="https://exchange.biswap.org/#/swap?outputCurrency=0x965f527d9159dce6288a2219db51fc6eef120dd1" target="_blank" variant="outlined" color="primary">
              BSW-ის ყიდვა
            </SuiButton>
            <SuiButton id="stakeButtonManualBSW" onClick={() => stake()} sx={{ ml: 1 }} variant="gradient" color="primary">
              დასტეიკება
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

export default DepositButton;
