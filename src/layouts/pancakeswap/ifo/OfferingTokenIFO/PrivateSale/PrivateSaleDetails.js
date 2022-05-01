import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import SuiBox from "components/SuiBox";
import Web3 from "web3";
import { getIfoPoolContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { ifo } from "config/PancakeSwap/constants/ifo";
import IfoInfo from "../IfoInfo/index";

function PrivateSaleDetails() {
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [limitPerUserCAKE, setLimitPerUserCAKE] = useState("");
  const web3 = new Web3(window.ethereum);
  const offeringTokenIFOPoolContract = getIfoPoolContract(ifo.poolContract, chainId);
  async function getMaxCakeForPublic() {
    const getMaxLpCake = await offeringTokenIFOPoolContract.methods.viewPoolInformation(0).call();
    setLimitPerUserCAKE(web3.utils.fromWei(getMaxLpCake[2], "ether"));
  }

  useEffect(() => {
    if (active === true && account.length > 0 && chainId === 56) {
      getMaxCakeForPublic();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active, account]);
  return (
    <SuiBox mt={1}>
      <IfoInfo name="შესასვლელად: " value={Number(limitPerUserCAKE).toLocaleString("en-US")} />
      <IfoInfo name="ასაგროვებელი: " value={ifo.poolPrivate.raiseAmount} />
      <IfoInfo name="გამოყოფილი: " value={`${ifo.poolPrivate.saleAmount} ${ifo.symbol}`} />
      <IfoInfo name={`${ifo.symbol}-ს ფასი`} value={ifo.poolPrivate.tokenOfferingPrice} />
    </SuiBox>
  );
}

export default PrivateSaleDetails;
