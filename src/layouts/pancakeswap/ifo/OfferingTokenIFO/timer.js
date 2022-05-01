import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import getBlockNumber from "hooks/getBlockNumber";
import { ifo } from "config/PancakeSwap/constants/ifo";

function Overview() {
  const [currentBlockNumber] = getBlockNumber();
  return (
    <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={1} mb={1}>
      <SuiTypography p={1} sx={{ fontSize: 17, color: "#fff", backgroundColor: "#d00c9c", borderRadius: 2 }}>
        {currentBlockNumber < ifo.startBlock ? `დაწყებამდე დარჩა ${ifo.startBlock - currentBlockNumber} ბლოკი` : null}
        {currentBlockNumber >= ifo.startBlock && currentBlockNumber <= ifo.endBlock ? `დამთავრებამდე დარჩა ${ifo.endBlock - currentBlockNumber} ბლოკი` : null}
        {currentBlockNumber >= ifo.endBlock ? `დამთავრდა` : null}
      </SuiTypography>
    </SuiBox>
  );
}

export default Overview;
