import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Mui Components
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
// Sui Components
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
// Web3
import { useWeb3React } from "@web3-react/core";
// Hooks
import { useMilkyPrice } from "hooks/getDexTokenPrices";
import { useTotalLiquidityUSD, usePoolMultiplier, usePoolWeight, getUserPendingMILKY } from "utils/MilkySwapHelpers/farmHelpers";
import { getFarmApr } from "utils/MilkySwapHelpers/apr";
// Buttons
import StakedBox from "./components/stakedBox";
import PendingBox from "./components/pendingBox";
import DetailsBox from "./components/detailsBox";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 23,
  height: 23,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function PoolRow({ pid, lpName, lpAddress, tokenAddress, quoteTokenAddress, tokenLogo, quoteTokenLogo }) {
  const mountedRef = useRef(true);
  const [open, setOpen] = useState(false);
  const { account, active } = useWeb3React();
  // User Data
  const [pendingMilkies, setPendingMilkies] = useState(Number);
  const [milkyPrice, setMilkyPrice] = useState(Number);
  const [totalLiquidity, setTotalLiquidity] = useState(Number);
  const [multiplier, setMultiplier] = useState(Number);
  const [poolApr, setPoolApr] = useState();

  async function getFarmData() {
    const price = await useMilkyPrice();
    setMilkyPrice(price);

    const liqusd = await useTotalLiquidityUSD(lpAddress);
    setTotalLiquidity(liqusd);

    const multi = await usePoolMultiplier(pid);
    setMultiplier(multi);
  }

  async function getUserData() {
    const price = await useMilkyPrice();
    setMilkyPrice(price);

    const pendingRewards = await getUserPendingMILKY(pid, account);
    setPendingMilkies(pendingRewards);

    await getFarmData();
  }

  useEffect(async () => {
    if (Number(totalLiquidity) > 0) {
      const poolWeight = await usePoolWeight(pid);
      const apr = getFarmApr(poolWeight, milkyPrice, totalLiquidity);
      setPoolApr(apr);
    }
  }, [totalLiquidity]);

  useEffect(async () => {
    if (active === true) {
      await getUserData();
    } else {
      getFarmData();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <React.Fragment key="key">
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row" sx={{ alignItems: "center" }}>
          <SuiBox sx={{ display: "flex" }}>
            <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={<SmallAvatar alt="token" src={tokenLogo} />}>
              <Avatar alt="quoteToken" src={quoteTokenLogo} />
            </Badge>
            <SuiBox ml={2}>
              <SuiTypography fontSize={14} fontWeight="bold">
                Earn MILKY
              </SuiTypography>
              {window.innerWidth < 500 ? null : <SuiTypography fontSize={11}>Stake {lpName}</SuiTypography>}
            </SuiBox>
          </SuiBox>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>დაგროვებული</SuiTypography>
          {pendingMilkies >= 0 && active === true ? (
            <SuiTypography fontWeight="bold" textGradient={Number(pendingMilkies) > 0 ? true : null} color={Number(pendingMilkies) > 0 ? "primary" : "dark"} sx={{ fontSize: 14 }}>
              {Number(pendingMilkies).toFixed(3)} (${(pendingMilkies * milkyPrice).toLocaleString("en-US")})
            </SuiTypography>
          ) : (
            <LoadingAnimation />
          )}
        </TableCell>
        {window.innerWidth < 500 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>ლიკვიდურობა</SuiTypography>
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
          <TableCell align="left">
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
                <DetailsBox lpAddress={lpAddress} poolApr={Number(poolApr)} lpName={lpName} tokenAddress={tokenAddress} quoteTokenAddress={quoteTokenAddress} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <PendingBox pid={pid} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <StakedBox pid={pid} lpName={lpName} lpAddress={lpAddress} tokenAddress={tokenAddress} quoteTokenAddress={quoteTokenAddress} />
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
  tokenLogo: PropTypes.string.isRequired,
  quoteTokenLogo: PropTypes.string.isRequired,
};

export default PoolRow;
