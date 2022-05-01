import PropTypes from "prop-types";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import { getLpContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { contract } from "config/YelFinance/constants/contracts";
import { useWeb3React } from "@web3-react/core";

function ApproveButton({ lpAddress }) {
  const { account, chainId } = useWeb3React();
  const FarmContract = getLpContract(lpAddress, chainId);

  async function approveContract() {
    await FarmContract.methods
      .approve(contract.masterChef.contractAddressl, "115792089237316195423570985008687907853269984665640564039456726971375468411753")
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
    <SuiBox mt={1} sx={{ display: "flex", justifyContent: "center" }}>
      <SuiButton onClick={() => approveContract()} fullWidth variant="gradient" color="primary">
        Enable
      </SuiButton>
    </SuiBox>
  );
}

export default ApproveButton;

ApproveButton.propTypes = {
  lpAddress: PropTypes.string.isRequired,
};
