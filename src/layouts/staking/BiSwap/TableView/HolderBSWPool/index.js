import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import LoadingAnimation from "components/LoadingAnimation";
import { useWeb3React } from "@web3-react/core";
import { useBswPrice } from "hooks/getDexTokenPrices";
import DetailsBox from "./components/detailsBox";
import PendingBox from "./components/pendinBox";
import StakedBox from "./components/StakedBox";
import { getUserVaultData, getHolderBSWTVL } from "./Helpers";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 23,
  height: 23,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function CakeVault() {
  const [open, setOpen] = useState(false);
  const { account, active } = useWeb3React();
  const [pendingBsw, setPendingBsw] = useState();
  const [stakedBsw, setStakedBsw] = useState();
  const [bswPrice, setBswPrice] = useState();
  const [totalStakedBsw, setTotalStakedBsw] = useState();

  async function getTvl() {
    const tvl = await getHolderBSWTVL();
    setTotalStakedBsw(tvl);
  }

  async function userData() {
    const price = await useBswPrice();
    setBswPrice(price);
    const data = await getUserVaultData(account);
    console.log("HolderPool: ", data);
    setPendingBsw(data.pendingReward);
    setStakedBsw(data.currentBsw);
  }

  useEffect(() => {
    getTvl();
    if (active === true) {
      userData();
    }
  }, [active]);

  return (
    <React.Fragment key="key">
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row" sx={{ alignItems: "center" }}>
          <SuiBox sx={{ display: "flex" }}>
            <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={<SmallAvatar alt="BSW" src="https://biswap.org/images/tokens/bsw.svg" />}>
              <Avatar alt="BSW" src="https://biswap.org/images/tokens/bsw.svg" />
            </Badge>
            <SuiBox ml={2} sx={{ alignItems: "center" }}>
              <SuiTypography fontSize={13} fontWeight="bold">
                Holder BSW
              </SuiTypography>
              {window.innerWidth < 650 ? null : <SuiTypography fontSize={11}>Stake BSW</SuiTypography>}
            </SuiBox>
          </SuiBox>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>დაგროვებული</SuiTypography>
          {pendingBsw >= 0 && active === true ? (
            <SuiTypography textGradient={Number(pendingBsw) > 0 ? true : null} color={Number(pendingBsw) > 0 ? "primary" : "dark"} fontWeight="bold" sx={{ fontSize: 14 }}>
              {Number(pendingBsw).toFixed(3)} (${(pendingBsw * bswPrice).toLocaleString("en-US")})
            </SuiTypography>
          ) : (
            <LoadingAnimation />
          )}
        </TableCell>
        {window.innerWidth < 500 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>დასტეიკებული</SuiTypography>
            {Number(stakedBsw) >= 0 ? (
              <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                {Number(stakedBsw).toLocaleString()} BSW (${(stakedBsw * bswPrice).toLocaleString("en-US")})
              </SuiTypography>
            ) : (
              <LoadingAnimation sigrdze={70} />
            )}
          </TableCell>
        )}
        {window.innerWidth < 500 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>APR</SuiTypography>
            <SuiTypography fontWeight="bold" fontSize={13}>
              100%
            </SuiTypography>
          </TableCell>
        )}
        {window.innerWidth < 1200 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>Total Staked</SuiTypography>
            {Number(totalStakedBsw) > 0 ? (
              <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                {Number(totalStakedBsw).toLocaleString("en-US")} BSW
              </SuiTypography>
            ) : (
              <LoadingAnimation sigrdze={70} />
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
                <DetailsBox totalStakedInPool={Number(totalStakedBsw)} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <PendingBox pendingBsw={pendingBsw > 0 ? pendingBsw : 0} pendingUSD={bswPrice > 0 ? bswPrice : 0} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <StakedBox stakedBsw={stakedBsw > 0 ? stakedBsw : 0} stakedTokenPrice={bswPrice > 0 ? bswPrice : 0} />
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CakeVault;
