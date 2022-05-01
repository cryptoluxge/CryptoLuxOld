import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import { ifo } from "config/PancakeSwap/constants/ifo";
import PrivateSaleCard from "./PrivateSale/index";
import PublicSaleCard from "./PublicSale/index";
import Automation from "./Automation/index";
import Timer from "./timer";

function Overview() {
  return (
    <SuiBox>
      <Card>
        <SuiBox sx={{ display: "flex" }}>
          <img src={ifo.ifoBanner} alt="IFOBanner" style={{ height: "100%", width: "100%" }} />
        </SuiBox>
        <Timer />
        <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={11} md={10} lg={5.5}>
            <PublicSaleCard />
          </Grid>
          <Grid item xs={11} md={10} lg={5.5}>
            <PrivateSaleCard />
          </Grid>
        </Grid>
        <SuiBox mt={2} mb={0}>
          <Automation />
        </SuiBox>
      </Card>
    </SuiBox>
  );
}

export default Overview;
