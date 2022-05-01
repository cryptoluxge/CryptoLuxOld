import SuiBox from "components/SuiBox";
import getBlockNumber from "hooks/getBlockNumber";
import ConnectWalletButton from "components/ConnectWalletButton";
import ChangeNetworkButton from "components/ChangeNetworkButton";
import { useWeb3React } from "@web3-react/core";
import { ifo } from "config/PancakeSwap/constants/ifo";
import ApproveIfoButton from "../Buttons/approveIfoButton";
import HarvestTokens from "../Buttons/harvestTokens";
import DepositCake from "../Buttons/depositCake";

function Overview() {
  const [currentBlockNumber] = getBlockNumber();
  const { active, chainId } = useWeb3React();
  return (
    <SuiBox mt={1}>
      {active ? (
        <SuiBox>
          {chainId === 56 ? (
            <SuiBox>
              <ApproveIfoButton />
              {currentBlockNumber >= ifo.startBlock && currentBlockNumber <= ifo.endBlock ? <DepositCake poolType="public" /> : null}
              {currentBlockNumber > ifo.endBlock ? <HarvestTokens poolType={1} /> : null}
            </SuiBox>
          ) : (
            <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
              <ChangeNetworkButton changeTo="BSC" />
            </SuiBox>
          )}
        </SuiBox>
      ) : (
        <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
          <ConnectWalletButton loginText="დააკავშირე საფულე" />
        </SuiBox>
      )}
    </SuiBox>
  );
}

export default Overview;
