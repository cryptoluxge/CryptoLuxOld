import SuiBox from "components/SuiBox";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import { PointsLogo, TeamsLogo, SquadLogo } from "./icons";

function Overview() {
  return (
    <SuiBox>
      <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item>
          <Card sx={{ borderRadius: 2 }}>
            <SuiBox p={1} sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
              <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
                <SquadLogo />
              </SuiBox>
              <SuiTypography sx={{ fontSize: 14, display: "flex", justifyContent: "center" }} fontWeight="bold">
                NFT
              </SuiTypography>
            </SuiBox>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ borderRadius: 2 }}>
            <SuiBox p={1} sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
              <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
                <PointsLogo />
              </SuiBox>
              <SuiTypography sx={{ fontSize: 14, display: "flex", justifyContent: "center" }} fontWeight="bold">
                Points
              </SuiTypography>
            </SuiBox>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ borderRadius: 2 }}>
            <SuiBox p={1} sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
              <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
                <TeamsLogo />
              </SuiBox>
              <SuiTypography sx={{ fontSize: 14, display: "flex", justifyContent: "center" }} fontWeight="bold">
                Teams
              </SuiTypography>
            </SuiBox>
          </Card>
        </Grid>
      </Grid>
    </SuiBox>
  );
}

export default Overview;
