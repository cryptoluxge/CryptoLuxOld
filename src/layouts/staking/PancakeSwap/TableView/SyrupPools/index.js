import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import SyrupPools from "config/PancakeSwap/SyrupPools";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableView from "./TableView";
import CakeVaultRow from "../CakeVault";

export default function CollapsibleTable() {
  return (
    <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={12} sm={12} xl={8}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              <CakeVaultRow />
              {SyrupPools.map((pool) => (
                <TableView key={pool.id} tokenContractAddress={pool.tokenContractAddress} symbol={pool.symbol} contractAddress={pool.poolContractAddress} decimals={pool.decimals} perBlock={pool.rewardPerBlock} endBlock={pool.endBlock} startBlock={pool.startBlock} telegram={pool.telegram} twitter={pool.twitter} website={pool.website} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
