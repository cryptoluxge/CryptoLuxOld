import { getLpContract, getERC20Contract, getMasterMilkyContract } from "utils/MilkySwapHelpers/contractHelpers";
import { getTokenPriceForFarm, getFromWeiTo } from "utils/MilkySwapHelpers/getTokenPrice";
import { contract } from "config/MilkySwap/constants/contracts";
import Web3 from "web3";

const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
const MasterMilkyContract = getMasterMilkyContract();

export const getUserStakedLP = async (pid, account) => {
  const staked = await MasterMilkyContract.methods.userInfo(pid, account).call();
  return web3.utils.fromWei(staked[0], "ether");
};

export const getUserPendingMILKY = async (pid, account) => {
  const pendingRewards = await MasterMilkyContract.methods.pendingMilky(pid, account).call();
  return web3.utils.fromWei(pendingRewards, "ether");
};

export const getLPPoolIsApproved = async (lpAddress, account) => {
  const LPContract = getLpContract(lpAddress);
  const isApproved = await LPContract.methods.allowance(account, contract.masterChef.contractAddress).call();
  return isApproved;
};

export const useTotalLiquidityUSD = async (lpAddress) => {
  const LPContract2 = getLpContract(lpAddress);
  const getReserves = await LPContract2.methods.getReserves().call();
  const token0 = await LPContract2.methods.token0().call();
  const tokenContract = getERC20Contract(token0);
  const token0Decimal = await tokenContract.methods.decimals().call();
  const token0Price = await getTokenPriceForFarm(token0, token0Decimal);

  const token1 = await LPContract2.methods.token1().call();
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
  const getMultiplier = await MasterMilkyContract.methods.poolInfo(pid).call();
  const multiplier = Number(getMultiplier[1]) / 100;
  return multiplier;
};

export const usePoolWeight = async (pid) => {
  const totalAllocationPoint = await MasterMilkyContract.methods.totalAllocPoint().call();
  const allocPoint = await MasterMilkyContract.methods.poolInfo(pid).call();
  const poolWeight = Number(allocPoint[1]) / Number(totalAllocationPoint);
  return poolWeight;
};

export const uselpTotalSupply = async (lpAddress) => {
  const LPContract = getLpContract(lpAddress);
  const lpTotalSupply = await LPContract.methods.totalSupply().call();
  const supply = web3.utils.fromWei(lpTotalSupply, "ether");
  return supply;
};
