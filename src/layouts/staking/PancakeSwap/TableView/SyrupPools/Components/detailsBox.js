import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import SuiBox from "components/SuiBox";
import Info from "components/Info";
import LoadingAnimation from "components/LoadingAnimation";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { explorerLink } from "utils/getExplorerUrls";
import AddToMetamaskButton from "components/AddToMetamaskButton";
import { getHasUserLimit, getPoolLimitPerUser } from "utils/PancakeSwapHelpers/SyrupPoolHelpers";

function DetailsBox({ tokenContractAddress, contractAddress, perBlock, symbol, decimals, twitter, telegram, website, endBlock, apr, daysleft }) {
  const mountedRef = useRef(true);
  const { active } = useWeb3React();
  const [userLimit, setUserLimit] = useState(false);
  const [poolLimit, setPoolLimit] = useState();
  const web3 = new Web3("https://bsc-dataseed.binance.org");

  async function getUserData() {
    const hasUserLimit = await getHasUserLimit(contractAddress);
    const poolLimitPerUser = await getPoolLimitPerUser(contractAddress);
    if (hasUserLimit) {
      setUserLimit(true);
      setPoolLimit(web3.utils.fromWei(poolLimitPerUser, "ether"));
    } else {
      setUserLimit(false);
    }
  }

  useEffect(async () => {
    if (active === true) {
      await getUserData();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      {userLimit ? <Info name="ლიმიტი: " data={`${poolLimit} CAKE`} /> : null}
      <Info name="APR: " data={<SuiBox>{Number(apr) > 0 ? `${Number(apr).toFixed(2)}%` : <LoadingAnimation sigrdze={70} />}</SuiBox>} />
      <Info name="ბლოკში: " data={`${perBlock} ${symbol}`} />
      <Info
        name="დამთავრდება: "
        data={
          <SuiBox>
            {Number(daysleft) > 0 ? (
              <Link fontSize="14px" variant="inherit" color="dark.main" target="_blank" href={`https://bscscan.com/block/countdown/${endBlock}`}>
                {daysleft.toLocaleString("en-US")} დღეში
              </Link>
            ) : (
              <LoadingAnimation />
            )}
          </SuiBox>
        }
      />
      <Link href={explorerLink("wallet", contractAddress, 56)} target="_blank" underline="none" sx={{ fontSize: 14 }}>
        კონტრაქტის ნახვა <OpenInNewIcon />
      </Link>
      <AddToMetamaskButton tokenAddress={tokenContractAddress} tokenSymbol={symbol} tokenDecimals={decimals} />
      <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item>
          <IconButton aria-label="twitter" size="small" href={twitter} target="_blank" color="dark">
            <TwitterIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="telegram" size="small" href={telegram} target="_blank" color="dark">
            <TelegramIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="world" size="small" href={website} target="_blank" color="dark">
            <LanguageIcon />
          </IconButton>
        </Grid>
      </Grid>
    </SuiBox>
  );
}

DetailsBox.propTypes = {
  tokenContractAddress: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  perBlock: PropTypes.number.isRequired,
  endBlock: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  telegram: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  daysleft: PropTypes.number.isRequired,
  decimals: PropTypes.number.isRequired,
  apr: PropTypes.number.isRequired,
};

export default DetailsBox;
