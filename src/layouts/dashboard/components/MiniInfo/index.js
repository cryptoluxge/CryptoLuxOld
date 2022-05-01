import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import ImageIcon from "@mui/icons-material/Image";
import BitcoinLogo from "examples/Icons/BitcoinLogo";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Web3 from "web3";
import SuiBox from "components/SuiBox";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

function MiniInfo() {
  const mountedRef = useRef(true);
  const { chainId, account, active } = useWeb3React();
  const [nativeBalance, setNativeBalance] = useState(Number);
  const [tokenBalance, setTokenBalance] = useState(Number);
  const [nftBalance, setNftBalance] = useState(Number);
  const [bitcoinPrice, setBitcoinPrice] = useState(Number);
  const [bitcoinPriceChange, setBitcoinPriceChange] = useState(Number);

  const web3 = new Web3(window.ethereum);

  async function getNativeBalance() {
    if (chainId === 56) {
      try {
        const userBalance = await web3.eth.getBalance(account);
        setNativeBalance(Number(web3.utils.fromWei(userBalance, "ether")));
      } catch (error) {
        setNativeBalance("error");
      }
    } else if (chainId === 43114) {
      try {
        const userBalance = await web3.eth.getBalance(account);
        setNativeBalance(Number(web3.utils.fromWei(userBalance, "ether")));
      } catch (error) {
        setNativeBalance("error");
      }
    } else if (chainId === 2001) {
      try {
        const userBalance = await web3.eth.getBalance(account);
        setNativeBalance(Number(web3.utils.fromWei(userBalance, "ether")));
      } catch (error) {
        setNativeBalance("error");
      }
    }
  }

  function getTokenBalance() {
    let chainName;
    if (chainId === 56) {
      chainName = "bsc";
    } else if (chainId === 43114) {
      chainName = "avalanche";
    } else if (chainId === 1) {
      chainName = "eth";
    }

    axios
      .get(`https://deep-index.moralis.io/api/v2/${account}/erc20?chain=${chainName}`, {
        headers: {
          "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
        },
      })
      .then((response) => {
        setTokenBalance(response.data.length);
      })
      .catch(() => {
        setTokenBalance("error");
      });
  }

  function getNftBalance() {
    let chainName;
    if (chainId === 56) {
      chainName = "bsc";
    } else if (chainId === 43114) {
      chainName = "avalanche";
    } else if (chainId === 1) {
      chainName = "eth";
    }

    axios
      .get(`https://deep-index.moralis.io/api/v2/${account}/nft?chain=${chainName}`, {
        headers: {
          "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
        },
      })
      .then((response) => {
        setNftBalance(response.data.total);
      })
      .catch(() => {
        setNftBalance("error");
      });
  }

  function getBtcPrice() {
    axios
      .get("https://api.coingecko.com/api/v3/coins/bitcoin?tickers=false&community_data=false&developer_data=false")
      .then((response) => {
        setBitcoinPrice(Number(response.data.market_data.current_price.usd));
        setBitcoinPriceChange(Number(response.data.market_data.price_change_percentage_1h_in_currency.usd));
      })
      .catch(() => {
        setBitcoinPrice("error");
      });
  }

  useEffect(() => {
    if (active === true) {
      getNativeBalance();
      getTokenBalance();
      getNftBalance();
      getBtcPrice();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard title={{ text: "ბალანსი" }} count={nativeBalance !== "error" ? nativeBalance.toLocaleString("en-US") : <Skeleton sx={{ width: 100 }} />} icon={{ color: "primary", component: "paid" }} />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard title={{ text: "ტოკენები" }} count={tokenBalance !== "error" ? tokenBalance : <Skeleton sx={{ width: 100 }} />} icon={{ color: "primary", component: <CircleRoundedIcon /> }} />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard title={{ text: "NFT" }} count={nftBalance !== "error" ? nftBalance : <Skeleton sx={{ width: 100 }} />} icon={{ color: "primary", component: <ImageIcon /> }} />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "ბიტკოინის ფასი" }}
            count={`$${bitcoinPrice.toLocaleString("en-US")}`}
            percentage={{ color: bitcoinPriceChange > 0 ? "success" : "error", text: `${bitcoinPriceChange.toFixed(2)}%` }}
            icon={{
              color: "primary",
              component: <BitcoinLogo size={52} color="white" />,
            }}
          />
        </Grid>
      </Grid>
    </SuiBox>
  );
}

export default MiniInfo;
