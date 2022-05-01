import { getLpContract } from "utils/PancakeSwapHelpers/contractHelpers";
import Web3 from "web3";

export async function getBNBPrice() {
  const busdBNBContract = getLpContract("0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16");
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const reserves = await busdBNBContract.methods.getReserves().call();
  const bnbPrice = web3.utils.fromWei(reserves[1], "ether") / web3.utils.fromWei(reserves[0], "ether");
  return bnbPrice;
}

export async function getETHPrice() {
  const usdcEthContract = getLpContract("0xEa26B78255Df2bBC31C1eBf60010D78670185bD0");
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const reserves = await usdcEthContract.methods.getReserves().call();
  const ethPrice = web3.utils.fromWei(reserves[1], "ether") / web3.utils.fromWei(reserves[0], "ether");
  return ethPrice;
}

export async function getAVAXPrice() {
  const busdAvaxContract = getLpContract("0xDbA5cb3ADbbc055253F0Bb7cd84a883a40ae4f09");
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const reserves = await busdAvaxContract.methods.getReserves().call();
  const avaxPrice = web3.utils.fromWei(reserves[1], "ether") / web3.utils.fromWei(reserves[0], "ether");
  return avaxPrice;
}

export async function getMilkAdaPrice() {
  const adaBusdContract = getLpContract("0x1E249DF2F58cBef7EAc2b0EE35964ED8311D5623");
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const reserves = await adaBusdContract.methods.getReserves().call();
  const milkAdaPrice = web3.utils.fromWei(reserves[1], "ether") / web3.utils.fromWei(reserves[0], "ether");
  return milkAdaPrice;
}
