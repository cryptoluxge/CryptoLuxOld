import { getBSWContract, getManualBSWContract } from "utils/BiSwapHelpers/cotractHelpers";
import Web3 from "web3";

const web3 = new Web3("https://bsc-dataseed.binance.org");
const BSWContract = getBSWContract();
const BSWManualPool = getManualBSWContract();

export const getIsManualPoolApproved = async (account) => {
  const isApproved = await BSWContract.methods.allowance(account, "0xDbc1A13490deeF9c3C12b44FE77b503c1B061739").call();
  if (Number(isApproved) >= 0) {
    return true;
  }
  console.log(isApproved);
  return false;
};

export const getUserData = async (account) => {
  const pendingReward = await BSWManualPool.methods.pendingBSW(0, account).call();
  const pendingBSW = web3.utils.fromWei(pendingReward, "ether");
  const userInfo = await BSWManualPool.methods.userInfo(0, account).call();
  const currentBsw = web3.utils.fromWei(userInfo[0], "ether");
  const isApproved = await getIsManualPoolApproved(account);
  return { currentBsw, pendingBSW, isApproved };
};

export const getManualBSWTVL = async () => {
  const tvl = await BSWManualPool.methods.depositedBsw().call();
  return web3.utils.fromWei(tvl, "ether");
};
