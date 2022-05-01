import React, { useEffect, useState, useRef } from "react";
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
import WarningIcon from "@mui/icons-material/Warning";
import SuiTypography from "components/SuiTypography";
import Stack from "@mui/material/Stack";
import LoadingAnimation from "components/LoadingAnimation";
import { useWeb3React } from "@web3-react/core";
import { useCakePrice } from "hooks/getDexTokenPrices";
import StakedCakeBox from "./components/stakedCakeBox";
import { getVaultUserData, getTotalStakedCake, getTotalCakeLocked } from "./Helpers";
import DetailsBox from "./components/detailsBox";
import PendingBox from "./components/pendingBox";
import ConvertToLockedButton from "./Buttons/ConvertToFlexibleButton";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 23,
  height: 23,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function CakeVault() {
  const mountedRef = useRef(true);
  const { account, active } = useWeb3React();
  const [open, setOpen] = useState(false);
  const [pendingCakes, setPendingCakes] = useState(Number);
  const [stakedCake, setStakedCake] = useState(Number);
  const [totalStakedInPool, setTotalStakedInPool] = useState(Number);
  const [totalLockedInPool, setTotalLockedInPool] = useState(Number);
  const [cakePrice, setCakePrice] = useState(Number);
  const [locked, setLocked] = useState(false);

  async function getTotalStaked() {
    const stakedInPool = await getTotalStakedCake();
    setTotalStakedInPool(stakedInPool);
  }

  async function getTotalLockedCake() {
    const LockedInPool = await getTotalCakeLocked();
    setTotalLockedInPool(LockedInPool);
  }

  async function getUserData() {
    const price = await useCakePrice();
    setCakePrice(price);

    const userData = await getVaultUserData(account);
    console.log("index: ", userData);
    setLocked(userData.isLocked);
    setStakedCake(userData.cakeAmount);
    setPendingCakes(userData.pendingAmount);
  }

  useEffect(() => {
    getTotalStaked();
    getTotalLockedCake();
    if (active === true) {
      getUserData();
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
            <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={<SmallAvatar alt="CAKE" src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.svg" />}>
              <Avatar alt="CAKE" src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.svg" />
            </Badge>
            <SuiBox ml={2} sx={{ alignItems: "center" }}>
              <SuiTypography fontSize={13} fontWeight="bold">
                Earn, IFO & More
              </SuiTypography>
              {window.innerWidth < 650 ? null : <SuiTypography fontSize={11}>Stake CAKE</SuiTypography>}
            </SuiBox>
          </SuiBox>
        </TableCell>
        <TableCell align="left">
          <SuiTypography fontSize={13}>დაგროვებული </SuiTypography>
          {pendingCakes >= 0 && active === true ? (
            <SuiTypography textGradient={Number(pendingCakes) > 0 ? true : null} color={Number(pendingCakes) > 0 ? "primary" : "dark"} fontWeight="bold" sx={{ fontSize: 14 }}>
              {Number(pendingCakes).toFixed(3)} (${(pendingCakes * cakePrice).toLocaleString("en-US")})
            </SuiTypography>
          ) : (
            <LoadingAnimation />
          )}
        </TableCell>
        {window.innerWidth < 500 ? null : (
          <TableCell align="left">
            <SuiTypography fontSize={13}>დასტეიკებული</SuiTypography>
            {Number(stakedCake) >= 0 ? (
              <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                {Number(stakedCake).toLocaleString()} CAKE (${(stakedCake * cakePrice).toLocaleString("en-US")})
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
            {Number(totalStakedInPool) > 0 ? (
              <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                {Number(totalStakedInPool).toLocaleString("en-US")} CAKE
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
                <DetailsBox locked={locked} totalLockedInPool={Number(totalLockedInPool)} totalStakedInPool={Number(totalStakedInPool)} />
              </Grid>
              <Grid item xs={12} sm={4} xl={4}>
                <PendingBox pendingCake={Number(pendingCakes)} pendingUSD={Number(pendingCakes * cakePrice)} locked={locked} />
              </Grid>
              <Grid item xs={12} sm={4} xl={5}>
                <StakedCakeBox />
              </Grid>
              {locked ? null : (
                <Stack ml={2} sx={{ backgroundColor: "#ffb957", display: "flex" }} mb={1} mt={1} direction={{ xs: "column", sm: "column", md: "row" }} borderRadius="10px" spacing={1} p={1}>
                  <WarningIcon color="white" />
                  <SuiTypography fontSize="15px" color="white">
                    Locked სტეიკინგი გთავაზობთ მაღალ APY-ს და სხვადასხვა ბენეფიტებს.
                  </SuiTypography>
                  <ConvertToLockedButton />
                </Stack>
              )}
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CakeVault;
