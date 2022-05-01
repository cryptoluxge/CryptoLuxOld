import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import { explorerLink } from "utils/getExplorerUrls";

function DetailsBox({ lpAddress, poolApr, tokenAddress, quoteTokenAddress, lpName }) {
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
        <Link href={`https://app.milkydex.com/pools/add/${tokenAddress}/${quoteTokenAddress}`} target="_blank" underline="none" sx={{ fontSize: 14 }}>
          GET {lpName} <OpenInNewIcon />
        </Link>
        <Link href={explorerLink("wallet", lpAddress, 2001)} target="_blank" underline="none" sx={{ fontSize: 14 }}>
          კონტრაქტის ნახვა <OpenInNewIcon />
        </Link>
      </Stack>
    </SuiBox>
  );
}

DetailsBox.propTypes = {
  poolApr: PropTypes.number.isRequired,
  lpAddress: PropTypes.string.isRequired,
  lpName: PropTypes.string.isRequired,
  tokenAddress: PropTypes.string.isRequired,
  quoteTokenAddress: PropTypes.string.isRequired,
};

export default DetailsBox;
