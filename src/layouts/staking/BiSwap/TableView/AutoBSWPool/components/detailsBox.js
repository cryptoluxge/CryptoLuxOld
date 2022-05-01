import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import LoadingAnimation from "components/LoadingAnimation";
import { contract } from "config/BiSwap/constants/contracts";
import { explorerLink } from "utils/getExplorerUrls";
import AddToMetamaskButton from "components/AddToMetamaskButton";

function DetailsBox({ totalStakedInPool }) {
  return (
    <SuiBox>
      <SuiTypography fontSize="14px">Performance Fee: 2%</SuiTypography>
      {Number(totalStakedInPool) > 0 ? (
        <SuiTypography sx={{ fontSize: 14 }} fontWeight="light">
          Total Staked: {Number(totalStakedInPool).toLocaleString()}
        </SuiTypography>
      ) : (
        <LoadingAnimation sigrdze={70} />
      )}
      <Link href={explorerLink("wallet", contract.AutoBSWPool.contractAddress, 56)} target="_blank" underline="none" sx={{ fontSize: 14 }}>
        კონტრაქტის ნახვა <OpenInNewIcon />
      </Link>
      <AddToMetamaskButton tokenAddress="0x965F527D9159dCe6288a2219DB51fc6Eef120dD1" tokenSymbol="BSW" tokenDecimals={18} />
    </SuiBox>
  );
}

DetailsBox.propTypes = {
  totalStakedInPool: PropTypes.number.isRequired,
};

export default DetailsBox;
