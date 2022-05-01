import { useEffect, useState, useRef } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import axios from "axios";

import BtcToUsd from "utils/BtcToUsd";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  const mountedRef = useRef(true);
  const [coinGeckoTreding, setCoinGeckoTreding] = useState([]);
  const [BtcPrice] = BtcToUsd();
  function tredingCoinsCG() {
    axios.get("https://api.coingecko.com/api/v3/search/trending").then((response) => {
      setCoinGeckoTreding(response.data.coins);
    });
  }

  useEffect(() => {
    tredingCoinsCG();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const coinsCG = coinGeckoTreding.map((x) => <TimelineItem key={x.item.name} color="success" icon={x.item.small} title={`${x.item.name} (${x.item.symbol})`} price={(Number(BtcPrice) * Number(x.item.price_btc)).toLocaleString("en-US")} slug={x.item.slug} url="https://www.coingecko.com/en/coins/" />);

  return (
    <Card className="h-100">
      <SuiBox pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          ტრენდული ქოინები CG-ზე 🚀🔥
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
      <SuiBox p={2}>{coinsCG}</SuiBox>
    </Card>
  );
}

export default OrdersOverview;
