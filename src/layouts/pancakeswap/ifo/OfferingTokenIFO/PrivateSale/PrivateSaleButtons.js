import SuiBox from "components/SuiBox";
import getBlockNumber from "hooks/getBlockNumber";
import ConnectWalletButton from "components/ConnectWalletButton";
import ChangeNetworkButton from "components/ChangeNetworkButton";
import { useWeb3React } from "@web3-react/core";
import { ifo } from "config/PancakeSwap/constants/ifo";
import ApproveIfoButton from "../Buttons/approveIfoButton";
import HarvestTokens from "../Buttons/harvestTokens";
import DepositCake from "../Buttons/depositCake";
import checkSquadNFT from "../Helpers/checkSquadNFT";

function Overview() {
  const [currentBlockNumber] = getBlockNumber();
  const { active, chainId } = useWeb3React();
  const squadNFT = checkSquadNFT();
  return (
    <SuiBox>
      {active ? (
        <SuiBox>
          {chainId === 56 ? (
            <SuiBox>
              <ApproveIfoButton />
              {squadNFT ? (
                <SuiBox>
                  {currentBlockNumber >= ifo.startBlock && currentBlockNumber <= ifo.endBlock ? <DepositCake poolType="private" /> : null}
                  {currentBlockNumber > ifo.endBlock ? <HarvestTokens poolType={0} /> : null}
                </SuiBox>
              ) : null}
            </SuiBox>
          ) : (
            <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={1}>
              <ChangeNetworkButton changeTo="BSC" />
            </SuiBox>
          )}
        </SuiBox>
      ) : (
        <SuiBox mt={1} sx={{ display: "flex", justifyContent: "center" }}>
          <ConnectWalletButton loginText="დააკავშირე საფულე" />
        </SuiBox>
      )}
    </SuiBox>
  );
}

export default Overview;
