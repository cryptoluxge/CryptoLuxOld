import { useState, useEffect, useRef } from "react";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiBadge from "components/SuiBadge";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { getCakeContract, getCakeVaultV2 } from "utils/PancakeSwapHelpers/contractHelpers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

function LockCakeButton() {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [cakeBalance, setCakeBalance] = useState();
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3(window.ethereum);
  const CAKEContract = getCakeContract(chainId);
  const cakeVaultContract = getCakeVaultV2(chainId);

  async function getCakeBalance() {
    const balance = await CAKEContract.methods.balanceOf(account).call();
    setCakeBalance(web3.utils.fromWei(balance, "ether"));
  }

  async function setMaxCakes() {
    document.getElementById("cakeToDeposit").value = cakeBalance;
  }

  async function stakeButtonState(e) {
    const value = Number(e.target.value);
    if (value > Number(cakeBalance)) {
      document.getElementById("CakeVaultStakeButton").disabled = true;
    } else if (value <= 0) {
      document.getElementById("CakeVaultStakeButton").disabled = true;
    } else if (Number(cakeBalance) > value > 0) {
      document.getElementById("CakeVaultStakeButton").disabled = false;
    }
  }

  async function stakeButtonStateWeeks(e) {
    console.log(e);
    const value = Number(e.target.value);
    if (Number(value) < 1 || Number(value) > 52) {
      document.getElementById("CakeVaultStakeButton").disabled = true;
    } else {
      document.getElementById("CakeVaultStakeButton").disabled = false;
    }
  }

  async function setLockedDuration(week) {
    document.getElementById("lockDuration").value = week;
  }

  async function stake() {
    const MIN_LOCK_DURATION = 604800; // 1 ???????????????
    const stakeValue = document.getElementById("cakeToDeposit").value;
    const lockDuration = MIN_LOCK_DURATION * Number(document.getElementById("lockDuration").value);
    if (stakeValue === " ") {
      console.log("??????????????????????????? ???????????????????????????! 1");
    } else if (Number(stakeValue) <= 0) {
      console.log("??????????????????????????? ???????????????????????????! 2");
    } else if (Number(stakeValue) > 0 && Number(document.getElementById("lockDuration").value) <= 52) {
      const cakeToWei = web3.utils.toWei(stakeValue, "ether");
      await cakeVaultContract.methods
        .deposit(cakeToWei, lockDuration)
        .send({ from: account })
        .once("sending", (payload) => {
          console.log(payload);
          document.getElementById("CakeVaultStakeButton").disabled = true;
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("CakeVaultStakeButton").disabled = false;
        })
        .on("error", (error) => {
          document.getElementById("CakeVaultStakeButton").disabled = false;
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
    if (active === true && chainId === 56) {
      getCakeBalance();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active, chainId]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiButton fullWidth onClick={() => handleOpenWallet()} variant="gradient" color="primary">
          ?????????????????????
        </SuiButton>
      ) : null}
      <Modal open={openWallet} onClose={handleCloseWallet} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SuiBox sx={style}>
          <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
            <SuiTypography mb={2} id="modal-modal-title" variant="h6" component="h2">
              ?????????????????????
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
                <SuiInput id="cakeToDeposit" onChange={(e) => stakeButtonState(e)} placeholder="CAKE ???????????????????????????" />
              </Grid>
              <Grid item>
                <SuiButton onClick={() => setMaxCakes()} color="info">
                  MAX
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
          <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2">
            ?????????????????????: {cakeBalance}
          </SuiTypography>
          <SuiBox mt={2}>
            <Grid container spacing={2}>
              <Grid item>
                <SuiTypography sx={{ fontSize: 14 }}>???????????????????????? ????????????????????????????????????:</SuiTypography>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={12} md={12} lg={12}>
                <SuiBox sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} mt={1}>
                  <SuiBadge onClick={() => setLockedDuration(1)} badgeContent="1??????" color="primary" variant="contained" container size="md" />
                  <SuiBadge onClick={() => setLockedDuration(5)} badgeContent="5??????" color="primary" variant="contained" container size="md" />
                  <SuiBadge onClick={() => setLockedDuration(10)} badgeContent="10??????" color="primary" variant="contained" container size="md" />
                  <SuiBadge onClick={() => setLockedDuration(25)} badgeContent="25??????" color="primary" variant="contained" container size="md" />
                  <SuiBadge onClick={() => setLockedDuration(52)} badgeContent="52??????" color="primary" variant="contained" container size="md" />
                </SuiBox>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={1}>
              <Grid item>
                <SuiInput id="lockDuration" type="number" pattern="[0-9]" dir="rtl" step="1" min="1" onChange={(e) => stakeButtonStateWeeks(e)} placeholder="????????????????????????????????????" />
              </Grid>
              <Grid item>
                <SuiBox color="#fff" borderRadius="8px" sx={{ backgroundColor: "primary.main", p: 1, fontSize: 14 }}>
                  ???????????????
                </SuiBox>
              </Grid>
            </Grid>
          </SuiBox>
          <Divider />
          <SuiBox>
            <SuiBox mb={1}>
              <SuiButton id="CakeVaultStakeButton" fullWidth onClick={() => stake()} variant="gradient" color="primary">
                LOCK
              </SuiButton>
            </SuiBox>
            <SuiButton href="https://pancakeswap.finance/swap" fullWidth target="_blank" variant="outlined" color="primary">
              CAKE-?????? ???????????????
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

export default LockCakeButton;
