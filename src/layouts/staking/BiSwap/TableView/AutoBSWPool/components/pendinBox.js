import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Stack from "@mui/material/Stack";
import LoadingAnimation from "components/LoadingAnimation";
import { useWeb3React } from "@web3-react/core";
import borders from "assets/theme/base/borders";
import ConnectWalletButton from "components/ConnectWalletButton";
import HarvestButton from "../Buttons/HarvestButton";

function PendingBox({ pendingBsw, pendingUSD }) {
  const { borderWidth, borderColor } = borders;
  const mountedRef = useRef(true);
  const { active } = useWeb3React();

  useEffect(() => {
    mountedRef.current = false;
  }, [active]);

  return (
    <SuiBox border={`${borderWidth[1]} solid ${borderColor}`} borderRadius="lg" p={2}>
      <SuiBox>
        <SuiTypography fontSize="14px">დაგროვებული BSW</SuiTypography>
        {active ? (
          <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
            <Grid container spacing={1}>
              <Grid item>
                {pendingBsw >= 0 && active === true ? (
                  <SuiBox>
                    <SuiTypography sx={{ fontSize: 14 }}>{Number(pendingBsw).toFixed(5)}</SuiTypography>
                    <SuiTypography sx={{ fontSize: 14 }}>~${(pendingBsw * pendingUSD).toLocaleString("en-US")}</SuiTypography>
                  </SuiBox>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
            </Grid>
            <SuiBox>
              <Stack direction={{ xs: "row", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 1 }}>
                <HarvestButton />
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
  pendingBsw: PropTypes.number.isRequired,
  pendingUSD: PropTypes.number.isRequired,
};

export default PendingBox;
