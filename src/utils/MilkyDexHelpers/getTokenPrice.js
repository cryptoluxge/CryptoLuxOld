import Web3 from "web3";
import BigNumber from "bignumber.js";
import { mainnetTokens } from "config/MilkyDex/constants/tokens";
import { getLpContract, getERC20Contract, getFactoryContract } from "utils/MilkyDexHelpers/contractHelpers";
import { useMidPrice } from "hooks/getDexTokenPrices";
import { getMilkAdaPrice } from "../NativeCoinsPrice";

const factoryContract = getFactoryContract();

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

export const getTokenpriceInADA = async (contractAddress) => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
  const getAdaPair = await factoryContract.methods.getPair(mainnetTokens.wada.contractAddress, contractAddress).call();
  const lpContract = getLpContract(getAdaPair);
  const reserves = await lpContract.methods.getReserves().call();
  const reserveOne = web3.utils.fromWei(reserves[1], "ether");
  const reserveZero = web3.utils.fromWei(reserves[0], "ether");
  const tokenPriceinADA = Number(reserveOne) / Number(reserveZero);
  console.log(`in ADA: ${tokenPriceinADA}`);
};

export const getTokenPriceFromADAToUSD = async (contractAddress, decimals) => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
  const adaPrice = await getMilkAdaPrice();
  const getAdaPair = await factoryContract.methods.getPair(contractAddress, mainnetTokens.wada.contractAddress).call();
  const lpContract = getLpContract(getAdaPair);
  const reserves = await lpContract.methods.getReserves().call();
  const reserveOne = web3.utils.fromWei(reserves[1], getFromWeiTo(decimals));
  const reserveZero = web3.utils.fromWei(reserves[0], getFromWeiTo(decimals));
  const tokenPriceinADA = Number(reserveOne) / Number(reserveZero);
  const tokenPriceinUSD = tokenPriceinADA * Number(adaPrice);
  return tokenPriceinUSD;
};

export const getTokenPriceInUSD = async (contractAddress) => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
  const getUsdPair = await factoryContract.methods.getPair(mainnetTokens.usdt.contractAddress, contractAddress).call();
  const lpContract = getLpContract(getUsdPair);
  const reserves = await lpContract.methods.getReserves().call();
  const reserveOne = web3.utils.fromWei(reserves[1], "ether");
  const reserveZero = web3.utils.fromWei(reserves[0], "ether");
  const tokenPrice = Number(reserveOne) / Number(reserveZero);
  return tokenPrice;
};

export const getTokenPriceBSC = async (contractAddress, decimals) => {
  const getUsdPair = await factoryContract.methods.getPair(mainnetTokens.usdt.contractAddress, contractAddress).call();
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com");
  if (getUsdPair === "0x0000000000000000000000000000000000000000") {
    const adaPrice = await getMilkAdaPrice();
    const getAdaPair = await factoryContract.methods.getPair(mainnetTokens.WADA.contractAddress, contractAddress).call();
    const lpContract = getLpContract(getAdaPair);
    const reserves = await lpContract.methods.getReserves().call();
    const reserveOne = web3.utils.fromWei(reserves[1], "ether");
    const reserveZero = getFromWeiTo(reserves[0], Number(decimals));
    const tokenPriceinADA = Number(reserveOne) / Number(reserveZero);
    const tokenPriceinUSD = tokenPriceinADA * Number(adaPrice);
    return tokenPriceinUSD;
  }
  const lpContract = getLpContract(getUsdPair);
  const reserves = await lpContract.methods.getReserves().call();
  const reserveOne = web3.utils.fromWei(reserves[1], "ether");
  const reserveZero = getFromWeiTo(reserves[0], Number(decimals));
  const tokenPrice = Number(reserveOne) / Number(reserveZero);
  return tokenPrice;
};

export const getUsdcPrice = async () => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com ");
  const getUsdUsdPair = getLpContract("0x344089E09B59de96eeE5BC81b3685a17e827902A");
  const reserves = await getUsdUsdPair.methods.getReserves().call();
  const reserveOne = web3.utils.fromWei(reserves[1], "mwei");
  const reserveZero = web3.utils.fromWei(reserves[0], "mwei");
  const price = Number(reserveOne) / Number(reserveZero);
  return price;
};

export const getUsdtPrice = async () => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com ");
  const getUsdUsdPair = getLpContract("0x344089E09B59de96eeE5BC81b3685a17e827902A");
  const reserves = await getUsdUsdPair.methods.getReserves().call();
  const reserveOne = web3.utils.fromWei(reserves[1], "mwei");
  const reserveZero = web3.utils.fromWei(reserves[0], "mwei");
  const price = Number(reserveZero) / Number(reserveOne);
  return price;
};

export const getTokenPriceForFarm = async (contractAddress, decimals) => {
  const web3 = new Web3("https://rpc-mainnet-cardano-evm.c1.milkomeda.com ");
  if (contractAddress === mainnetTokens.usdc.contractAddress) {
    const usdcprice = await getUsdcPrice();
    return usdcprice;
  }

  if (contractAddress === mainnetTokens.usdt.contractAddress) {
    const usdtprice = await getUsdtPrice();
    return usdtprice;
  }

  if (contractAddress === mainnetTokens.wada.contractAddress) {
    const adaPrice = await getMilkAdaPrice();
    return adaPrice;
  }

  if (contractAddress === mainnetTokens.mid.contractAddress) {
    const milkyPrice = await useMidPrice();
    return milkyPrice;
  }

  const getUsdPair = await factoryContract.methods.getPair(mainnetTokens.ceUSDC.contractAddress, contractAddress).call();
  const getAdaPair = await factoryContract.methods.getPair(mainnetTokens.WADA.contractAddress, contractAddress).call();
  const getusdtPair = await factoryContract.methods.getPair(mainnetTokens.multiUSDT.contractAddress, contractAddress).call();

  if (getUsdPair === "0x0000000000000000000000000000000000000000") {
    const adaPrice = await getMilkAdaPrice();
    const lpContract = getLpContract(getAdaPair);
    const reserves = await lpContract.methods.getReserves().call();
    const reserveOne = Number(decimals) === 18 ? web3.utils.fromWei(reserves[1], "ether") : getFromWeiTo(reserves[1], Number(decimals));
    const reserveZero = Number(decimals) === 18 ? web3.utils.fromWei(reserves[0], "ether") : getFromWeiTo(reserves[0], Number(decimals));
    const tokenPriceinADA = Number(reserveOne) / Number(reserveZero);
    const tokenPriceinUSD = tokenPriceinADA * Number(adaPrice);
    return tokenPriceinUSD;
  }

  if (getAdaPair === "0x0000000000000000000000000000000000000000") {
    const lpContract = getLpContract(getusdtPair);
    const reserves = await lpContract.methods.getReserves().call();
    const reserveOne = Number(decimals) === 18 ? web3.utils.fromWei(reserves[1], "ether") : getFromWeiTo(reserves[1], Number(decimals));
    const reserveZero = Number(decimals) === 18 ? web3.utils.fromWei(reserves[0], "ether") : getFromWeiTo(reserves[0], Number(decimals));
    const tokenPrice = Number(reserveOne) / Number(reserveZero);
    return tokenPrice;
  }

  const lpContract = getLpContract(getUsdPair);
  const reserves = await lpContract.methods.getReserves().call();
  const token0 = await lpContract.methods.token0().call();
  const token0Contract = getERC20Contract(token0);
  const token0Decimal = await token0Contract.methods.decimals().call();

  const token1 = await lpContract.methods.token1().call();
  const token1Contract = getERC20Contract(token1);
  const token1Decimal = await token1Contract.methods.decimals().call();

  const reserveZero = Number(token0Decimal) === 18 ? web3.utils.fromWei(reserves[0], "ether") : getFromWeiTo(reserves[0], Number(token0Decimal));
  const reserveOne = Number(token1Decimal) === 18 ? web3.utils.fromWei(String(reserves[1]), "ether") : getFromWeiTo(reserves[1], Number(token1Decimal));
  const tokenPrice = Number(reserveOne) / Number(reserveZero);
  return tokenPrice;
};
