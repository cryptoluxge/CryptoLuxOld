import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Stack from "@mui/material/Stack";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import { explorerLink } from "utils/getExplorerUrls";
import { PCSWithTextLogo } from "assets/images/Logos/Dapps";

function DetailsBox({ lpName, lpAddress, tokenAddress, quoteTokenAddress, poolApr }) {
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
        <Link href={`https://pancakeswap.finance/add/${tokenAddress}/${quoteTokenAddress}`} target="_blank" underline="none" sx={{ fontSize: 14 }}>
          GET {lpName} <OpenInNewIcon />
        </Link>
        <Link href={`https://pancakeswap.finance/info/pool/${lpAddress}`} target="_blank" underline="none" sx={{ fontSize: 14 }}>
          See Pair Info <OpenInNewIcon />
        </Link>
        <Link href={explorerLink("wallet", lpAddress, 56)} target="_blank" underline="none" sx={{ fontSize: 14 }}>
          კონტრაქტის ნახვა <OpenInNewIcon />
        </Link>
        <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <PCSWithTextLogo />
        </SuiBox>
      </Stack>
    </SuiBox>
  );
}

DetailsBox.propTypes = {
  poolApr: PropTypes.number.isRequired,
  lpName: PropTypes.string.isRequired,
  lpAddress: PropTypes.string.isRequired,
  tokenAddress: PropTypes.string.isRequired,
  quoteTokenAddress: PropTypes.string.isRequired,
};

export default DetailsBox;
