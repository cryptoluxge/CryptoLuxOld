import { useState, useEffect, useRef } from "react";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { getManualBSWContract } from "utils/BiSwapHelpers/cotractHelpers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { getUserData } from "../Helpers";

function WithdrawButton() {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [bswBalance, setBswBalance] = useState();
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3(window.ethereum);
  const ManualBSWContract = getManualBSWContract(chainId);

  async function getStakedBalance() {
    const userData = await getUserData(account);
    setBswBalance(userData.currentBsw);
    if (Number(userData.currentBsw) === 0) {
      document.getElementById("unstakeButtonManualBSW").disabled = true;
    }
  }

  async function setMaxBsw() {
    document.getElementById("bswToWithdraw").value = bswBalance;
  }

  async function withdraw() {
    const stakeValue = document.getElementById("bswToWithdraw").value;
    const toWithdraw = web3.utils.toWei(stakeValue, "ether");
    console.log(toWithdraw);
    if (Number(stakeValue) === Number(bswBalance)) {
      await ManualBSWContract.methods
        .leaveStaking(toWithdraw)
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById("withdrawButtonAutoBSW").disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("withdrawButtonAutoBSW").disabled = false;
        })
        .on("error", (error) => {
          document.getElementById("withdrawButtonAutoBSW").disabled = false;
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
      await ManualBSWContract.methods
        .leaveStaking(toWithdraw)
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById("withdrawButtonAutoBSW").disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("withdrawButtonAutoBSW").disabled = false;
        })
        .on("error", (error) => {
          document.getElementById("withdrawButtonAutoBSW").disabled = false;
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
      getStakedBalance();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiButton id="unstakeButtonManualBSW" onClick={() => handleOpenWallet()} variant="gradient" color="primary">
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
                <SuiInput id="bswToWithdraw" placeholder="BSW რაოდენობა" />
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
              დასტეიკებული: {bswBalance}
            </SuiTypography>
          </SuiBox>
          <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2" fontWeight="bold">
            დასტეიკებულს და დაგროვებულ ტოკენებს გამოიტანთ ერთად!
          </SuiTypography>
          <Divider />
          <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
            <SuiButton id="withdrawButtonAutoBSW" onClick={() => withdraw()} sx={{ ml: 1 }} variant="gradient" color="primary">
              გამოტანა
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

export default WithdrawButton;
