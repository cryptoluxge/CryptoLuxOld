import { getBSWContract, getAutoBSWContract } from "utils/BiSwapHelpers/cotractHelpers";
import Web3 from "web3";

const web3 = new Web3("https://bsc-dataseed.binance.org");
const BSWContract = getBSWContract();
const BSWAutoPool = getAutoBSWContract();

export const getIsAutoPoolApproved = async (account) => {
  const isApproved = await BSWContract.methods.allowance(account, "0x97A16ff6Fd63A46bf973671762a39f3780Cda73D").call();
  if (Number(isApproved) >= 0) {
    return true;
  }
  console.log(isApproved);
  return false;
};

export const getUserVaultData = async (account) => {
  const shares = await BSWAutoPool.methods.userInfo(account).call();
  const getPricePerFullShare = await BSWAutoPool.methods.getPricePerFullShare().call();
  const currentBsw = web3.utils.fromWei(shares[0], "ether") * web3.utils.fromWei(getPricePerFullShare, "ether");
  const pendingReward = Number(currentBsw) - web3.utils.fromWei(shares[2], "ether");
  const isApproved = await getIsAutoPoolApproved(account);
  return { currentBsw, pendingReward, isApproved };
};

export const getAutoBSWTVL = async () => {
  const tvl = await BSWAutoPool.methods.balanceOf().call();
  return web3.utils.fromWei(tvl, "ether");
};
