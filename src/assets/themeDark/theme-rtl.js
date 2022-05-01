/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";

// Soft UI Dashboard PRO React base styles
import colors from "assets/themeDark/base/colors";
import breakpoints from "assets/themeDark/base/breakpoints";
import typography from "assets/themeDark/base/typography";
import boxShadows from "assets/themeDark/base/boxShadows";
import borders from "assets/themeDark/base/borders";
import globals from "assets/themeDark/base/globals";

// Soft UI Dashboard PRO React helper functions
import boxShadow from "assets/themeDark/functions/boxShadow";
import hexToRgb from "assets/themeDark/functions/hexToRgb";
import linearGradient from "assets/themeDark/functions/linearGradient";
import pxToRem from "assets/themeDark/functions/pxToRem";
import rgba from "assets/themeDark/functions/rgba";

// Soft UI Dashboard PRO React components base styles for @mui material components
import sidenav from "assets/themeDark/components/sidenav";
import list from "assets/themeDark/components/list";
import listItem from "assets/themeDark/components/list/listItem";
import listItemText from "assets/themeDark/components/list/listItemText";
import card from "assets/themeDark/components/card";
import cardMedia from "assets/themeDark/components/card/cardMedia";
import cardContent from "assets/themeDark/components/card/cardContent";
import button from "assets/themeDark/components/button";
import iconButton from "assets/themeDark/components/iconButton";
import inputBase from "assets/themeDark/components/form/inputBase";
import menu from "assets/themeDark/components/menu";
import menuItem from "assets/themeDark/components/menu/menuItem";
import switchButton from "assets/themeDark/components/form/switchButton";
import divider from "assets/themeDark/components/divider";
import tableContainer from "assets/themeDark/components/table/tableContainer";
import tableHead from "assets/themeDark/components/table/tableHead";
import tableCell from "assets/themeDark/components/table/tableCell";
import linearProgress from "assets/themeDark/components/linearProgress";
import breadcrumbs from "assets/themeDark/components/breadcrumbs";
import slider from "assets/themeDark/components/slider";
import avatar from "assets/themeDark/components/avatar";
import tooltip from "assets/themeDark/components/tooltip";
import appBar from "assets/themeDark/components/appBar";
import tabs from "assets/themeDark/components/tabs";
import tab from "assets/themeDark/components/tabs/tab";
import stepper from "assets/themeDark/components/stepper";
import step from "assets/themeDark/components/stepper/step";
import stepConnector from "assets/themeDark/components/stepper/stepConnector";
import stepLabel from "assets/themeDark/components/stepper/stepLabel";
import stepIcon from "assets/themeDark/components/stepper/stepIcon";
import select from "assets/themeDark/components/form/select";
import formControlLabel from "assets/themeDark/components/form/formControlLabel";
import formLabel from "assets/themeDark/components/form/formLabel";
import checkbox from "assets/themeDark/components/form/checkbox";
import radio from "assets/themeDark/components/form/radio";
import autocomplete from "assets/themeDark/components/form/autocomplete";
import input from "assets/themeDark/components/form/input";
import container from "assets/themeDark/components/container";
import popover from "assets/themeDark/components/popover";
import buttonBase from "assets/themeDark/components/buttonBase";
import icon from "assets/themeDark/components/icon";
import svgIcon from "assets/themeDark/components/svgIcon";
import link from "assets/themeDark/components/link";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInputBase: { ...inputBase },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiInput: { ...input },
    MuiOutlinedInput: { ...input },
    MuiFilledInput: { ...input },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
  },
});
