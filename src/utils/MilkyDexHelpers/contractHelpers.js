// ტოკენები
import { mainnetTokens } from "config/MilkyDex/constants/tokens";

// კონტრაქტის მისამართები
import { contract } from "config/MilkyDex/constants/contracts";

// კონტრაქტების ABI
import MIDTokenAbi from "config/MilkyDex/abi/midTokenAbi.json";
import milkyChefAbi from "config/MilkyDex/abi/milkyChefAbi.json";
import lpContractAbi from "config/MilkyDex/abi/lpContractAbi.json";
import factoryAbi from "config/MilkyDex/abi/factoryAbi.json";
import Web3 from "web3";

const getContract = (abi, address, chainId) => {
  const signerOrProvider = chainId === 2001 ? window.ethereum : "https://rpc-mainnet-cardano-evm.c1.milkomeda.com ";
  const web3 = new Web3(signerOrProvider);
  const newContract = new web3.eth.Contract(abi, address);
  return newContract;
};

export const getMidContract = (chainId) => {
  console.log();
  return getContract(MIDTokenAbi, mainnetTokens.mid.contractAddress, chainId);
};

export const getMilkyChefContract = (chainId) => {
  console.log();
  return getContract(milkyChefAbi, contract.milkyChef.contractAddress, chainId);
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
  return getContract(MIDTokenAbi, contractAddress, chainId);
};
