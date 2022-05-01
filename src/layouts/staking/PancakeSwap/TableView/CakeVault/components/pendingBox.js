import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Stack from "@mui/material/Stack";
import LoadingAnimation from "components/LoadingAnimation";
import { contract } from "config/PancakeSwap/constants/contracts";
import { useWeb3React } from "@web3-react/core";
import borders from "assets/theme/base/borders";
import ConnectWalletButton from "components/ConnectWalletButton";
import HarvestButton from "../Buttons/HarvestButton";

function PendingBox({ pendingCake, pendingUSD, locked }) {
  const { borderWidth, borderColor } = borders;
  const mountedRef = useRef(true);
  const { active } = useWeb3React();

  useEffect(() => {
    mountedRef.current = false;
  }, [active]);

  return (
    <SuiBox border={`${borderWidth[1]} solid ${borderColor}`} borderRadius="lg" p={2}>
      <SuiBox>
        <SuiTypography fontSize="14px">დაგროვებული CAKE</SuiTypography>
        {active ? (
          <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
            <Grid container spacing={1}>
              <Grid item>
                {pendingCake >= 0 && active === true ? (
                  <SuiBox>
                    <SuiTypography sx={{ fontSize: 14 }}>{Number(pendingCake).toFixed(5)}</SuiTypography>
                    <SuiTypography sx={{ fontSize: 14 }}>~${pendingUSD.toLocaleString("en-US")}</SuiTypography>
                  </SuiBox>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
            </Grid>
            <SuiBox>
              <Stack direction={{ xs: "row", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 1 }}>
                {locked ? null : (
                  <Grid item>
                    <HarvestButton contractAddress={contract.cakeVaultV2.contractAddress} symbol="CAKE" />
                  </Grid>
                )}
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
  pendingCake: PropTypes.number.isRequired,
  pendingUSD: PropTypes.number.isRequired,
  locked: PropTypes.bool.isRequired,
};

export default PendingBox;
