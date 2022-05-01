import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import Networks from "./Networks";
import NetworkCard from "./components/NetworkCard";

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2} mb={2}>
        {Networks.map((x) => (
          <Grid key={x.id} item xs={12} sm={4} xl={3}>
            <NetworkCard key={x.id} logo={x.logo} name={x.name} chainId={x.chainId} symbol={x.symbol} action={x.action} />
          </Grid>
        ))}
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
