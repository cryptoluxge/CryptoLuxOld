import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CoinGeckoTreding from "layouts/dashboard/components/CoinGeckoTreding";
import CoinMarketCapTrending from "layouts/dashboard/components/CoinMarketCapTrending";
import DeFiInformation from "layouts/dashboard/components/DeFiInformation";
import MiniInfo from "layouts/dashboard/components/MiniInfo";
import BalancesCard from "layouts/dashboard/components/BalancesCard/BalancesOnChains";
import { useWeb3React } from "@web3-react/core";

function Dashboard() {
  const { active } = useWeb3React();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        {active ? <MiniInfo /> : null}
        {active ? (
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} md={6} lg={4}>
              <BalancesCard />
            </Grid>
          </Grid>
        ) : null}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <DeFiInformation />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CoinGeckoTreding />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CoinMarketCapTrending />
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
