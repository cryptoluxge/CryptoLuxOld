import { useState } from "react";
import Footer from "examples/Footer";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import { PCSLogo, BiSwap } from "assets/images/Logos/Dapps";
import PCSTableView from "./PancakeSwap/TableView/SyrupPools";
import BiSwapPools from "./BiSwap";

function Staking() {
  const [showPCS, setShowPCS] = useState(true);
  const [showBSW, setShowBSW] = useState(true);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <SuiBox bgColor="primary" variant="gradient" p={2} borderRadius="12px" sx={{ width: "auto", height: "auto" }}>
          <SuiBox mb={1}>
            <SuiTypography color="white" fontSize={15}>
              ქვემოთ მოცემული ღილაკებით შეგიძლიათ დამალოთ ან გამოაჩინოთ DAPP-ის სტეიკ პულები.
            </SuiTypography>
          </SuiBox>
          <Grid container spacing={1}>
            <Grid item>
              <SuiButton onClick={() => setShowPCS((currentShow) => !currentShow)} color="white" startIcon={<PCSLogo />}>
                PancakeSwap
              </SuiButton>
            </Grid>
            <Grid item>
              <SuiButton onClick={() => setShowBSW((currentShow) => !currentShow)} color="white" startIcon={<BiSwap />}>
                BiSwap
              </SuiButton>
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <SuiBox mt={2}>
        {showPCS ? <PCSTableView /> : null}
        {showBSW ? <BiSwapPools /> : null}
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Staking;
