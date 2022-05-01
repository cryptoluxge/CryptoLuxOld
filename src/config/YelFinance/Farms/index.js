import { mainnetTokens } from "config/YelFinance/constants/tokens";

const farms = [
  {
    pid: 2,
    name: "YEL-BNB",
    lpAddress: "0x8290d3CA64f712de9FB7220353dAa55bf388F3A3",
    token: mainnetTokens.yel.contractAddress,
    quoteToken: mainnetTokens.wbnb.contractAddress,
  },
];

export default farms;
