import React, { useState, useRef, useEffect } from "react";
import borders from "assets/theme/base/borders";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import Stack from "@mui/material/Stack";
import ConnectWalletButton from "components/ConnectWalletButton";
import LoadingAnimation from "components/LoadingAnimation";
import { useWeb3React } from "@web3-react/core";
import { useCakePrice } from "hooks/getDexTokenPrices";
import { getUserPendingCake } from "utils/PancakeSwapHelpers/farmHelpers";
import HarvestButton from "../../Buttons/HarvestButton";

function PoolRow({ pid }) {
  const { borderWidth, borderColor } = borders;
  const mountedRef = useRef(true);
  const { account, active } = useWeb3React();
  const [pendingCakes, setPendingCakes] = useState(Number);
  const [cakePrice, setCakePrice] = useState(Number);

  async function getUserData() {
    const price = await useCakePrice();
    setCakePrice(price);

    const pendingRewards = await getUserPendingCake(pid, account);
    setPendingCakes(pendingRewards);
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
        <SuiTypography sx={{ fontSize: 14 }}>დაგროვებული CAKE</SuiTypography>
        {active ? (
          <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
            <Grid container spacing={1}>
              <Grid item>
                {pendingCakes >= 0 && active === true ? (
                  <SuiBox>
                    <SuiTypography sx={{ fontSize: 14 }}>{Number(pendingCakes).toFixed(5)}</SuiTypography>
                    <SuiTypography sx={{ fontSize: 14 }}>~${(pendingCakes * cakePrice).toLocaleString("en-US")}</SuiTypography>
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
