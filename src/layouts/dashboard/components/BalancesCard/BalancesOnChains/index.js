import { useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import LoadingAnimation from "components/LoadingAnimation";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import Web3 from "web3";
import ChainBalance from "layouts/dashboard/components/BalancesCard/ChainBalance";
import { getBNBPrice, getETHPrice, getAVAXPrice, getMilkAdaPrice } from "utils/NativeCoinsPrice";
import { BSCLogo, ETHLogo, AvaxLogo, MilkomedaLogo } from "assets/images/Logos/Chains";
import { useWeb3React } from "@web3-react/core";

function BalancesOnChains() {
  const mountedRef = useRef(true);
  const { active, account } = useWeb3React();
  const [balanceBNB, setBalanceBNB] = useState(Number);
  const [bnbPrice, setBnbPrice] = useState(Number);
  const [balanceAVAX, setBalanceAVAX] = useState(Number);
  const [avaxPrice, setAvaxPrice] = useState(Number);
  const [balanceETH, setBalanceETH] = useState(Number);
  const [ethPrice, setEthPrice] = useState(Number);
  const [milkAdaPrice, setMilkAdaPrice] = useState(Number);
  const [balanceMilkAda, setBalanceMilkAda] = useState(Number);

  async function getBalance(chain) {
    if (chain === "bsc") {
      const priceOfBnb = await getBNBPrice();
      setBnbPrice(priceOfBnb);
      const web3 = new Web3("https://bsc-dataseed.binance.org");
      const balanceinWei = await web3.eth.getBalance(account);
      setBalanceBNB(web3.utils.fromWei(String(balanceinWei), "ether"));
    } else if (chain === "avax") {
      const web3 = new Web3("https://api.avax.network/ext/bc/C/rpc");
      const balanceinWei = await web3.eth.getBalance(account);
      setBalanceAVAX(web3.utils.fromWei(String(balanceinWei), "ether"));
      const priceOfAvax = await getAVAXPrice();
      setAvaxPrice(priceOfAvax);
    } else if (chain === "eth") {
      const web3 = new Web3("https://mainnet.infura.io/v3/915c39ecabd748fb8fe3bbd850aedfd7");
      const balanceinWei = await web3.eth.getBalance(account);
      setBalanceETH(web3.utils.fromWei(String(balanceinWei), "ether"));
      const priceOfEth = await getETHPrice();
      setEthPrice(priceOfEth);
    } else if (chain === "milkomeda") {
      const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
      const balanceinWei = await web3.eth.getBalance(account);
      setBalanceMilkAda(web3.utils.fromWei(String(balanceinWei), "ether"));
      const priceOfMilkAda = await getMilkAdaPrice();
      setMilkAdaPrice(priceOfMilkAda);
    }
  }

  useEffect(() => {
    if (active === true) {
      getBalance("bsc");
      getBalance("avax");
      getBalance("eth");
      getBalance("milkomeda");
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography sx={{ fontSize: 16 }}>ბალანსი სხვადასხვა ქსელებზე</SuiTypography>
        <Tooltip title="ბალანსი BNB, ETH და AVAX ქსელზე" placement="bottom">
          <SuiButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </SuiButton>
        </Tooltip>
      </SuiBox>
      <SuiBox p={2}>
        <ChainBalance icon={{ color: "facebook", component: <BSCLogo /> }} title={Number(balanceBNB) >= 0 ? Number(balanceBNB).toFixed(5) : <LoadingAnimation />} price={Number(balanceBNB) > 0 ? Number(balanceBNB) * Number(bnbPrice) : 0.0} />
        <ChainBalance icon={{ color: "twitter", component: <AvaxLogo /> }} title={Number(balanceAVAX) >= 0 ? Number(balanceAVAX).toFixed(5) : <LoadingAnimation />} price={Number(balanceAVAX) > 0 ? Number(balanceAVAX) * Number(avaxPrice) : 0.0} />
        <ChainBalance icon={{ color: "reddit", component: <ETHLogo /> }} title={Number(balanceETH) >= 0 ? Number(balanceETH).toFixed(5) : <LoadingAnimation />} price={Number(balanceETH) > 0 ? Number(balanceETH) * Number(ethPrice) : 0.0} />
        <ChainBalance icon={{ color: "reddit", component: <MilkomedaLogo /> }} title={Number(balanceMilkAda) >= 0 ? Number(balanceMilkAda).toFixed(5) : <LoadingAnimation />} price={Number(balanceMilkAda) > 0 ? Number(balanceMilkAda) * Number(milkAdaPrice) : 0.0} />
      </SuiBox>
    </Card>
  );
}

export default BalancesOnChains;
