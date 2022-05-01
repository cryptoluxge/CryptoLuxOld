/* import { useEffect, useRef } from "react"; */
import PropTypes from "prop-types";
import SuiButton from "components/SuiButton";
import { getCakeContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { useWeb3React } from "@web3-react/core";

function ApproveButton({ contractAddress }) {
  /* const mountedRef = useRef(true); */
  const { account, chainId } = useWeb3React();
  const CAKEContract = getCakeContract(chainId);

  // Toast-ის დამატება
  async function approveContract() {
    await CAKEContract.methods
      .approve(contractAddress, "115792089237316195423570985008687907853269984665640564039456726971375468411753")
      .send({ from: account })
      .once("sending", (payload) => {
        console.log(payload);
        console.log("Sending...");
      })
      .once("transactionHash", (hash) => {
        console.log(hash);
        console.log("Transactions Hash...");
      })
      .on("error", (error) => {
        console.log("ERROR", error);
      })
      .then((receipt) => {
        console.log(receipt);
        if (receipt.status === true) {
          console.log("დადასტურდა");
        } else {
          console.log("არ დადასტურდა");
        }
      });
  }

  return (
    <SuiButton fullWidth onClick={() => approveContract()} variant="gradient" color="primary">
      Enable
    </SuiButton>
  );
}

export default ApproveButton;

ApproveButton.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};
