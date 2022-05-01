import { mainnetTokens } from "config/MilkySwap/constants/tokens";

const farms = [
  {
    pid: 14,
    name: "MILKY-WADA",
    lpAddress: "0xBAa096e9794354f9054cfD96e0C254059968D5a1",
    token: mainnetTokens.MILKY.contractAddress,
    quoteToken: mainnetTokens.WADA.contractAddress,
    tokenLogo: mainnetTokens.MILKY.logoURI,
    quoteTokenLogo: mainnetTokens.WADA.logoURI,
  },
];

export default farms;
