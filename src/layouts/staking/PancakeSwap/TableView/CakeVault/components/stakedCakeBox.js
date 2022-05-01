import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Stack from "@mui/material/Stack";
import ChangeNetworkButton from "components/ChangeNetworkButton";
import { useWeb3React } from "@web3-react/core";
import LoadingAnimation from "components/LoadingAnimation";
import borders from "assets/theme/base/borders";
import { useCakePrice } from "hooks/getDexTokenPrices";
import ConnectWalletButton from "components/ConnectWalletButton";
import SuiButton from "components/SuiButton";
import { getVaultUserData, getCakeVaultV2IsApproved } from "../Helpers";
import ApproveButton from "../Buttons/ApproveButton";
import AddCakeButton from "../Buttons/AddCakeButton";
import WithdrawButton from "../Buttons/WithdrawButton";
import DepositButton from "../Buttons/DepositButton";

function CakeVault() {
  const { borderWidth, borderColor } = borders;
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [stakedCake, setStakedCake] = useState(Number);
  const [approved, setApproved] = useState();
  const [locked, setLocked] = useState();
  const [endTime, setEndTime] = useState();
  const [cakePrice, setCakePrice] = useState(Number);
  async function getUserData() {
    const price = await useCakePrice();
    setCakePrice(price);

    const userData = await getVaultUserData(account);
    setStakedCake(Number(userData.cakeAmount));
    setLocked(userData.isLocked);
    setEndTime(userData.lockEndTime);
    const isApproved = await getCakeVaultV2IsApproved(account);
    setApproved(isApproved);
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
        {active ? (
          <SuiBox>
            {chainId === 56 ? (
              <SuiBox>
                {approved ? (
                  <SuiBox>
                    {locked ? (
                      <SuiBox>
                        <Grid container spacing={3}>
                          <Grid item>
                            <SuiTypography fontSize="14px">{locked ? "დალუქული CAKE" : "დასტეიკებული CAKE"}</SuiTypography>
                            {Number(stakedCake) > 0 ? (
                              <SuiBox>
                                <SuiTypography fontSize="14px" fontWeight="bold">
                                  {Number(stakedCake).toLocaleString()} CAKE
                                </SuiTypography>
                                <SuiTypography sx={{ fontSize: 14 }}>~${(Number(stakedCake) * cakePrice).toLocaleString("en-US")}</SuiTypography>
                              </SuiBox>
                            ) : (
                              <LoadingAnimation sigrdze={70} />
                            )}
                            <SuiBox mt={1}>
                              <AddCakeButton />
                            </SuiBox>
                          </Grid>
                          <Grid item>
                            <SuiTypography fontSize="14px">გაიხსნება</SuiTypography>
                            <SuiTypography fontSize="14px" fontWeight="bold">
                              {endTime.total} კვირაში
                            </SuiTypography>
                            <SuiTypography fontSize="14px" fontWeight="bold">
                              {endTime.date}
                            </SuiTypography>
                            <SuiBox mt={1}>
                              <SuiButton disabled variant="gradient" color="primary">
                                გაგრძელება
                              </SuiButton>
                            </SuiBox>
                          </Grid>
                        </Grid>
                      </SuiBox>
                    ) : (
                      <SuiBox>
                        <SuiTypography fontSize="14px">დასტეიკებული CAKE</SuiTypography>
                        <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
                          <Grid container spacing={1}>
                            <Grid item>
                              {stakedCake >= 0 && active === true ? (
                                <SuiBox>
                                  <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                                    {Number(stakedCake).toFixed(5)}
                                  </SuiTypography>
                                  <SuiTypography sx={{ fontSize: 14 }}>~${(stakedCake * cakePrice).toLocaleString("en-US")}</SuiTypography>
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
                      </SuiBox>
                    )}
                  </SuiBox>
                ) : (
                  <ApproveButton />
                )}
              </SuiBox>
            ) : (
              <ChangeNetworkButton changeTo="BSC" />
            )}
          </SuiBox>
        ) : (
          <ConnectWalletButton loginText="საფულის დაკავშირება" />
        )}
      </SuiBox>
    </SuiBox>
  );
}

export default CakeVault;
