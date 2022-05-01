import { mainnetTokens } from "config/MilkyDex/constants/tokens";

const farms = [
  {
    pid: 0,
    name: "MID-ADA",
    lpAddress: "0x05E61468F2A92f9790b63b758696B5a331151794",
    token: mainnetTokens.mid.contractAddress,
    quoteToken: mainnetTokens.wada.contractAddress,
    tokenLogo: mainnetTokens.mid.logoURI,
    quoteTokenLogo: mainnetTokens.wada.logoURI,
  },
];

export default farms;
