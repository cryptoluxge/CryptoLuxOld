import { useState } from "react";
import Footer from "examples/Footer";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import { PCSLogo, MilkySwap, YelFinance, MilkyDexLogo } from "assets/images/Logos/Dapps";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import PCSFarms from "./PancakeSwap";
import MilkyDexFarms from "./MilkyDex";
import MilkySwapFarms from "./MilkySwap";
import YELFarms from "./YelFinance";

function index() {
  const [showPCSFarm, setShowPCSFarm] = useState(true);
  const [showMilkyDexFarm, setShowMilkyDexFarm] = useState(true);
  const [showMilkySwapFarm, setShowMilkySwapFarm] = useState(true);
  const [showYelFarm, setShowYelFarm] = useState(true);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <SuiBox bgColor="primary" variant="gradient" p={2} borderRadius="12px" sx={{ width: "auto", height: "auto" }}>
          <SuiBox mb={1}>
            <SuiTypography color="white" fontSize={15}>
              ქვემოთ მოცემული ღილაკებით შეგიძლიათ დამალოთ ან გამოაჩინოთ DAPP-ის ფერმები.
            </SuiTypography>
          </SuiBox>
          <Grid container spacing={1}>
            <Grid item>
              <SuiButton fullWidth onClick={() => setShowPCSFarm((currentShow) => !currentShow)} color="white" startIcon={<PCSLogo />}>
                PancakeSwap
              </SuiButton>
            </Grid>
            <Grid item>
              <SuiButton fullWidth onClick={() => setShowMilkySwapFarm((currentShow) => !currentShow)} color="white" startIcon={<MilkySwap />}>
                MilkySwap
              </SuiButton>
            </Grid>
            <Grid item>
              <SuiButton fullWidth onClick={() => setShowYelFarm((currentShow) => !currentShow)} color="white" startIcon={<YelFinance />}>
                YELFINANCE
              </SuiButton>
            </Grid>
            <Grid item>
              <SuiButton fullWidth onClick={() => setShowMilkyDexFarm((currentShow) => !currentShow)} color="white" startIcon={<MilkyDexLogo />}>
                MILKYDEX
              </SuiButton>
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <SuiBox mt={2}>
        {showMilkyDexFarm ? <MilkyDexFarms /> : null}
        {showMilkySwapFarm ? <MilkySwapFarms /> : null}
        {showYelFarm ? <YELFarms /> : null}
        {showPCSFarm ? <PCSFarms /> : null}
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default index;
