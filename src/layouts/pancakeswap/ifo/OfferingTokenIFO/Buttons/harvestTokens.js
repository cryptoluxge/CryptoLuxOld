import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import { getIfoPoolContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { ifo } from "config/PancakeSwap/constants/ifo";

function Overview({ poolType }) {
  const { account, chainId } = useWeb3React();
  const IFOContract = getIfoPoolContract(ifo.poolContract, chainId);
  async function harvestTokens() {
    await IFOContract.methods.harvestPool(poolType).send({ from: account });
  }

  return (
    <SuiBox>
      <SuiButton variant="gradient" onClick={() => harvestTokens()} fullWidth color="primary">
        აღება
      </SuiButton>
    </SuiBox>
  );
}

Overview.propTypes = {
  poolType: PropTypes.number.isRequired,
};

export default Overview;
