import { useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import axios from "axios";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  const mountedRef = useRef(true);
  const [coinMarketCapTreding, setCoinMarketCapTreding] = useState([]);
  function tredingCoinsCMC() {
    axios.get("https://api.coinmarketcap.com/data-api/v3/topsearch/rank").then((response) => {
      setCoinMarketCapTreding(response.data.data.cryptoTopSearchRanks);
    });
  }

  useEffect(() => {
    tredingCoinsCMC();
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const coinsCMC = coinMarketCapTreding.map((x) => <TimelineItem key={x.name} icon={`https://s2.coinmarketcap.com/static/img/coins/64x64/${x.id}.png`} title={`${x.name} (${x.symbol})`} price={x.priceChange.price.toLocaleString("en-US")} slug={x.slug} url="https://coinmarketcap.com/currencies/" />);

  return (
    <Card className="h-100">
      <SuiBox pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          ტრენდული ქოინები CMC-ზე 🚀🔥
        </SuiTypography>
        <SuiBox mt={0} mb={0}>
          <SuiTypography variant="button" color="text" fontWeight="regular">
            <SuiTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ fontWeight: "bold", color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </SuiTypography>
            &nbsp;
            <SuiTypography variant="button" color="text" fontWeight="medium">
              Powered By
            </SuiTypography>{" "}
            CoinGecko
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox p={2}>{coinsCMC}</SuiBox>
    </Card>
  );
}

export default OrdersOverview;
