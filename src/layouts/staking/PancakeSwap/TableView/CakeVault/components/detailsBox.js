import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import LoadingAnimation from "components/LoadingAnimation";
import { contract } from "config/PancakeSwap/constants/contracts";
import { explorerLink } from "utils/getExplorerUrls";
import AddToMetamaskButton from "components/AddToMetamaskButton";

function DetailsBox({ locked, totalLockedInPool, totalStakedInPool }) {
  return (
    <SuiBox>
      {locked ? null : <SuiTypography fontSize="14px">Performance Fee: 2%</SuiTypography>}
      <SuiTypography fontSize="14px">Position: {locked ? "Locked" : "Flexible"}</SuiTypography>
      {Number(totalStakedInPool) > 0 ? (
        <SuiTypography sx={{ fontSize: 14 }} fontWeight="light">
          Total Staked: {Number(totalStakedInPool).toLocaleString()}
        </SuiTypography>
      ) : (
        <LoadingAnimation sigrdze={70} />
      )}
      {Number(totalLockedInPool) >= 0 ? (
        <SuiTypography sx={{ fontSize: 14 }} fontWeight="light">
          Total Locked: {Number(totalLockedInPool).toLocaleString()}
        </SuiTypography>
      ) : (
        <LoadingAnimation sigrdze={70} />
      )}
      <Link href={explorerLink("wallet", contract.cakeVaultV2.contractAddress, 56)} target="_blank" underline="none" sx={{ fontSize: 14 }}>
        კონტრაქტის ნახვა <OpenInNewIcon />
      </Link>
      <AddToMetamaskButton tokenAddress="0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82" tokenSymbol="CAKE" tokenDecimals={18} />
    </SuiBox>
  );
}

DetailsBox.propTypes = {
  locked: PropTypes.bool.isRequired,
  totalLockedInPool: PropTypes.number.isRequired,
  totalStakedInPool: PropTypes.number.isRequired,
};

export default DetailsBox;
