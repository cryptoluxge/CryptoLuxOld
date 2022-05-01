import { getLpContract, getERC20Contract, getMilkyChefContract } from "utils/MilkyDexHelpers/contractHelpers";
import { getTokenPriceForFarm, getFromWeiTo } from "utils/MilkyDexHelpers/getTokenPrice";
import { contract } from "config/MilkyDex/constants/contracts";
import Web3 from "web3";

const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com ");
const MilkyChefContract = getMilkyChefContract();

export const getUserStakedLP = async (pid, account) => {
  const staked = await MilkyChefContract.methods.userInfo(pid, account).call();
  return web3.utils.fromWei(staked[0], "ether");
};

export const getUserPendingMID = async (pid, account) => {
  const pendingRewards = await MilkyChefContract.methods.pendingReward(pid, account).call();
  return web3.utils.fromWei(pendingRewards, "ether");
};

export const getLPPoolIsApproved = async (lpAddress, account) => {
  const LPContract = getLpContract(lpAddress);
  const isApproved = await LPContract.methods.allowance(account, contract.milkyChef.contractAddress).call();
  return isApproved;
};

export const useTotalLiquidityUSD = async (lpAddress) => {
  const LPContract = getLpContract(lpAddress);
  const getReserves = await LPContract.methods.getReserves().call();
  const token0 = await LPContract.methods.token0().call();
  const tokenContract = getERC20Contract(token0);
  const token0Decimal = await tokenContract.methods.decimals().call();
  const token0Price = await getTokenPriceForFarm(token0, token0Decimal);

  const token1 = await LPContract.methods.token1().call();
  const tokenContract2 = getERC20Contract(token1);
  const token1Decimal = await tokenContract2.methods.decimals().call();
  const token1Price = await getTokenPriceForFarm(token1, token1Decimal);

  const token0Balance = getFromWeiTo(getReserves[0], token0Decimal);
  const token1Balance = getFromWeiTo(getReserves[1], token1Decimal);

  const token0USD = token0Balance * token0Price;
  const token1USD = token1Balance * token1Price;

  const liq = Number(token0USD) + Number(token1USD);
  return liq;
};

export const usePoolMultiplier = async (pid) => {
  const getMultiplier = await MilkyChefContract.methods.poolInfo(pid).call();
  const multiplier = Number(getMultiplier[2]) / 100;
  return multiplier;
};

export const usePoolWeight = async (pid) => {
  const totalAllocationPoint = await MilkyChefContract.methods.totalAllocPoint().call();
  const allocPoint = await MilkyChefContract.methods.poolInfo(pid).call();
  const poolWeight = Number(allocPoint[2]) / Number(totalAllocationPoint);
  return poolWeight;
};

export const uselpTotalSupply = async (lpAddress) => {
  const LPContract = getLpContract(lpAddress);
  const lpTotalSupply = await LPContract.methods.totalSupply().call();
  const supply = web3.utils.fromWei(lpTotalSupply, "ether");
  return supply;
};
