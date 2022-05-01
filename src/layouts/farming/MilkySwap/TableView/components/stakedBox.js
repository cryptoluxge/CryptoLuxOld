import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import borders from "assets/theme/base/borders";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import Stack from "@mui/material/Stack";
import ConnectWalletButton from "components/ConnectWalletButton";
import ChangeNetworkButton from "components/ChangeNetworkButton";
import { useWeb3React } from "@web3-react/core";
import { useTotalLiquidityUSD, uselpTotalSupply, getUserStakedLP, getLPPoolIsApproved } from "utils/MilkySwapHelpers/farmHelpers";
import DepositButton from "../../Buttons/DepositButton";
import WithdrawButton from "../../Buttons/WithdrawButton";
import ApproveButton from "../../Buttons/ApproveButton";

function stakedBox({ pid, lpName, lpAddress, tokenAddress, quoteTokenAddress }) {
  const { borderWidth, borderColor } = borders;
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [stakedLP, setStakedLP] = useState(Number);
  const [approved, setApproved] = useState();
  const [lpPrice, setLpPrice] = useState(Number);

  async function getUserData() {
    const staked = await getUserStakedLP(pid, account);
    setStakedLP(staked);

    const isApproved = await getLPPoolIsApproved(lpAddress, account);
    if (isApproved) {
      setApproved(true);
    } else {
      setApproved(false);
    }

    const liqusd = await useTotalLiquidityUSD(lpAddress);
    const lps = await uselpTotalSupply(lpAddress);
    const lpTokenPrice = Number(liqusd) / Number(lps);
    setLpPrice(lpTokenPrice);
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
        <SuiTypography sx={{ fontSize: 14 }}>დასტეიკებული {lpName}</SuiTypography>
        {active ? (
          <SuiBox>
            {chainId === 2001 ? (
              <SuiBox>
                {approved ? (
                  <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
                    <Grid container spacing={1}>
                      <Grid item>
                        {stakedLP >= 0 && active === true ? (
                          <SuiBox>
                            <SuiTypography sx={{ fontSize: 14 }} fontWeight="light">
                              {Number(stakedLP).toFixed(5)}
                            </SuiTypography>
                            {Number(lpPrice) > 0 ? <SuiTypography sx={{ fontSize: 14 }}>~${(stakedLP * lpPrice).toLocaleString("en-US")}</SuiTypography> : <LoadingAnimation sigrdze={30} />}
                          </SuiBox>
                        ) : (
                          <LoadingAnimation sigrdze={70} />
                        )}
                      </Grid>
                    </Grid>
                    <SuiBox>
                      <Stack direction={{ xs: "row", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <WithdrawButton pid={pid} />
                        <DepositButton pid={pid} lpAddress={lpAddress} name={lpName} token={tokenAddress} quoteToken={quoteTokenAddress} />
                      </Stack>
                    </SuiBox>
                  </SuiBox>
                ) : (
                  <ApproveButton lpAddress={lpAddress} />
                )}
              </SuiBox>
            ) : (
              <ChangeNetworkButton changeTo="Milkomeda" />
            )}
          </SuiBox>
        ) : (
          <ConnectWalletButton />
        )}
      </SuiBox>
    </SuiBox>
  );
}

stakedBox.propTypes = {
  pid: PropTypes.number.isRequired,
  lpName: PropTypes.string.isRequired,
  lpAddress: PropTypes.string.isRequired,
  tokenAddress: PropTypes.string.isRequired,
  quoteTokenAddress: PropTypes.string.isRequired,
};

export default stakedBox;
