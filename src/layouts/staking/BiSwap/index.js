import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ManualBSWPool from "./TableView/ManualBSWPool";
import HolderBSWPool from "./TableView/HolderBSWPool";
import AutoBSWPool from "./TableView/AutoBSWPool";

export default function CollapsibleTable() {
  return (
    <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={12} sm={12} xl={8}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              <HolderBSWPool />
              <AutoBSWPool />
              <ManualBSWPool />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
