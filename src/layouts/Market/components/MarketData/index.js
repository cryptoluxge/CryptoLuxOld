import { useEffect, useState } from "react";
import { getGlobalData } from "utils/CoinGeckoAPI";
import SuiBox from "components/SuiBox";
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";

function MarketData() {
  const [data, setData] = useState([]);

  async function getMarketData() {
    const global = await getGlobalData();
    setData(global.data.data);
  }

  useEffect(() => {
    getMarketData();
  }, []);

  return (
    <SuiBox>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} xl={3}>
          {data.length === 0 ? null : <MiniStatisticsCard title={{ text: "კაპიტალიზაცია" }} count={`$${Number(data.total_market_cap.usd).toLocaleString("en-US")}`} icon={{ color: "primary", component: "paid" }} />}
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          {data.length === 0 ? null : <MiniStatisticsCard title={{ text: "ნავაჭრი (24სთ)" }} count={`$${Number(data.total_volume.usd).toLocaleString("en-US")}`} icon={{ color: "primary", component: "equalizer" }} />}
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          {data.length === 0 ? null : <MiniStatisticsCard title={{ text: "BTC დომინირება" }} count={`${Number(data.market_cap_percentage.btc).toFixed(2)}%`} icon={{ color: "primary", component: <BsCurrencyBitcoin /> }} />}
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          {data.length === 0 ? null : <MiniStatisticsCard title={{ text: "ETH დომინირება" }} count={`${Number(data.market_cap_percentage.eth).toFixed(2)}%`} icon={{ color: "primary", component: <FaEthereum /> }} />}
        </Grid>
      </Grid>
    </SuiBox>
  );
}

export default MarketData;
