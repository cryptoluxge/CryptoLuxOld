import React from "react";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SuiTypography from "components/SuiTypography";
import Link from "@mui/material/Link";
import { explorerLink } from "utils/getExplorerUrls";
import { shortAddress } from "utils/truncateAddress";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUp from "@mui/icons-material/ArrowCircleUp";
import { useWeb3React } from "@web3-react/core";

function TxTable({ fromAddress, toAddress, txHashAddress, chainId }) {
  const { account } = useWeb3React();

  return (
    <React.Fragment key="key">
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}>
        <TableCell align="right">{fromAddress === account.toLowerCase() ? <ArrowCircleUp color="error" fontSize="medium" /> : <ArrowCircleDown color="success" fontSize="medium" />}</TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>საიდან</SuiTypography>
          <Link href={explorerLink("wallet", fromAddress, chainId)} color="dark.main" target="_blank" fontSize="14px" fontWeight="bold">
            {fromAddress === account.toLowerCase() ? "ჩემიდან" : shortAddress(fromAddress, 5)}
          </Link>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>სად</SuiTypography>
          <Link href={explorerLink("wallet", toAddress, chainId)} color="dark.main" target="_blank" fontSize="14px" fontWeight="bold">
            {toAddress === account.toLowerCase() ? "ჩემთან" : shortAddress(toAddress, 5)}
          </Link>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>ჰეში</SuiTypography>
          <Link href={explorerLink("tx", txHashAddress, chainId)} color="dark.main" target="_blank" fontSize="14px" fontWeight="bold">
            {shortAddress(txHashAddress, 5)}
          </Link>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

TxTable.propTypes = {
  fromAddress: PropTypes.string.isRequired,
  toAddress: PropTypes.string.isRequired,
  txHashAddress: PropTypes.string.isRequired,
  chainId: PropTypes.number.isRequired,
};

export default TxTable;
