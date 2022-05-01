import { useState, useEffect, useRef } from "react";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
/* import SuiBadge from "components/SuiBadge"; */
import Modal from "@mui/material/Modal";
/* import borders from "assets/theme/base/borders"; */
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { getCakeContract, getCakeVaultV2 } from "utils/PancakeSwapHelpers/contractHelpers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

function HarvestButton() {
  /* const { borderWidth, borderColor } = borders; */
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

  /* async function setLockedDuration(week) {
    document.getElementById("cakeToLock").value = week;
  } */

  async function stake() {
    const stakeValue = document.getElementById("cakeToDeposit").value;
    if (stakeValue === " ") {
      console.log("შეიყვანეთ რაოდენობა!");
    } else if (Number(stakeValue) <= 0) {
      console.log("შეიყვანეთ რაოდენობა!");
    } else if (Number(stakeValue) > 0) {
      const cakeToWei = web3.utils.toWei(stakeValue, "ether");
      await cakeVaultContract.methods
        .deposit(cakeToWei, 0)
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
                <SuiInput id="cakeToDeposit" onChange={(e) => stakeButtonState(e)} placeholder="CAKE რაოდენობა" />
              </Grid>
              <Grid item>
                <SuiButton onClick={() => setMaxCakes()} color="info">
                  MAX
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
          <SuiTypography sx={{ fontSize: 14 }} mt={1} variant="h6" component="h2">
            ბალანსი: {cakeBalance}
          </SuiTypography>
          <Divider />
          <SuiBox>
            <SuiBox mb={1}>
              <SuiButton id="CakeVaultStakeButton" fullWidth onClick={() => stake()} variant="gradient" color="primary">
                STAKE
              </SuiButton>
            </SuiBox>
            <SuiButton href="https://pancakeswap.finance/swap" fullWidth target="_blank" variant="outlined" color="primary">
              CAKE-ის ყიდვა
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

export default HarvestButton;
