import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import Table from "@mui/material/Table";
import SuiTypography from "components/SuiTypography";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { getNativeTransactions } from "utils/MoralisApi";
import { useWeb3React } from "@web3-react/core";
import TokenTable from "./components/TxTable";

function tokenBalances() {
  const { account, chainId } = useWeb3React();
  const [nativeTxs, setNativeTxs] = useState([]);

  async function getTxs() {
    const getNativeTxs = await getNativeTransactions(account, chainId);
    setNativeTxs(getNativeTxs.result);
  }

  useEffect(() => {
    getTxs();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography sx={{ fontSize: 16 }}>ბოლო ტრანზაქციები</SuiTypography>
      </SuiBox>
      <SuiBox>
        {nativeTxs.length > 0 ? (
          <TableContainer component={Paper} sx={{ maxHeight: 262 }}>
            <Table aria-label="collapsible table">
              <TableBody>
                {nativeTxs.map((x) => (
                  <TokenTable key={x.hash} fromAddress={x.from_address} toAddress={x.to_address} txHashAddress={x.hash} chainId={chainId} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <SuiBox p={3} sx={{ display: "flex", justifyContent: "center" }}>
            <SuiTypography fontSize="15px">ტრანზაქციები არ მოიძებნა.</SuiTypography>
          </SuiBox>
        )}
      </SuiBox>
    </Card>
  );
}

export default tokenBalances;
