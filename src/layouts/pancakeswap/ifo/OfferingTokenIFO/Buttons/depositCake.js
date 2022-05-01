import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Web3 from "web3";
import SuiInput from "components/SuiInput";
import { getIfoPoolContract, getIfoCakePoolContract } from "utils/PancakeSwapHelpers/contractHelpers";

function Overview({ poolType }) {
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [open, setOpen] = useState(false);
  const [limitPerUserCAKE, setLimitPerUserCAKE] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const web3 = new Web3(window.ethereum);
  const offeringTokenIFOPoolContract = getIfoPoolContract(chainId);
  const IFOPoolContract = getIfoCakePoolContract(chainId);
  async function getMaximumCake() {
    if (poolType === "private") {
      console.log("getting for Private Pool");
      const getMaxLpCake = await offeringTokenIFOPoolContract.methods.viewPoolInformation(0).call();
      setLimitPerUserCAKE(web3.utils.fromWei(getMaxLpCake[2], "ether"));
      console.log(getMaxLpCake[2]);
    } else {
      console.log("getting for Public Pool");
      const userCredit = await IFOPoolContract.methods.getUserCredit(account).call();
      setLimitPerUserCAKE(web3.utils.fromWei(userCredit, "ether"));
      console.log(userCredit);
    }
  }

  function setMAXcake() {
    if (poolType === "public") {
      document.getElementById("cakeToDeposit").value = limitPerUserCAKE;
    } else {
      document.getElementById("cakeToDeposit").value = limitPerUserCAKE;
    }
  }

  async function depositInPool() {
    const cakeInEther = document.getElementById("cakeToDeposit").value;
    const cakeInWei = web3.utils.toWei(cakeInEther, "ether");
    if (poolType === "private") {
      console.log("depositing in private:", cakeInWei);
      await offeringTokenIFOPoolContract.methods.depositPool(cakeInWei, 0).send({ from: account });
    } else {
      console.log("depositing in public:", cakeInWei);
      await offeringTokenIFOPoolContract.methods.depositPool(cakeInWei, 1).send({ from: account });
    }
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 311,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 2,
  };

  useEffect(() => {
    if (active === true && account.length > 0) {
      getMaximumCake();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [account, active]);

  return (
    <SuiBox mt={1}>
      <SuiButton variant="gradient" onClick={handleOpen} fullWidth color="primary">
        შეტანა
      </SuiButton>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SuiBox sx={style}>
          <SuiTypography mb={2} id="modal-modal-title" variant="h6" component="h2">
            {poolType === "public" ? "Public" : "Private"} Sale - შეტანა
          </SuiTypography>
          <SuiBox>
            <Grid container spacing={1}>
              <Grid item>
                <SuiInput id="cakeToDeposit" placeholder="CAKE რაოდენობა" />
              </Grid>
              <Grid item>
                <SuiButton onClick={() => setMAXcake()} color="info">
                  MAX
                </SuiButton>
              </Grid>
            </Grid>
            <SuiTypography mt={1} sx={{ fontSize: 13 }}>
              შესატანად: {limitPerUserCAKE} CAKE
            </SuiTypography>
          </SuiBox>
          <SuiBox>
            <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }} mt={1}>
              <Grid item>
                <SuiButton onClick={() => depositInPool()} color="primary">
                  შეტანა
                </SuiButton>
              </Grid>
              <Grid item>
                <SuiButton onClick={() => handleClose()} color="error">
                  დახურვა
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

Overview.propTypes = {
  poolType: PropTypes.string.isRequired,
};

export default Overview;
