import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import LoadingAnimation from "components/LoadingAnimation";
import Stack from "@mui/material/Stack";
import { getTokenPriceBSC } from "utils/PancakeSwapHelpers/getTokenPrice";
import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "components/ConnectWalletButton";
import borders from "assets/theme/base/borders";
import { getUserPendingToken } from "utils/PancakeSwapHelpers/SyrupPoolHelpers";
import HarvestButton from "../Buttons/HarvestButton";

function pendingTokenBox({ tokenContractAddress, contractAddress, symbol, decimals }) {
  const mountedRef = useRef(true);
  const { borderWidth, borderColor } = borders;
  const { account, active } = useWeb3React();
  const [tokenPrice, setTokenPrice] = useState();
  const [pendingToken, setPendingToken] = useState();

  async function getUserData() {
    const price = await getTokenPriceBSC(tokenContractAddress, decimals);
    setTokenPrice(price);

    const userPendingToken = await getUserPendingToken(account, contractAddress);
    setPendingToken(userPendingToken);
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
        <SuiTypography sx={{ fontSize: 14 }}>დაგროვებული {symbol}</SuiTypography>
        {active ? (
          <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
            <Grid container spacing={1}>
              <Grid item>
                {pendingToken >= 0 && active === true ? (
                  <SuiBox>
                    <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                      {Number(pendingToken).toFixed(5)}
                    </SuiTypography>
                    <SuiTypography sx={{ fontSize: 14 }}>~${(pendingToken * tokenPrice).toLocaleString("en-US")}</SuiTypography>
                  </SuiBox>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
            </Grid>
            <SuiBox>
              <Stack direction={{ xs: "row", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 1 }}>
                <HarvestButton contractAddress={contractAddress} symbol={symbol} />
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

pendingTokenBox.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  tokenContractAddress: PropTypes.string.isRequired,
  decimals: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default pendingTokenBox;
