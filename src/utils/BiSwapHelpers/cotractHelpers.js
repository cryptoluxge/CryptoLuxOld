// ტოკენები
import { biSwapTokens } from "config/BiSwap/constants/tokens";

// კონტრაქტის მისამართები
import { contract } from "config/BiSwap/constants/contracts";

// კონტრაქტების ABI
import bswTokenAbi from "config/BiSwap/abi/bswTokenAbi.json";
import manualBSWPoolAbi from "config/BiSwap/abi/manualBSWPoolAbi.json";
import autoBSWPoolAbi from "config/BiSwap/abi/autoBSWPoolAbi.json";
import holderPoolAbi from "config/BiSwap/abi/holderPoolAbi.json";
import factory from "config/BiSwap/abi/factory.json";
import router from "config/BiSwap/abi/router.json";
import Web3 from "web3";

const getContract = (abi, address, chainId) => {
  const signerOrProvider = chainId === 56 ? window.ethereum : "https://bsc-dataseed.binance.org";
  const web3 = new Web3(signerOrProvider);
  const newContract = new web3.eth.Contract(abi, address);
  return newContract;
};

export const getBSWContract = (chainId) => {
  console.log();
  return getContract(bswTokenAbi, biSwapTokens.bsw.contractAddress, chainId);
};

export const getManualBSWContract = (chainId) => {
  console.log();
  return getContract(manualBSWPoolAbi, contract.masterChef.contractAddress, chainId);
};

export const getAutoBSWContract = (chainId) => {
  console.log();
  return getContract(autoBSWPoolAbi, contract.AutoBSWPool.contractAddress, chainId);
};

export const getBSWHolderPoolContract = (chainId) => {
  console.log();
  return getContract(holderPoolAbi, contract.holderPool.contractAddress, chainId);
};

export const getBSWFactoryContract = (chainId) => {
  console.log();
  return getContract(factory, contract.factory.contractAddress, chainId);
};

export const getBSWRouterContract = (chainId) => {
  console.log();
  return getContract(router, contract.router.contractAddress, chainId);
};
