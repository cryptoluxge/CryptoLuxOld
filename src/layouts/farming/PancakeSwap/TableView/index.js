import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Badge from "@mui/material/Badge";
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
import { useTotalLiquidityUSD, usePoolMultiplier, usePoolWeight, getUserPendingCake } from "utils/PancakeSwapHelpers/farmHelpers";
import { useCakePrice } from "hooks/getDexTokenPrices";
import { getFarmApr } from "utils/PancakeSwapHelpers/aprHelpers";
import DetailsBox from "./components/detailsBox";
import StakedLPBox from "./components/stakedLPBox";
import PendingBox from "./components/pendingBox";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 23,
  height: 23,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function PoolRow({ pid, lpName, lpAddress, tokenAddress, quoteTokenAddress }) {
  const mountedRef = useRef(true);
  const [open, setOpen] = useState(false);
  const { account, active } = useWeb3React();
  const [pendingCakes, setPendingCakes] = useState(Number);
  const [cakePrice, setCakePrice] = useState(Number);
  const [multiplier, setMultiplier] = useState(Number);
  const [totalLiquidity, setTotalLiquidity] = useState(Number);
  const [poolApr, setPoolApr] = useState();

  async function FarmData() {
    const price = await useCakePrice();
    setCakePrice(price);

    const liquidity = await useTotalLiquidityUSD(lpAddress);
    setTotalLiquidity(liquidity);

    const poolMultiplier = await usePoolMultiplier(pid);
    setMultiplier(poolMultiplier);
  }

  async function getUserData() {
    await FarmData();
    const pendingRewards = await getUserPendingCake(pid, account);
    setPendingCakes(pendingRewards);
  }

  useEffect(async () => {
    if (Number(totalLiquidity) > 0) {
      const poolWeight = await usePoolWeight(pid);
      const apr = getFarmApr(poolWeight, cakePrice, totalLiquidity, lpAddress);
      setPoolApr(apr);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [totalLiquidity]);

  useEffect(async () => {
    if (active === true) {
      await getUserData();
    } else {
      FarmData();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <React.Fragment key="key">
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row" sx={{ alignItems: "center" }}>
          <SuiBox sx={{ display: "flex", alignItems: "center" }}>
            <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={<SmallAvatar alt="token" src={`https://pancakeswap.finance/images/tokens/${quoteTokenAddress}.svg`} />}>
              <Avatar alt="quoteToken" src={`https://pancakeswap.finance/images/tokens/${tokenAddress}.svg`} />
            </Badge>
            <SuiBox ml={1}>
              <SuiTypography fontSize={14} fontWeight="bold">
                {lpName}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>?????????????????????????????????</SuiTypography>
          {pendingCakes >= 0 && active === true ? (
            <SuiTypography fontWeight="bold" textGradient={Number(pendingCakes) > 0 ? true : null} color={Number(pendingCakes) > 0 ? "primary" : "dark"} sx={{ fontSize: 14 }}>
              {Number(pendingCakes).toFixed(3)} (${(pendingCakes * cakePrice).toLocaleString("en-US")})
            </SuiTypography>
          ) : (
            <LoadingAnimation />
          )}
        </TableCell>
        {window.innerWidth < 500 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>?????????????????????????????????</SuiTypography>
            {Number(totalLiquidity) > 0 ? (
              <SuiTypography fontSize={13} fontWeight="bold">
                ${totalLiquidity.toLocaleString("en-US")}
              </SuiTypography>
            ) : (
              <LoadingAnimation />
            )}
          </TableCell>
        )}
        {window.innerWidth < 500 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>APR</SuiTypography>
            {Number(poolApr) > 0 ? (
              <SuiTypography fontSize={13} fontWeight="bold">
                {poolApr.toLocaleString("en-US")}%
              </SuiTypography>
            ) : (
              <LoadingAnimation />
            )}
          </TableCell>
        )}
        {window.innerWidth < 1200 ? null : (
          <TableCell>
            <SuiTypography fontSize={13}>Multiplier</SuiTypography>
            {Number(multiplier) > 0 ? (
              <SuiTypography fontWeight="bold" fontSize={13}>
                {multiplier}x
              </SuiTypography>
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
              <Grid item>
                <DetailsBox pid={pid} lpName={lpName} lpAddress={lpAddress} tokenAddress={tokenAddress} quoteTokenAddress={quoteTokenAddress} poolApr={Number(poolApr)} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <PendingBox pid={pid} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <StakedLPBox pid={pid} lpName={lpName} lpAddress={lpAddress} tokenAddress={tokenAddress} quoteTokenAddress={quoteTokenAddress} />
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

PoolRow.propTypes = {
  pid: PropTypes.number.isRequired,
  lpName: PropTypes.string.isRequired,
  lpAddress: PropTypes.string.isRequired,
  tokenAddress: PropTypes.string.isRequired,
  quoteTokenAddress: PropTypes.string.isRequired,
};

export default PoolRow;
