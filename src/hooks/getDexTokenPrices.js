import { mainnetTokens } from "config/MilkyDex/constants/tokens";
import CAKEBUSDAbi from "config/PancakeSwap/abi/cakebusd.json";
import BigNumber from "bignumber.js";
import { contract } from "config/PancakeSwap/constants/contracts";
import MilkyUSDCAbi from "config/MilkySwap/abi/milkyUSDCAbi.json";
import BSWBUSDAbi from "config/BiSwap/abi/BSWBUSDAbi.json";

import { getFactoryContract, getLpContract } from "utils/MilkyDexHelpers/contractHelpers";

import Web3 from "web3";
import { getMilkAdaPrice } from "../utils/NativeCoinsPrice";

export const useCakePrice = async () => {
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const cakebusdpair = new web3.eth.Contract(CAKEBUSDAbi, contract.cakeBusd.contractAddress);
  const getCAKEBUSDReserves = await cakebusdpair.methods.getReserves().call();
  const reserve0 = getCAKEBUSDReserves[0];
  const reserve1 = getCAKEBUSDReserves[1];
  const getCakePrice = Number(web3.utils.fromWei(reserve1, "ether")) / Number(web3.utils.fromWei(reserve0, "ether"));
  return getCakePrice;
};

export const useMilkyPrice = async () => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
  const milkyusdcpair = new web3.eth.Contract(MilkyUSDCAbi, "0xbc1741079541100f8f6200f15665039ee633db3d");
  const getMILKYUSDCReserves = await milkyusdcpair.methods.getReserves().call();
  const reserve0 = getMILKYUSDCReserves[0];
  const reserve1 = getMILKYUSDCReserves[1];
  const getMilkyPrice = Number(web3.utils.fromWei(reserve1, "picoether")) / Number(web3.utils.fromWei(reserve0, "ether"));
  return getMilkyPrice;
};

export const getFromWeiTo = (value, decimal) => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
  const BIG_TEN = new BigNumber(10);
  let number = 0;
  if (Number(decimal) === 18) {
    number = web3.utils.fromWei(value, "ether");
  } else if (Number(decimal) === 8) {
    number = new BigNumber(value).div(BIG_TEN.pow(8));
  } else if (Number(decimal) === 6) {
    number = web3.utils.fromWei(value, "mwei");
  } else if (Number(decimal) === 9) {
    number = new BigNumber(value).div(BIG_TEN.pow(9));
  } else if (Number(decimal) === 4) {
    number = new BigNumber(value).div(BIG_TEN.pow(4));
  } else if (Number(decimal) === 17) {
    number = new BigNumber(value).div(BIG_TEN.pow(17));
  }
  return number;
};

export const useMidPrice = async () => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
  const factoryContract = getFactoryContract();
  const adaPrice = await getMilkAdaPrice();
  const getAdaPair = await factoryContract.methods.getPair(mainnetTokens.mid.contractAddress, mainnetTokens.wada.contractAddress).call();
  const lpContract = getLpContract(getAdaPair);
  const reserves = await lpContract.methods.getReserves().call();
  const reserveOne = web3.utils.fromWei(reserves[1], getFromWeiTo(18));
  const reserveZero = web3.utils.fromWei(reserves[0], getFromWeiTo(18));
  const tokenPriceinADA = Number(reserveOne) / Number(reserveZero);
  const tokenPriceinUSD = tokenPriceinADA * Number(adaPrice);
  return tokenPriceinUSD;
};

export const useBswPrice = async () => {
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const bswbusdpair = new web3.eth.Contract(BSWBUSDAbi, "0xB22Bc4DB1DCd0B45680b4D831F8C06CFf50Ee4D6");
  const getBSWBUSDReserves = await bswbusdpair.methods.getReserves().call();
  const reserve0 = getBSWBUSDReserves[0];
  const reserve1 = getBSWBUSDReserves[1];
  const getBswPrice = Number(web3.utils.fromWei(reserve1, "ether")) / Number(web3.utils.fromWei(reserve0, "ether"));
  return getBswPrice;
};

export const useYelPrice = async () => {
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const yelbusdpair = new web3.eth.Contract(CAKEBUSDAbi, "0x1673558159a5662F8e8b3d19B09Cc800a280D27d");
  const getYELBUSDReserves = await yelbusdpair.methods.getReserves().call();
  const reserve0 = getYELBUSDReserves[0];
  const reserve1 = getYELBUSDReserves[1];
  const getYelPrice = Number(web3.utils.fromWei(reserve1, "ether")) / Number(web3.utils.fromWei(reserve0, "ether"));
  return getYelPrice;
};
