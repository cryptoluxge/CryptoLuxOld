import { BLOCKS_PER_YEAR, MILKY_PER_YEAR } from "config/MilkySwap";
import BigNumber from "bignumber.js";

export const getPoolApr = (stakingTokenPrice, rewardTokenPrice, totalStaked, tokenPerBlock) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR);
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked);
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  return apr.toNumber();
};

export const getFarmApr = (poolWeight, MilkyPrice, poolLiquidityUsd) => {
  const yearlyCakeRewardAllocation = new BigNumber(poolWeight).times(MILKY_PER_YEAR);
  const apr = new BigNumber(yearlyCakeRewardAllocation).times(MilkyPrice).div(poolLiquidityUsd).times(100);
  return apr.toNumber();
};
