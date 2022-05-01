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

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Soft UI Dashboard PRO React context
import { useSoftUIController, setOpenConfigurator, setFixedNavbar, setSidenavColor } from "context";

function Configurator() {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, fixedNavbar, sidenavColor } = controller;
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <SuiBox display="flex" justifyContent="space-between" alignItems="baseline" pt={3} pb={0.8} px={3}>
        <SuiBox>
          <SuiTypography variant="h5">კონფიგურატორი</SuiTypography>
        </SuiBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SuiBox>

      <Divider />

      <SuiBox pt={1.25} pb={3} px={3}>
        <SuiBox>
          <SuiTypography variant="h6">ფერები</SuiTypography>

          <SuiBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) => linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </SuiBox>
        </SuiBox>
        <SuiBox mt={3} mb={2} lineHeight={1}>
          <SuiTypography variant="h6">Dark Mode</SuiTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </SuiBox>
        <Divider />
        <SuiBox mt={3} textAlign="center">
          <SuiBox display="flex" justifyContent="center">
            <SuiBox mr={1.5}>
              <SuiButton component={Link} href="//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20React%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23react%23mui&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-react" target="_blank" rel="noreferrer" color="dark">
                <TwitterIcon />
                &nbsp; Tweet
              </SuiButton>
            </SuiBox>
            <SuiButton component={Link} href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/soft-ui-dashboard-react" target="_blank" rel="noreferrer" color="dark">
              <FacebookIcon />
              &nbsp; Share
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
