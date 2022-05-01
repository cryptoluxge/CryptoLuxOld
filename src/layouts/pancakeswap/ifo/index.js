import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import OfferingTokenIfoCard from "./OfferingTokenIFO/offeringTokenIfoCard";
import TokenInfo from "./OfferingTokenIFO/TokenInfo/index";
import PrivateSaleInfo from "./OfferingTokenIFO/PrivateSaleInfo/index";
import IfoPoolUserData from "./IfoPoolVault";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={3} lg={3} mt={2}>
          <IfoPoolUserData />
          <SuiBox mt={2}>
            <TokenInfo />
          </SuiBox>
        </Grid>
        <Grid item xs={12} md={4} lg={6} mt={2}>
          <OfferingTokenIfoCard />
        </Grid>
        <Grid item xs={12} md={5} lg={3} mt={2}>
          <PrivateSaleInfo />
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
