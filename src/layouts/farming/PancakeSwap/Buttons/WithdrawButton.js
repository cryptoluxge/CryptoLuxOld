import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { getMasterChefV2 } from "utils/PancakeSwapHelpers/contractHelpers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

function WithdrawButton({ pid, buttonName }) {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [cakeBalance, setCakeBalance] = useState();
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3(window.ethereum);
  const ManualCAKEContract = getMasterChefV2(chainId);

  async function getStakedBalance() {
    const balance = await ManualCAKEContract.methods.userInfo(pid, account).call();
    setCakeBalance(web3.utils.fromWei(balance[0], "ether"));

    if (balance[0] === "0") {
      document.getElementById(`unstakeButton${pid}`).disabled = true;
    }
  }

  async function setMaxCakes() {
    document.getElementById("cakeToWithdraw").value = cakeBalance;
  }

  async function withdraw() {
    const stakeValue = document.getElementById("cakeToWithdraw").value;
    const cakeToWei = web3.utils.toWei(stakeValue, "ether");
    console.log(cakeToWei);
    await ManualCAKEContract.methods
      .withdraw(pid, cakeToWei)
      .send({ from: account })
      .once("sending", (payload) => {
        console.log(payload);
        document.getElementById("withdrawButton").disabled = true;
      })
      .once("transactionHash", (hash) => {
        console.log(hash);
        document.getElementById("withdrawButton").disabled = false;
      })
      .on("error", (error) => {
        document.getElementById("withdrawButton").disabled = false;
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
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active, chainId]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiButton id={`unstakeButton${pid}`} fullWidth onClick={() => handleOpenWallet()} variant="gradient" color="primary">
          {buttonName}
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
                <SuiInput id="cakeToWithdraw" placeholder="CAKE რაოდენობა" />
              </Grid>
              <Grid item>
                <SuiButton onClick={() => setMaxCakes()} color="info">
                  MAX
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
          <SuiBox>
            <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2">
              დასტეიკებული: {cakeBalance}
            </SuiTypography>
          </SuiBox>
          <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2" fontWeight="bold">
            დასტეიკებულს და დაგროვილ ტოკენებს გამოიტანთ ერთად!
          </SuiTypography>
          <Divider />
          <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
            <SuiButton id="withdrawButton" onClick={() => withdraw()} sx={{ ml: 1 }} variant="gradient" color="primary">
              გამოტანა
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

WithdrawButton.defaultProps = {
  buttonName: "-",
};

WithdrawButton.propTypes = {
  pid: PropTypes.number.isRequired,
  buttonName: PropTypes.string,
};

export default WithdrawButton;
