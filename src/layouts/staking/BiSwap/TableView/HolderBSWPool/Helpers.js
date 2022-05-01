import { contract } from "config/BiSwap/constants/contracts";
import { getBSWContract, getBSWHolderPoolContract } from "utils/BiSwapHelpers/cotractHelpers";
import Web3 from "web3";

const web3 = new Web3("https://bsc-dataseed.binance.org");
const BSWContract = getBSWContract();
const BSWHolderPool = getBSWHolderPoolContract();

export const getIsHolderPoolApproved = async (account) => {
  const isApproved = await BSWContract.methods.allowance(account, contract.holderPool.contractAddress).call();
  if (Number(isApproved) >= 0) {
    return true;
  }
  console.log(isApproved);
  return false;
};

export const getUserVaultData = async (account) => {
  const shares = await BSWHolderPool.methods.userInfo(account).call();
  const getPricePerFullShare = await BSWHolderPool.methods.getPricePerFullShare().call();
  const currentBsw = web3.utils.fromWei(shares[0], "ether") * web3.utils.fromWei(getPricePerFullShare, "ether");
  const pendingReward = Number(currentBsw) - web3.utils.fromWei(shares[2], "ether");
  const isApproved = await getIsHolderPoolApproved(account);
  return { currentBsw, pendingReward, isApproved };
};

export const getHolderBSWTVL = async () => {
  const tvl = await BSWHolderPool.methods.balanceOf().call();
  return web3.utils.fromWei(tvl, "ether");
};
