import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import Stack from "@mui/material/Stack";
import ConnectWalletButton from "components/ConnectWalletButton";
import ChangeNetworkButton from "components/ChangeNetworkButton";
import borders from "assets/theme/base/borders";
import SuiButton from "components/SuiButton";
import { useWeb3React } from "@web3-react/core";
import { getIsHolderPoolApproved } from "../Helpers";
import DepositButton from "../Buttons/DepositButton";
import WithdrawButton from "../Buttons/WithdrawButton";

function StakedBox({ stakedBsw, stakedTokenPrice }) {
  const { borderWidth, borderColor } = borders;
  const { active, account, chainId } = useWeb3React();
  const [approved, setApproved] = useState();

  async function checkApprove() {
    const getApprove = getIsHolderPoolApproved(account);
    setApproved(getApprove);
  }

  useEffect(() => {
    if (active === true) {
      checkApprove();
    }
  }, [active]);

  return (
    <SuiBox border={`${borderWidth[1]} solid ${borderColor}`} borderRadius="lg" p={2}>
      <SuiBox>
        <SuiTypography sx={{ fontSize: 14 }}>დასტეიკებული BSW</SuiTypography>
        {active ? (
          <SuiBox>
            {chainId === 56 ? (
              <SuiBox>
                {approved ? (
                  <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
                    <Grid container spacing={1}>
                      <Grid item>
                        {stakedBsw >= 0 && active === true ? (
                          <SuiBox>
                            <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                              {Number(stakedBsw).toFixed(5)}
                            </SuiTypography>
                            <SuiTypography sx={{ fontSize: 14 }}>~${(stakedBsw * stakedTokenPrice).toLocaleString("en-US")}</SuiTypography>
                          </SuiBox>
                        ) : (
                          <LoadingAnimation sigrdze={70} />
                        )}
                      </Grid>
                    </Grid>
                    <SuiBox>
                      <Stack direction={{ xs: "row", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <WithdrawButton />
                        <DepositButton />
                      </Stack>
                    </SuiBox>
                  </SuiBox>
                ) : (
                  <SuiButton>Approve</SuiButton>
                )}
              </SuiBox>
            ) : (
              <ChangeNetworkButton changeTo="BSC" />
            )}
          </SuiBox>
        ) : (
          <ConnectWalletButton />
        )}
      </SuiBox>
    </SuiBox>
  );
}

StakedBox.propTypes = {
  stakedBsw: PropTypes.number.isRequired,
  stakedTokenPrice: PropTypes.number.isRequired,
};

export default StakedBox;
