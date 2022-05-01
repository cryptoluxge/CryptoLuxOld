import { useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import Avatar from "@mui/material/Avatar";
import LoadingAnimation from "components/LoadingAnimation";
import getBlockNumber from "hooks/getBlockNumber";
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import SuiTypography from "components/SuiTypography";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { getIfoPoolContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { ifo } from "config/PancakeSwap/constants/ifo";
import PublicSaleButtons from "./PublicSaleButtons";
import PublicSaleDetails from "./PublicSaleDetails";

function Overview() {
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [currentBlockNumber] = getBlockNumber();
  const [depositedCake, setDepositedCake] = useState(Number);
  const [boughtTokens, setBoughtTokens] = useState(Number);
  const web3 = new Web3(window.ethereum);

  async function getInfo() {
    const contract = getIfoPoolContract(ifo.poolContract, chainId);
    const getviewUserOfferingAndRefundingAmountsForPools = await contract.methods.viewUserOfferingAndRefundingAmountsForPools(account, [0]).call();
    setDepositedCake(Number(web3.utils.fromWei(getviewUserOfferingAndRefundingAmountsForPools[0][1], "ether")));
    setBoughtTokens(Number(web3.utils.fromWei(getviewUserOfferingAndRefundingAmountsForPools[0][0], "ether")));
  }

  const darkMode = localStorage.getItem("darkMode");

  useEffect(() => {
    if (active === true && account.length > 0 && chainId === 56) {
      getInfo();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active, account, currentBlockNumber]);

  return (
    <SuiBox>
      <Card sx={{ backgroundColor: darkMode === "dark" ? "#0d0d0d" : "#f2f2f2" }}>
        <SuiBox px={2} sx={{ backgroundColor: "#704cac", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <SuiTypography mt={1} mb={1} variant="h6" fontWeight="medium" color="white">
            Public Sale
          </SuiTypography>
          <Tooltip title="შესატანი თანხის რაოდენობაზე ლიმიტი არ არის. აღებისას მოქმედებს საკომისიოც." placement="bottom">
            <SuiButton variant="outlined" size="small" circular iconOnly>
              <Icon>priority_high</Icon>
            </SuiButton>
          </Tooltip>
        </SuiBox>
        <SuiBox p={2}>
          <Grid container direction="column" spacing={0}>
            <Grid container spacing={2}>
              <Grid item>
                <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                  <SuiBox>
                    <Avatar variant="rounded" sx={{ width: "35px", height: "35px" }} src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.svg" alt="CAKE" />
                  </SuiBox>
                  <SuiBox ml={1}>
                    <SuiTypography fontSize="14px" fontWeight="bold">
                      შეტანილი CAKE
                    </SuiTypography>
                    {active === true && depositedCake >= 0 ? <SuiTypography sx={{ fontSize: 15 }}>{active === true && depositedCake >= 0 ? depositedCake.toLocaleString("en-US") : <LoadingAnimation />}</SuiTypography> : <LoadingAnimation />}
                  </SuiBox>
                </SuiBox>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item>
                <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                  <SuiBox>
                    <Avatar variant="rounded" sx={{ width: "35px", height: "35px" }} src={ifo.tokenLogo} alt={ifo.symbol} />
                  </SuiBox>
                  <SuiBox ml={1}>
                    <SuiTypography fontSize="14px" fontWeight="bold">
                      მიღებული {ifo.symbol}
                    </SuiTypography>
                    {active === true && boughtTokens >= 0 ? <SuiTypography sx={{ fontSize: 15 }}>{active === true && boughtTokens >= 0 ? boughtTokens.toLocaleString("en-US") : <LoadingAnimation />}</SuiTypography> : <LoadingAnimation />}
                  </SuiBox>
                </SuiBox>
              </Grid>
            </Grid>
          </Grid>
          <PublicSaleButtons />
          <PublicSaleDetails />
        </SuiBox>
      </Card>
    </SuiBox>
  );
}

export default Overview;
