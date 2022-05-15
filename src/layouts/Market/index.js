import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Grid } from "@mui/material";
import BTCFearAndGreedIndex from "./components/BTCFearAndGreedIndex";
import MarketData from "./components/MarketData";
import TopCoins from "./components/TopCoins";

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MarketData />
      <TopCoins />
      <Grid container spacing={0} mt={2}>
        <Grid item xs={12} md={6} lg={2.5}>
          <BTCFearAndGreedIndex />
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
