import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import { useWeb3React } from "@web3-react/core";
import { getPoolApr } from "utils/PancakeSwapHelpers/aprHelpers";
import { getTokenPriceBSC } from "utils/PancakeSwapHelpers/getTokenPrice";
import { useCakePrice } from "hooks/getDexTokenPrices";
import getBlockNumber from "hooks/getBlockNumber";
import { getSyrupPoolTotalStakedCake, getUserPendingToken } from "utils/PancakeSwapHelpers/SyrupPoolHelpers";
import DetailsBox from "./Components/detailsBox";
import StakedCakeBox from "./Components/stakedCakeBox";
import PendingTokenBox from "./Components/pendingTokenBox";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 23,
  height: 23,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function PoolRow({ tokenContractAddress, symbol, contractAddress, decimals, perBlock, endBlock, startBlock, telegram, twitter, website }) {
  const mountedRef = useRef(true);
  const [open, setOpen] = useState(false);
  const { account, active } = useWeb3React();
  const [pendingToken, setPendingToken] = useState(Number);
  const [poolApr, setPoolApr] = useState(Number);
  const [totalStaked, setTotalStaked] = useState(Number);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [daysToEnd, setDaysToEnd] = useState(0);
  const [currentBlockNumber] = getBlockNumber();

  async function getApr() {
    const cakePrice = await useCakePrice();
    const rewardTokenPrice = await getTokenPriceBSC(tokenContractAddress, decimals);
    const apr = await getPoolApr(cakePrice, rewardTokenPrice, Number(totalStaked), perBlock);
    setPoolApr(apr);
  }

  async function getTotalStakedCake() {
    const totalStakedCake = await getSyrupPoolTotalStakedCake(contractAddress);
    setTotalStaked(Number(totalStakedCake).toFixed(0));
  }

  async function getUserData() {
    const price = await getTokenPriceBSC(tokenContractAddress, decimals);
    setTokenPrice(price);

    const pendingRewards = await getUserPendingToken(account, contractAddress);
    setPendingToken(pendingRewards);

    await getTotalStakedCake();
  }

  useEffect(async () => {
    if (active === true) {
      await getUserData();
    } else {
      getTotalStakedCake();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  useEffect(async () => {
    if (Number(totalStaked) > 0) {
      await getApr();
    }
  }, [totalStaked]);

  useEffect(async () => {
    if (currentBlockNumber > 0) {
      const willEnd = (endBlock - currentBlockNumber) / 28800;
      setDaysToEnd(willEnd);
    }
  }, [currentBlockNumber]);

  return (
    <React.Fragment key="key">
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row" sx={{ alignItems: "center" }}>
          <SuiBox sx={{ display: "flex" }}>
            <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={<SmallAvatar alt="CAKE" src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.svg" />}>
              <Avatar alt="CAKE" src={`https://pancakeswap.finance/images/tokens/${tokenContractAddress}.svg`} />
            </Badge>
            <SuiBox ml={2}>
              <SuiTypography fontSize={14} fontWeight="bold">
                Earn {symbol}
              </SuiTypography>
              {window.innerWidth < 649 ? null : <SuiTypography fontSize={11}>Stake CAKE</SuiTypography>}
            </SuiBox>
          </SuiBox>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>დაგროვებული</SuiTypography>
          {pendingToken >= 0 && active === true ? (
            <SuiTypography fontWeight="bold" textGradient={Number(pendingToken) > 0 ? true : null} color={Number(pendingToken) > 0 ? "primary" : "dark"} fontSize="14px">
              {Number(pendingToken).toFixed(3)} (${(pendingToken * tokenPrice).toLocaleString("en-US")})
            </SuiTypography>
          ) : (
            <LoadingAnimation />
          )}
        </TableCell>
        {window.innerWidth < 500 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>Total Staked</SuiTypography>
            {Number(totalStaked) > 0 ? (
              <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                {Number(totalStaked).toLocaleString()} CAKE
              </SuiTypography>
            ) : (
              <LoadingAnimation sigrdze={70} />
            )}
          </TableCell>
        )}
        {window.innerWidth < 500 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>APR</SuiTypography>
            {Number(poolApr) > 0 ? (
              <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                {Number(poolApr).toFixed(2)}%
              </SuiTypography>
            ) : (
              <LoadingAnimation sigrdze={70} />
            )}
          </TableCell>
        )}
        {window.innerWidth < 1200 ? null : (
          <TableCell>
            <SuiTypography fontSize={13}>დამთავრდება</SuiTypography>
            {daysToEnd > 0 ? (
              <Link fontSize="14px" variant="inherit" color="dark.main" target="_blank" fontWeight="bold" href={`https://bscscan.com/block/countdown/${endBlock}`}>
                {daysToEnd.toLocaleString("en-US")} დღეში
              </Link>
            ) : (
              <LoadingAnimation />
            )}
          </TableCell>
        )}
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={2} mt={1} mb={1}>
              <Grid item xs={12} sm={4} xl={3}>
                <DetailsBox apr={poolApr} daysleft={daysToEnd} tokenContractAddress={tokenContractAddress} contractAddress={contractAddress} symbol={symbol} perBlock={perBlock} decimals={decimals} endBlock={endBlock} twitter={twitter} telegram={telegram} website={website} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <PendingTokenBox contractAddress={contractAddress} symbol={symbol} tokenContractAddress={tokenContractAddress} decimals={decimals} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <StakedCakeBox contractAddress={contractAddress} symbol={symbol} startBlock={startBlock} />
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

PoolRow.propTypes = {
  tokenContractAddress: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  telegram: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  perBlock: PropTypes.number.isRequired,
  decimals: PropTypes.number.isRequired,
  endBlock: PropTypes.number.isRequired,
  startBlock: PropTypes.number.isRequired,
};

export default PoolRow;
