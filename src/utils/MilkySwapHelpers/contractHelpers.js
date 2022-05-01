// ტოკენები
import { mainnetTokens } from "config/MilkySwap/constants/tokens";

// კონტრაქტის მისამართები
import { contract } from "config/MilkySwap/constants/contracts";

// კონტრაქტების ABI
import CakeTokenAbi from "config/PancakeSwap/abi/cakeTokenAbi.json";
import masterChefAbi from "config/MilkySwap/abi/masterchefAbi.json";
import lpContractAbi from "config/MilkySwap/abi/lpContractAbi.json";
import factoryAbi from "config/MilkySwap/abi/factory.json";
import Web3 from "web3";

const getContract = (abi, address, chainId) => {
  const signerOrProvider = chainId === 2001 ? window.ethereum : "https://rpc-mainnet-cardano-evm.c1.milkomeda.com ";
  const web3 = new Web3(signerOrProvider);
  const newContract = new web3.eth.Contract(abi, address);
  return newContract;
};

export const getMilkyContract = (chainId) => {
  console.log();
  return getContract(CakeTokenAbi, mainnetTokens.MILKY.contractAddress, chainId);
};

export const getMasterMilkyContract = (chainId) => {
  console.log();
  return getContract(masterChefAbi, contract.masterChef.contractAddress, chainId);
};

export const getLpContract = (contractAddress, chainId) => {
  console.log();
  return getContract(lpContractAbi, contractAddress, chainId);
};

export const getFactoryContract = (chainId) => {
  console.log();
  return getContract(factoryAbi, contract.factory.contractAddress, chainId);
};

export const getERC20Contract = (contractAddress, chainId) => {
  console.log();
  return getContract(CakeTokenAbi, contractAddress, chainId);
};
