import { useWeb3React } from "@web3-react/core";
import SuiButton from "components/SuiButton";
import { getCakeVaultV2 } from "utils/PancakeSwapHelpers/contractHelpers";

function ConvertToLock() {
  /* const mountedRef = useRef(true); */
  const { account, chainId } = useWeb3React();
  const CakeVaultContract = getCakeVaultV2(chainId);

  async function convertToFlexible() {
    await CakeVaultContract.methods
      .unlock(account)
      .send({ from: account, gasLimit: 500000 })
      .on("error", (error) => {
        console.log("Error: ", error);
        if (error.code === 4001) {
          /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
          console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
        } else if (error.code === -32003) {
          /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
          console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
        } else if (error.code === -32603) {
          /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
        } else {
          /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
          console.log("არ დადასტურდა");
        }
      })
      .then((receipt) => {
        console.log("LAST CALLBACK: ", receipt);
        if (receipt.status === true) {
          /* showNotification("დადასტურდა", "გაიყიდა", "success"); */
          console.log("კონვერტაცია Flexible-ში დასრულდა");
        } else {
          console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        }
      });
  }

  return (
    <SuiButton disabled onClick={() => convertToFlexible()} variant="gradient" color="primary">
      Convert to Lock
    </SuiButton>
  );
}

export default ConvertToLock;
