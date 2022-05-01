import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { getLpContract, getMilkyChefContract } from "utils/MilkyDexHelpers/contractHelpers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

function DepositButton({ pid, lpAddress, name, token, quoteToken }) {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [lpBalance, setLpBalance] = useState();
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3(window.ethereum);
  const FarmContract = getLpContract(lpAddress, chainId);
  const MilkyChefContract = getMilkyChefContract(chainId);

  async function getLpBalance() {
    const balance = await FarmContract.methods.balanceOf(account).call();
    setLpBalance(web3.utils.fromWei(balance, "ether"));
  }

  async function setMaxLPs() {
    document.getElementById("lpToDeposit").value = lpBalance;
  }

  async function stakeButtonState(e) {
    const value = Number(e.target.value);
    if (value > Number(lpBalance)) {
      document.getElementById(`stakeButton${pid}`).disabled = true;
    } else if (value <= 0) {
      document.getElementById(`stakeButton${pid}`).disabled = true;
    } else if (Number(lpBalance) > value > 0) {
      document.getElementById(`stakeButton${pid}`).disabled = false;
    }
  }

  async function stake() {
    const stakeValue = document.getElementById("lpToDeposit").value;
    if (stakeValue === " ") {
      console.log("შეიყვანეთ რაოდენობა!");
    } else if (Number(stakeValue) <= 0) {
      console.log("შეიყვანეთ რაოდენობა!");
    } else if (Number(stakeValue) > 0) {
      const lpToWei = web3.utils.toWei(stakeValue, "ether");
      await MilkyChefContract.methods
        .deposit(pid, lpToWei, account)
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById(`stakeButton${pid}`).disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById(`stakeButton${pid}`).disabled = false;
        })
        .on("error", (error) => {
          document.getElementById(`stakeButton${pid}`).disabled = false;
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
    if (active === true && chainId === 2001) {
      getLpBalance();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active, chainId]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiButton onClick={() => handleOpenWallet()} fullWidth variant="gradient" color="primary">
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
                <SuiInput id="lpToDeposit" onChange={(e) => stakeButtonState(e)} placeholder={`${name} რაოდენობა`} />
              </Grid>
              <Grid item>
                <SuiButton onClick={() => setMaxLPs()} color="info">
                  MAX
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
          <SuiBox>
            <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2">
              ბალანსი: {lpBalance}
            </SuiTypography>
          </SuiBox>
          <Divider />
          <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
            <SuiButton href={`https://pancakeswap.finance/add/${token}/${quoteToken}`} target="_blank" variant="outlined" color="primary">
              Get {name}
            </SuiButton>
            <SuiButton id={`stakeButton${pid}`} onClick={() => stake()} sx={{ ml: 1 }} variant="gradient" color="primary">
              STAKE
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

export default DepositButton;

DepositButton.propTypes = {
  pid: PropTypes.number.isRequired,
  lpAddress: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  quoteToken: PropTypes.string.isRequired,
};
