import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import DappStores from "config/DappStore";
import DappCard from "./components/DappCard";

function Dashboard() {
  console.log(DappStores);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} xl={3}>
          <DappCard />
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
