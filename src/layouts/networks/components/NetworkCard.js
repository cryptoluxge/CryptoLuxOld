import PropTypes from "prop-types";
import SuiBox from "components/SuiBox";
import Card from "@mui/material/Card";
import SuiAvatar from "components/SuiAvatar";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import Stack from "@mui/material/Stack";

function NetworkCard({ logo, name, chainId, symbol, action }) {
  return (
    <Card>
      <SuiBox p={2}>
        <Grid container spacing={2}>
          <Grid item>
            <SuiBox sx={{ display: "flex", alignItems: "center" }}>
              <SuiBox>
                <SuiAvatar src={logo} variant="rounded" size="sm" sx={{ width: "40px", height: "40px" }} alt="BNB">
                  <bscLogo />
                </SuiAvatar>
              </SuiBox>
              <SuiBox ml={1}>
                <SuiTypography fontSize="14px" fontWeight="bold">
                  {name}
                </SuiTypography>
                <SuiTypography fontSize="12px">Mainnet</SuiTypography>
              </SuiBox>
            </SuiBox>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction="column" sx={{ display: "flex", alignItems: "center" }}>
            <SuiTypography fontSize="15px">ChainID</SuiTypography>
            <SuiTypography fontSize="15px" fontWeight="bold">
              {chainId}
            </SuiTypography>
          </Stack>
          <Stack direction="column" sx={{ display: "flex", alignItems: "center" }}>
            <SuiTypography fontSize="15px">Symbol</SuiTypography>
            <SuiTypography fontSize="15px" fontWeight="bold">
              {symbol}
            </SuiTypography>
          </Stack>
        </Stack>
        <SuiBox mt={2}>{action}</SuiBox>
      </SuiBox>
    </Card>
  );
}

NetworkCard.defaultProps = {
  logo: "",
};

NetworkCard.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string.isRequired,
  chainId: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default NetworkCard;
