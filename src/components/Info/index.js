import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";

function info({ name, data }) {
  return (
    <Grid container spacing={0} sx={{ display: "flex", justifyContent: "space-between" }}>
      <Grid item>
        <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
          {name}
        </SuiTypography>
      </Grid>
      <Grid item sx={{ fontSize: 14 }}>
        {data}
      </Grid>
    </Grid>
  );
}

export default info;
