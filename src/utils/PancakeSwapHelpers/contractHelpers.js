// ტოკენები
import { mainnetTokens } from "config/PancakeSwap/constants/tokens";

// კონტრაქტის მისამართები
import { contract } from "config/PancakeSwap/constants/contracts";

// კონტრაქტების ABI
import CakeTokenAbi from "config/PancakeSwap/abi/cakeTokenAbi.json";
import lpContractAbi from "config/PancakeSwap/abi/lpContractAbi.json";
import autoCakePoolAbi from "config/PancakeSwap/abi/autoCakePoolAbi.json";
import manualCakePoolAbi from "config/PancakeSwap/abi/manualCakePoolAbi.json";
import cakeVaultV2Abi from "config/PancakeSwap/abi/cakeVaultV2Abi.json";
import ifoV3Abi from "config/PancakeSwap/abi/ifoV3Abi.json";
import ifoCakePoolAbi from "config/PancakeSwap/abi/ifoCakePoolAbi.json";
import syrupPoolAbi from "config/PancakeSwap/abi/syrupPoolAbi.json";
import pancakeProfileAbi from "config/PancakeSwap/abi/pancakeProfileAbi.json";
import pancakeSquadAbi from "config/PancakeSwap/abi/pancakeSquadAbi.json";
import pancakeBunnyAbi from "config/PancakeSwap/abi/pancakeBunnyAbi.json";
import pcsRouterAbi from "config/PancakeSwap/abi/pcsRouterAbi.json";
import factoryAbi from "config/PancakeSwap/abi/factoryAbi.json";
import bep20Abi from "config/abi/BNBChain/bep20.json";
import masterChefV2Abi from "config/PancakeSwap/abi/masterChefV2Abi.json";
import NFTMarketAbi from "config/PancakeSwap/abi/nftmarketAbi.json";
import Web3 from "web3";

const getContract = (abi, address, chainId) => {
  const signerOrProvider = chainId === 56 ? window.ethereum : "https://bsc-dataseed.binance.org";
  const web3 = new Web3(signerOrProvider);
  const newContract = new web3.eth.Contract(abi, address);
  return newContract;
};

export const getCakeContract = (chainId) => {
  console.log();
  return getContract(CakeTokenAbi, mainnetTokens.cake.contractAddress, chainId);
};

export const getLpContract = (lpAddresss, chainId) => {
  console.log();
  return getContract(lpContractAbi, lpAddresss, chainId);
};

export const getAutoCakeContract = (chainId) => {
  console.log();
  return getContract(autoCakePoolAbi, contract.cakeVault.contractAddress, chainId);
};

export const getManualCakeContract = (chainId) => {
  console.log();
  return getContract(manualCakePoolAbi, contract.masterChef.contractAddress, chainId);
};

export const getIfoPoolContract = (contractAddress, chainId) => {
  console.log();
  return getContract(ifoV3Abi, contractAddress, chainId);
};

export const getIfoCakePoolContract = (chainId) => {
  console.log();
  return getContract(ifoCakePoolAbi, contract.ifoPool.contractAddress, chainId);
};

export const getSyrupPoolContract = (contractAddress, chainId) => {
  console.log();
  return getContract(syrupPoolAbi, contractAddress, chainId);
};

export const getPancakeProfileContract = (chainId) => {
  console.log();
  return getContract(pancakeProfileAbi, contract.pancakeProfile.contractAddress, chainId);
};

export const getPancakeSquadContract = (chainId) => {
  console.log();
  return getContract(pancakeSquadAbi, contract.pancakeSquad.contractAddress, chainId);
};

export const getPancakeBunnyContract = (chainId) => {
  console.log();
  return getContract(pancakeBunnyAbi, contract.pancakeRabbits.contractAddress, chainId);
};

export const getBep20TokenContract = (tokenContractAddress, chainId) => {
  console.log();
  return getContract(bep20Abi, tokenContractAddress, chainId);
};

export const getSwapContract = (chainId) => {
  console.log();
  return getContract(pcsRouterAbi, contract.router.contractAddress, chainId);
};

export const getFactoryContract = (chainId) => {
  console.log();
  return getContract(factoryAbi, contract.factory.contractAddress, chainId);
};

export const getCakeVaultV2 = (chainId) => {
  console.log();
  return getContract(cakeVaultV2Abi, contract.cakeVaultV2.contractAddress, chainId);
};

export const getMasterChefV2 = (chainId) => {
  console.log();
  return getContract(masterChefV2Abi, contract.masterChefV2.contractAddress, chainId);
};

export const getNFTMarket = (chainId) => {
  console.log();
  return getContract(NFTMarketAbi, contract.NFTMarket.contractAddress, chainId);
};
