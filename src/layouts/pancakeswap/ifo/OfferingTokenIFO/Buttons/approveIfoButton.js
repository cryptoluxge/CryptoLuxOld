import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import { getCakeContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { ifo } from "config/PancakeSwap/constants/ifo";

function Overview() {
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [isApproved, setIsApproved] = useState();
  const cakeContract = getCakeContract(chainId);
  async function handleApprove() {
    await cakeContract.methods
      .approve(ifo.poolContract, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
      .send({ from: account })
      .once("transactionHash", (hash) => {
        console.log(`მუშავდება: თქვენი ტრანზაქცია გაიგზავნა: ${hash}`);
      })
      .on("error", (error) => {
        console.log("Error: ", error);
        if (error.code === 4001) {
          console.log("Transaction rejected by user: თქვენ ტრანზაქცია არ დაადასტურეთ.");
        } else if (error.code === -32003) {
          console.log("Transaction rejected: თქვენი ტრანზაქცია არ დადასტურდა.");
        } else if (error.code === -32603) {
          console.log("intrinsic gas too low: საკომისიო ძალიან დაბალია.");
        }
      });
  }

  async function checkApprove() {
    const getApprove = await cakeContract.methods.allowance(account, ifo.poolContract).call();
    if (getApprove > 0) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      checkApprove();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [account, active]);

  return (
    <SuiBox>
      {!isApproved ? (
        <SuiButton variant="gradient" onClick={() => handleApprove()} fullWidth color="primary">
          Enable
        </SuiButton>
      ) : null}
    </SuiBox>
  );
}

export default Overview;
