import { useState, useEffect } from "react";
import { contract } from "config/PancakeSwap/constants/contracts";
import { getPancakeSquadContract } from "utils/PancakeSwapHelpers/contractHelpers";
/* import { useWeb3React } from "@web3-react/core"; */

const useSquad = () => {
  /* const { chainId } = useWeb3React(); */
  const [data, setData] = useState();
  useEffect(async () => {
    const SquadNFTContract = getPancakeSquadContract();
    const getSquadNumber = await SquadNFTContract.methods.balanceOf(contract.pancakeProfile.contractAddress).call();
    setData(getSquadNumber);
  }, []);

  return data;
};

export default useSquad;
