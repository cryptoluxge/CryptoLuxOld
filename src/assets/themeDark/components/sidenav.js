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

// Soft UI Dashboard PRO React base styles
import colors from "assets/themeDark/base/colors";
import borders from "assets/themeDark/base/borders";

// Soft UI Dashboard PRO React helper functions
import rgba from "assets/themeDark/functions/rgba";
import pxToRem from "assets/themeDark/functions/pxToRem";

const { white } = colors;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      width: pxToRem(250),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(250),
      backgroundColor: rgba(white.main, 0.8),
      backdropFilter: `saturate(200%) blur(${pxToRem(30)})`,
      height: `calc(100vh - ${pxToRem(32)})`,
      margin: pxToRem(16),
      borderRadius: borderRadius.xl,
      border: "none",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};
