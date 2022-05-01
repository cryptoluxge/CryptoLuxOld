import { useState, useEffect, useRef } from "react";
// @mui material components
import Card from "@mui/material/Card";
import axios from "axios";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import LoadingAnimation from "components/LoadingAnimation";

import DeFiDashboardItem from "examples/Timeline/DeFiDashboardItem";

function DeFiInfo() {
  const mountedRef = useRef(true);
  const [defiInfo, setDefiInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function defi() {
    axios.get("https://api.coingecko.com/api/v3/global/decentralized_finance_defi").then((response) => {
      setIsLoading(true);
      setDefiInfo(response.data.data);
      setIsLoading(false);
    });
  }

  const formatCash = (n) => {
    const number = n;
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return `$${+(n / 1e3).toFixed(2)}K`;
    if (n >= 1e6 && n < 1e9) return `$${+(n / 1e6).toFixed(2)}M`;
    if (n >= 1e9 && n < 1e12) return `$${+(n / 1e9).toFixed(2)}B`;
    if (n >= 1e12) return `$${+(n / 1e12).toFixed(2)}T`;
    return number;
  };

  useEffect(() => {
    defi();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <Card className="h-100">
      <SuiBox pt={3} px={3}>
        <SuiTypography variant="h6" fontWeight="medium">
          DeFi ინფორმაცია
        </SuiTypography>
      </SuiBox>
      <SuiBox p={2}>
        <DeFiDashboardItem name="DeFi MarketCap" value={isLoading === false ? formatCash(defiInfo.defi_market_cap) : <LoadingAnimation sigrdze={50} />} />
        <DeFiDashboardItem name="ნავაჭრი (24სთ)" value={isLoading === false ? formatCash(defiInfo.trading_volume_24h) : <LoadingAnimation sigrdze={50} />} />
        <DeFiDashboardItem name="DeFi Dominance" value={isLoading === false ? `${Number(defiInfo.defi_dominance).toFixed(2)}%` : <LoadingAnimation sigrdze={50} />} />
        <DeFiDashboardItem name="Top Coin" value={isLoading === false ? defiInfo.top_coin_name : <LoadingAnimation sigrdze={50} />} />
        <DeFiDashboardItem name="Top Coin Dominance" value={isLoading === false ? `${defiInfo.top_coin_defi_dominance.toFixed(2)}%` : <LoadingAnimation sigrdze={50} />} />
      </SuiBox>
    </Card>
  );
}

export default DeFiInfo;
