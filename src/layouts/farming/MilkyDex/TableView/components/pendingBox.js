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
import { useMidPrice } from "hooks/getDexTokenPrices";
import { getUserPendingMID } from "utils/MilkyDexHelpers/farmHelpers";
import HarvestButton from "../../Buttons/HarvestButton";

function PendingBox({ pid }) {
  const mountedRef = useRef(true);
  const { borderWidth, borderColor } = borders;
  const { account, active } = useWeb3React();

  const [pendingMID, setPendingMID] = useState(Number);
  const [midPrice, setMidPrice] = useState(Number);

  async function getUserData() {
    const price = await useMidPrice();
    setMidPrice(price);

    const pendingRewards = await getUserPendingMID(pid, account);
    setPendingMID(pendingRewards);
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
        <SuiTypography sx={{ fontSize: 14 }}>დაგროვებული MID</SuiTypography>
        {active ? (
          <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
            <Grid container spacing={1}>
              <Grid item>
                {pendingMID >= 0 && active === true ? (
                  <SuiBox>
                    <SuiTypography sx={{ fontSize: 14 }}>{Number(pendingMID).toFixed(5)}</SuiTypography>
                    <SuiTypography sx={{ fontSize: 14 }}>~${(pendingMID * midPrice).toLocaleString("en-US")}</SuiTypography>
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
