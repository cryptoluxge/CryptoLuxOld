/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import Chains from "components/Chains";

// Custom styles for DashboardNavbar
import {
  navbar,
  /* navbarContainer, */
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

import ConnectWalletButton from "components/ConnectWalletButton";
// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav } from "context";
import { useWeb3React } from "@web3-react/core";

function DashboardNavbar({ absolute, light, isMini }) {
  const { active } = useWeb3React();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("static");
    } else {
      setNavbarType("sticky");
    }
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  return (
    <AppBar position={absolute ? "absolute" : navbarType} color="inherit" sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}>
      <Toolbar>
        {isMini ? null : (
          <SuiBox
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
            color={light ? "white" : "inherit"}
          >
            <SuiBox sx={{ width: 80 }} mr={-2}>
              {active ? <Chains /> : null}
              {/* <ConnectWalletButton /> */}
            </SuiBox>
            <ConnectWalletButton />
            <IconButton size="small" color="inherit" sx={navbarMobileMenu} onClick={handleMiniSidenav}>
              <Icon className={light ? "text-white" : "text-dark"}>{miniSidenav ? "menu_open" : "menu"}</Icon>
            </IconButton>
          </SuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
