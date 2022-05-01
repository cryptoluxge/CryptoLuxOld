// ტოკენები
import { mainnetTokens } from "config/YelFinance/constants/tokens";

// კონტრაქტის მისამართები
import { contract } from "config/YelFinance/constants/contracts";

// კონტრაქტების ABI
import lpContractAbi from "config/PancakeSwap/abi/lpContractAbi.json";
import yelTokenAbi from "config/YelFinance/abi/yelTokenAbi.json";
import masterChef from "config/YelFinance/abi/masterchef.json";
import Bep20Abi from "config/abi/BNBChain/bep20.json";
import factoryAbi from "config/PancakeSwap/abi/factoryAbi.json";
import Web3 from "web3";

const getContract = (abi, address, chainId) => {
  const signerOrProvider = chainId === 56 ? window.ethereum : "https://bsc-dataseed.binance.org";
  const web3 = new Web3(signerOrProvider);
  const newContract = new web3.eth.Contract(abi, address);
  return newContract;
};

export const getYelContract = (chainId) => {
  console.log();
  return getContract(yelTokenAbi, mainnetTokens.yel.contractAddress, chainId);
};

export const getYelMasterChefContract = (chainId) => {
  console.log();
  return getContract(masterChef, contract.masterChef.contractAddress, chainId);
};

export const getLpContract = (lpAddresss, chainId) => {
  console.log();
  return getContract(lpContractAbi, lpAddresss, chainId);
};

export const getBep20TokenContract = (contractAddress, chainId) => {
  console.log();
  return getContract(Bep20Abi, contractAddress, chainId);
};

export const getFactoryContract = (chainId) => {
  console.log();
  return getContract(factoryAbi, contract.factory.contractAddress, chainId);
};
