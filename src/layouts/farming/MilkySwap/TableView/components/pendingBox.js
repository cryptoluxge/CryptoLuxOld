import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import borders from "assets/theme/base/borders";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import Stack from "@mui/material/Stack";
import ConnectWalletButton from "components/ConnectWalletButton";
import { useWeb3React } from "@web3-react/core";
import { useMilkyPrice } from "hooks/getDexTokenPrices";
import { getUserPendingMILKY } from "utils/MilkySwapHelpers/farmHelpers";
import HarvestButton from "../../Buttons/HarvestButton";

function PoolRow({ pid }) {
  const { borderWidth, borderColor } = borders;
  const mountedRef = useRef(true);
  const { account, active } = useWeb3React();
  const [pendingMilkies, setPendingMilkies] = useState(Number);
  const [milkyPrice, setMilkyPrice] = useState(Number);

  async function getUserData() {
    const price = await useMilkyPrice();
    setMilkyPrice(price);

    const pendingRewards = await getUserPendingMILKY(pid, account);
    setPendingMilkies(pendingRewards);
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
    <SuiBox border={`${borderWidth[1]} solid ${borderColor}`} borderRadius="lg" p={2}>
      <SuiBox>
        <SuiTypography sx={{ fontSize: 14 }}>დაგროვებული MILKY</SuiTypography>
        {active ? (
          <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
            <Grid container spacing={1}>
              <Grid item>
                {pendingMilkies >= 0 && active === true ? (
                  <SuiBox>
                    <SuiTypography sx={{ fontSize: 14 }}>{Number(pendingMilkies).toFixed(5)}</SuiTypography>
                    <SuiTypography sx={{ fontSize: 14 }}>~${(pendingMilkies * milkyPrice).toLocaleString("en-US")}</SuiTypography>
                  </SuiBox>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
            </Grid>
            <SuiBox>
              <Stack direction={{ xs: "row", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 1 }}>
                <HarvestButton pid={pid} />
              </Stack>
            </SuiBox>
          </SuiBox>
        ) : (
          <ConnectWalletButton />
        )}
      </SuiBox>
    </SuiBox>
  );
}

PoolRow.propTypes = {
  pid: PropTypes.number.isRequired,
};

export default PoolRow;
