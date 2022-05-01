import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import { getSyrupPoolContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { useWeb3React } from "@web3-react/core";

function HarvestButton({ contractAddress, symbol }) {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const SyrupPoolContract = getSyrupPoolContract(contractAddress, chainId);

  const checkPendingRewards = async () => {
    const balance = await SyrupPoolContract.methods.pendingReward(account).call();
    if (balance === "0") {
      document.getElementById(`HarvestButton${symbol}`).disabled = true;
    } else {
      document.getElementById(`HarvestButton${symbol}`).disabled = false;
    }
  };

  async function harvestRewards() {
    await SyrupPoolContract.methods
      .deposit(0)
      .send({ from: account })
      .once("sending", (payload) => {
        console.log(payload);
        document.getElementById(`HarvestButton${symbol}`).disabled = true;
      })
      .once("transactionHash", (hash) => {
        console.log(`თქვენი ტრანზაქცია მუშავდება: ${hash}`);
      })
      .on("error", (error) => {
        console.log("Error: ", error);
        document.getElementById(`HarvestButton${symbol}`).disabled = false;
        if (error.code === 4001) {
          /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
          console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
        } else if (error.code === -32003) {
          /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
          console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
        } else if (error.code === -32603) {
          /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
          console.log("საკომისიო ძალიან დაბალია.");
        } else {
          /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
          console.log("არ დადასტურდა");
        }
      })
      .then((receipt) => {
        if (receipt.status === true) {
          console.log("თქვენი ტრანზაქცია დადასტურდა!");
        } else {
          console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        }
        document.getElementById(`HarvestButton${symbol}`).disabled = false;
      });
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      checkPendingRewards();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active, chainId]);

  return (
    <SuiBox>
      {chainId === 56 ? (
        <SuiBox>
          {active === true ? (
            <SuiButton id={`HarvestButton${symbol}`} fullWidth onClick={() => harvestRewards()} variant="gradient" color="primary">
              აღება
            </SuiButton>
          ) : null}
        </SuiBox>
      ) : null}
    </SuiBox>
  );
}

export default HarvestButton;

HarvestButton.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};
