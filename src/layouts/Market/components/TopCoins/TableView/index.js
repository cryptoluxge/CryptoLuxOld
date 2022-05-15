import React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";

function TableView({ rank, logo, name, symbol, price, change24h, volume, cap, ath, atl }) {
  return (
    <React.Fragment key="key">
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}>
        <TableCell align="left" /* sx={{ width: "10px" }} */>
          <SuiTypography fontWeight="bold" fontSize="14px">
            {rank}
          </SuiTypography>
        </TableCell>
        <TableCell align="left" /* sx={{ width: "180px" }} */>
          <SuiBox sx={{ display: "flex", alignItems: "center" }}>
            <Avatar alt={name} src={logo} />
            <SuiBox ml={2}>
              <SuiTypography fontSize={14} fontWeight="bold">
                {name}
              </SuiTypography>
              <SuiTypography fontSize="12px" color="secondary" fontWeight="bold">
                {symbol.toUpperCase()}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>ფასი</SuiTypography>
          <SuiTypography fontWeight="bold" fontSize="14px">
            ${price.toLocaleString("en-US")}
          </SuiTypography>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>24სთ</SuiTypography>
          <SuiTypography fontWeight="bold" color={change24h > 0 ? "success" : "error"} fontSize="14px">
            {change24h.toFixed(2)}%
          </SuiTypography>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>ნავაჭრი (24სთ)</SuiTypography>
          <SuiTypography fontWeight="bold" fontSize="14px">
            ${volume.toLocaleString("en-US")}
          </SuiTypography>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>კაპიტალიზაცია</SuiTypography>
          <SuiTypography fontWeight="bold" fontSize="14px">
            ${cap.toLocaleString("en-US")}
          </SuiTypography>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>ATH</SuiTypography>
          <SuiTypography fontWeight="bold" fontSize="14px">
            ${ath.toLocaleString("en-US")}
          </SuiTypography>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>ATL</SuiTypography>
          <SuiTypography fontWeight="bold" fontSize="14px">
            ${atl.toLocaleString("en-US")}
          </SuiTypography>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

TableView.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  cap: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  change24h: PropTypes.number.isRequired,
  ath: PropTypes.number.isRequired,
  atl: PropTypes.number.isRequired,
};

export default TableView;
