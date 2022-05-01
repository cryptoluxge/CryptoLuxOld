import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import SuiBox from "components/SuiBox";
import Web3 from "web3";
import { getIfoCakePoolContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { ifo } from "config/PancakeSwap/constants/ifo";
import IfoInfo from "../IfoInfo/index";

function PublicSaleDetails() {
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [limitPerUserCAKE, setLimitPerUserCAKE] = useState("");
  const web3 = new Web3(window.ethereum);
  const IFOPoolContract = getIfoCakePoolContract(chainId);

  async function getMaxCakeForPublic() {
    const userCredit = await IFOPoolContract.methods.getUserCredit(account).call();
    setLimitPerUserCAKE(web3.utils.fromWei(userCredit, "ether"));
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
      <IfoInfo name="ასაგროვებელი: " value={ifo.poolPublic.raiseAmount} />
      <IfoInfo name="გამოყოფილი: " value={`${ifo.poolPublic.saleAmount} ${ifo.symbol}`} />
      <IfoInfo name={`${ifo.symbol}-ს ფასი`} value={ifo.poolPublic.tokenOfferingPrice} />
    </SuiBox>
  );
}

export default PublicSaleDetails;
