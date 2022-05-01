import SuiButton from "components/SuiButton";

import bscLogo from "assets/images/network_logos/bnbNetwork.svg";
import maticLogo from "assets/images/network_logos/polygonNetwork.svg";
import avaxLogo from "assets/images/network_logos/avalancheNetwork.svg";
import fantomLogo from "assets/images/network_logos/fantomNetwork.svg";
import okexLogo from "assets/images/network_logos/okexNetwork.svg";
import huobiLogo from "assets/images/network_logos/huobiNetwork.svg";
import harmonyLogo from "assets/images/network_logos/harmonyNetwork.svg";
import arbitrumLogo from "assets/images/network_logos/arbitrumNetwork.svg";
import opLogo from "assets/images/network_logos/optimisticNetwork.svg";
import hooLogo from "assets/images/network_logos/HooNetwork.svg";
import velasLogo from "assets/images/network_logos/velasNetwork.svg";
import MilkomedaNetwork from "assets/images/network_logos/MilkomedaNetwork.svg";
import cronosChain from "assets/images/network_logos/cronosChain.svg";

import { BNBChain, AvalancheChain, FantomChain, OKEXChain, PolygonChain, HecoChain, HarmonyChain, ArbitrumChain, OptimisticETHChain, HooSmartChainChain, VelasChain, MilkomedaChain, CronosChain } from "hooks/networks";

const evmNetworks = [
  {
    id: "BSC",
    name: "Smart Chain",
    logo: bscLogo,
    rpc: "https://bsc-dataseed.binance.org",
    chainId: 56,
    symbol: "BNB",
    explorer: "https://bscscan.com/",
    action: (
      <SuiButton fullWidth onClick={() => BNBChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "AVAX",
    name: "Avalanche C-Chain",
    logo: avaxLogo,
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    chainId: 43114,
    symbol: "AVAX",
    explorer: "https://cchain.explorer.avax.network/",
    action: (
      <SuiButton fullWidth onClick={() => AvalancheChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "FANTOM",
    name: "FANTOM",
    logo: fantomLogo,
    rpc: "https://rpc.ftm.tools/",
    chainId: 250,
    symbol: "FTM",
    explorer: "https://ftmscan.com/",
    action: (
      <SuiButton fullWidth onClick={() => FantomChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "MATIC",
    name: "Polygon",
    logo: maticLogo,
    rpc: "https://rpc-mainnet.maticvigil.com",
    chainId: 137,
    symbol: "MATIC",
    explorer: "https://polygonscan.com/",
    action: (
      <SuiButton fullWidth onClick={() => PolygonChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "CRONOS",
    name: "Cronos",
    logo: cronosChain,
    rpc: "https://evm-cronos.crypto.org/",
    chainId: 25,
    symbol: "CRO",
    explorer: "https://cronoscan.com",
    action: (
      <SuiButton fullWidth onClick={() => CronosChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "ARBITRUM",
    name: "Arbitrum",
    logo: arbitrumLogo,
    rpc: "https://arb1.arbitrum.io/rpc",
    chainId: 42161,
    symbol: "ETH",
    explorer: "https://arbiscan.io/",
    action: (
      <SuiButton fullWidth onClick={() => ArbitrumChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "OPTIMISM",
    name: "Optimism",
    logo: opLogo,
    rpc: "https://mainnet.optimism.io/",
    chainId: 10,
    symbol: "ETH",
    explorer: "https://optimistic.etherscan.io/",
    action: (
      <SuiButton fullWidth onClick={() => OptimisticETHChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "Harmony",
    name: "Harmony",
    logo: harmonyLogo,
    rpc: "https://api.harmony.one",
    chainId: 1666600000,
    symbol: "ONE",
    explorer: "https://explorer.harmony.one/",
    action: (
      <SuiButton fullWidth onClick={() => HarmonyChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "OKT",
    name: "OKEX - OKT",
    logo: okexLogo,
    rpc: "https://exchainrpc.okex.org",
    chainId: 66,
    symbol: "OKT",
    explorer: "https://www.oklink.com/okexchain/",
    action: (
      <SuiButton fullWidth onClick={() => OKEXChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "Heco",
    name: "Huobi - HECO",
    logo: huobiLogo,
    rpc: "https://http-mainnet.hecochain.com",
    chainId: 128,
    symbol: "HT",
    explorer: "https://hecoinfo.com/",
    action: (
      <SuiButton fullWidth onClick={() => HecoChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "HOO",
    name: "Hoo Smart Chain",
    logo: hooLogo,
    rpc: "https://http-mainnet.hecochain.com/",
    chainId: 80,
    symbol: "HOO",
    explorer: "https://hscscan.com/",
    action: (
      <SuiButton fullWidth onClick={() => HooSmartChainChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "Velas",
    name: "Velas",
    logo: velasLogo,
    rpc: "https://evmexplorer.velas.com/rpc",
    chainId: 106,
    symbol: "VLX",
    explorer: "https://evmexplorer.velas.com",
    action: (
      <SuiButton fullWidth onClick={() => VelasChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
  {
    id: "Milkomeda",
    name: "Milkomeda",
    logo: MilkomedaNetwork,
    rpc: "https://rpc-mainnet-cardano-evm.c1.milkomeda.com",
    chainId: 2001,
    symbol: "wADA",
    explorer: "https://milkomeda.com",
    action: (
      <SuiButton fullWidth onClick={() => MilkomedaChain()} variant="gradient" color="primary">
        დამატება
      </SuiButton>
    ),
  },
];

export default evmNetworks;
