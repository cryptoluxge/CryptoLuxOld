import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import Stack from "@mui/material/Stack";
import { useWeb3React } from "@web3-react/core";
import { useCakePrice } from "hooks/getDexTokenPrices";
import ConnectWalletButton from "components/ConnectWalletButton";
import ChangeNetworkButton from "components/ChangeNetworkButton";
import borders from "assets/theme/base/borders";
import { getUserStakedCake, getSyrupPoolIsApproved } from "utils/PancakeSwapHelpers/SyrupPoolHelpers";
import ApproveButton from "../Buttons/ApproveButton";
import WithdrawButton from "../Buttons/WithdrawButton";
import DepositButton from "../Buttons/DepositButton";

function StakedCakeBox({ contractAddress, symbol, startBlock }) {
  const { borderWidth, borderColor } = borders;
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [stakedCake, setStakedCake] = useState();
  const [approved, setApproved] = useState();
  const [stakedTokenPrice, setStakedTokenPrice] = useState();

  async function getUserData() {
    const userStakedCake = await getUserStakedCake(account, contractAddress);
    setStakedCake(userStakedCake);

    const isApproved = await getSyrupPoolIsApproved(account, contractAddress);
    setApproved(isApproved);

    const cakePrice = await useCakePrice();
    setStakedTokenPrice(cakePrice);
  }

  useEffect(() => {
    if (active) {
      getUserData();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox border={`${borderWidth[1]} solid ${borderColor}`} borderRadius="lg" p={2}>
      <SuiBox>
        <SuiTypography sx={{ fontSize: 14 }}>დასტეიკებული CAKE</SuiTypography>
        {active ? (
          <SuiBox>
            {chainId === 56 ? (
              <SuiBox>
                {approved ? (
                  <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
                    <Grid container spacing={1}>
                      <Grid item>
                        {stakedCake >= 0 && active === true ? (
                          <SuiBox>
                            <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                              {Number(stakedCake).toFixed(5)}
                            </SuiTypography>
                            <SuiTypography sx={{ fontSize: 14 }}>~${(stakedCake * stakedTokenPrice).toLocaleString("en-US")}</SuiTypography>
                          </SuiBox>
                        ) : (
                          <LoadingAnimation sigrdze={70} />
                        )}
                      </Grid>
                    </Grid>
                    <SuiBox>
                      <Stack direction={{ xs: "row", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <WithdrawButton contractAddress={contractAddress} symbol={symbol} />
                        <DepositButton contractAddress={contractAddress} symbol={symbol} startBlock={startBlock} />
                      </Stack>
                    </SuiBox>
                  </SuiBox>
                ) : (
                  <ApproveButton contractAddress={contractAddress} />
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

StakedCakeBox.propTypes = {
  symbol: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  startBlock: PropTypes.number.isRequired,
};

export default StakedCakeBox;
