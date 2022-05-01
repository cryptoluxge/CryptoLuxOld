import { useState, useRef, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "components/ConnectWalletButton/connectors";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import { MetamaskLogo, TrustWalletLogo } from "./WalletIcons/index";

function ConnectButton({ loginText }) {
  const mountedRef = useRef(true);
  const { activate } = useWeb3React();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const provider = window.ethereum;

  async function connect() {
    try {
      if (typeof provider !== "undefined") {
        await activate(injected);
        localStorage.setItem("isWalletConnected", true);
      } else {
        console.log("გთხოვთ დააყენოთ Metamask!");
      }
    } catch (ex) {
      console.log("ERROR", ex);
    }
    handleClose();
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
    mountedRef.current = false;
  });

  return (
    <SuiBox>
      <SuiButton onClick={handleOpen} fullWidth variant="gradient" color="primary">
        {loginText}
      </SuiButton>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SuiBox sx={style}>
          <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
            <SuiTypography id="modal-modal-title" variant="h6" component="h2">
              საფულის დაკავშირება
            </SuiTypography>
            <SuiTypography onClick={handleClose} sx={{ cursor: "pointer" }} mb={0} variant="h6" component="h2">
              X
            </SuiTypography>
          </SuiBox>
          <Divider />
          <SuiBox>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item mt={0} onClick={() => connect()}>
                <SuiBox sx={{ cursor: "pointer" }}>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <MetamaskLogo width={40} />
                    <SuiTypography mt={1} sx={{ fontSize: 14 }}>
                      Metamask
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
              </Grid>
              <Grid item mt={0} onClick={() => connect()}>
                <SuiBox sx={{ cursor: "pointer" }}>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <TrustWalletLogo />
                    <SuiTypography mt={1} sx={{ fontSize: 14 }}>
                      Trust Wallet
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
              </Grid>
            </Grid>
          </SuiBox>
          <Divider />
          <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
            <SuiTypography fontWeight="medium" sx={{ fontSize: 14 }}>
              არ გაქვს კრიპტო საფულე?
            </SuiTypography>
          </SuiBox>
          <SuiBox mt={1} sx={{ display: "flex", justifyContent: "center" }}>
            <SuiButton variant="gradient" color="primary">
              ისწავლე როგორ დაუკავშირდე
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

ConnectButton.defaultProps = {
  loginText: "შესვლა",
};

// Typechecking props for the TimelineItem
ConnectButton.propTypes = {
  loginText: PropTypes.string,
};

export default ConnectButton;
