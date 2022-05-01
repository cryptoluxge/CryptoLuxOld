import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import PCSFarms from "config/PancakeSwap/Farms";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableView from "./TableView";

export default function CollapsibleTable() {
  return (
    <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={12} sm={12} xl={7}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {PCSFarms.map((farm) => (
                <TableView key={farm.lpSymbol} pid={farm.pid} lpName={farm.lpSymbol} lpAddress={farm.lpAddresses[56]} tokenAddress={farm.token} quoteTokenAddress={farm.quoteToken} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
