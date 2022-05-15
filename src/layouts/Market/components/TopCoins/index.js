import { useEffect, useState } from "react";
import { getTopCoins } from "utils/CoinGeckoAPI";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableView from "./TableView";

function MarketData() {
  const [data, setData] = useState([]);

  async function getMarketData() {
    const global = await getTopCoins();
    setData(global.data);
  }

  useEffect(() => {
    getMarketData();
  }, []);

  return (
    <Grid container spacing={1} mt={2}>
      <Grid item xs={12} sm={12} xl={12}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {data.map((coin) => (
                <TableView key={coin.id} rank={coin.market_cap_rank} name={coin.name} symbol={coin.symbol} logo={coin.image} price={coin.current_price} volume={coin.total_volume} change24h={coin.price_change_percentage_24h} cap={coin.market_cap} ath={coin.ath} atl={coin.atl} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default MarketData;
