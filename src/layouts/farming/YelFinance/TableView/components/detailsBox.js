import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import { explorerLink } from "utils/getExplorerUrls";
import { YelFinanceTextLogo } from "assets/images/Logos/Dapps";

function DetailsBox({ lpAddress, poolApr, lpName }) {
  return (
    <SuiBox>
      <Stack spacing={0}>
        {Number(poolApr) > 0 ? (
          <SuiTypography fontSize={13} fontWeight="bold">
            APR: {poolApr.toLocaleString("en-US")}%
          </SuiTypography>
        ) : (
          <LoadingAnimation />
        )}
        <Link href="https://pancakeswap.finance/add/0xd3b71117e6c1558c1553305b44988cd944e97300/BNB" target="_blank" underline="none" sx={{ fontSize: 14 }}>
          GET {lpName} <OpenInNewIcon />
        </Link>
        <Link href={explorerLink("wallet", lpAddress, 56)} target="_blank" underline="none" sx={{ fontSize: 14 }}>
          კონტრაქტის ნახვა <OpenInNewIcon />
        </Link>
        <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <YelFinanceTextLogo />
        </SuiBox>
      </Stack>
    </SuiBox>
  );
}

DetailsBox.propTypes = {
  poolApr: PropTypes.number.isRequired,
  lpAddress: PropTypes.string.isRequired,
  lpName: PropTypes.string.isRequired,
};

export default DetailsBox;
