import React from "react";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import { explorerLink } from "utils/getExplorerUrls";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "@mui/material/Link";
import { shortAddress } from "utils/truncateAddress";

function TokenTable({ name, symbol, balance, contractAddress, chainId }) {
  return (
    <React.Fragment key="key">
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}>
        <TableCell component="th" scope="row" sx={{ alignItems: "center" }}>
          <SuiBox sx={{ display: "flex" }}>
            <Avatar alt={symbol} src="https://pancakeswap.finance/images/tokens/0x0E09FaxB73Bd3Ade0a17ECC321fD13a19e81cE82.png" />
            <SuiBox ml={1}>
              <Link href={explorerLink("wallet", contractAddress, chainId)} target="_blank" fontSize="14px" fontWeight="bold">
                {symbol}
              </Link>
              <SuiTypography fontSize={11}>{name}</SuiTypography>
            </SuiBox>
          </SuiBox>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>ბალანსი</SuiTypography>
          <SuiTypography fontWeight="bold" fontSize="14px">
            {Number(balance).toLocaleString("en-US")}
          </SuiTypography>
        </TableCell>
        {window.innerWidth < 1400 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>კონტრაქტი</SuiTypography>
            <Link href={explorerLink("wallet", contractAddress, chainId)} color="dark.main" target="_blank" fontSize="14px" fontWeight="bold">
              {shortAddress(contractAddress, 5)} <OpenInNewIcon />
            </Link>
          </TableCell>
        )}
      </TableRow>
    </React.Fragment>
  );
}

TokenTable.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  chainId: PropTypes.number.isRequired,
  contractAddress: PropTypes.string.isRequired,
};

export default TokenTable;
