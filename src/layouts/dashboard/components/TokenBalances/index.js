import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import Table from "@mui/material/Table";
import SuiTypography from "components/SuiTypography";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import TokenTable from "./components/TokenTable";
import { getTokenBalances } from "../../../../utils/MoralisApi";

function tokenBalances() {
  const [tokenBalance, setTokenBalance] = useState([]);
  const { active, account, chainId } = useWeb3React();

  async function getTokenBalance() {
    let chain = "";
    if (chainId === 56) {
      chain = "bsc";
    } else if (chain === 1) {
      chain = "eth";
    } else if (chainId === 43114) {
      chain = "avalanche";
    }
    const tokenData = await getTokenBalances(account, chain);
    setTokenBalance(tokenData);
  }

  useEffect(() => {
    if (active === true) {
      getTokenBalance();
    }
  }, [active]);

  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography sx={{ fontSize: 16 }}>ტოკენების ბალანსი</SuiTypography>
      </SuiBox>
      <SuiBox>
        {tokenBalance.length > 0 ? (
          <TableContainer component={Paper} sx={{ maxHeight: 262 }}>
            <Table aria-label="collapsible table">
              <TableBody>
                {tokenBalance.map((x) => (
                  <TokenTable key={x.token_address} chainId={chainId} decimals={x.decimals} name={x.name} symbol={x.symbol} contractAddress={x.token_address} balance={Number(x.balance) / 10 ** Number(x.decimals)} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <SuiBox p={3} sx={{ display: "flex", justifyContent: "center" }}>
            <SuiTypography fontSize="15px">ტოკენები არ გაქვთ.</SuiTypography>
          </SuiBox>
        )}
      </SuiBox>
    </Card>
  );
}

export default tokenBalances;
