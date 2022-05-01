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
import { useYelPrice } from "hooks/getDexTokenPrices";
import { getUserPendingYEL } from "utils/YelFinanceHelpers/farmHelpers";
import HarvestButton from "../../Buttons/HarvestButton";

function PendingBox({ pid }) {
  const mountedRef = useRef(true);
  const { borderWidth, borderColor } = borders;
  const { account, active } = useWeb3React();

  const [pendingYel, setPendingYel] = useState(Number);
  const [yelPrice, setYelPrice] = useState(Number);

  async function getUserData() {
    const price = await useYelPrice();
    setYelPrice(price);

    const pendingRewards = await getUserPendingYEL(pid, account);
    setPendingYel(pendingRewards);
  }

  useEffect(() => {
    if (active === true) {
      getUserData();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox border={`${borderWidth[1]} solid ${borderColor}`} borderRadius="lg" p={2}>
      <SuiBox>
        <SuiTypography sx={{ fontSize: 14 }}>დაგროვებული YEL</SuiTypography>
        {active ? (
          <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
            <Grid container spacing={1}>
              <Grid item>
                {pendingYel >= 0 && active === true ? (
                  <SuiBox>
                    <SuiTypography sx={{ fontSize: 14 }}>{Number(pendingYel).toFixed(5)}</SuiTypography>
                    <SuiTypography sx={{ fontSize: 14 }}>~${(pendingYel * yelPrice).toLocaleString("en-US")}</SuiTypography>
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

PendingBox.propTypes = {
  pid: PropTypes.number.isRequired,
};

export default PendingBox;
