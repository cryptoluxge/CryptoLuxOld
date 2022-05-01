import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { ifo } from "config/PancakeSwap/constants/ifo";

function Overview() {
  return (
    <SuiBox p={1} mt={0} sx={{ backgroundColor: "#283048" }}>
      <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
        <SuiTypography sx={{ fontSize: 14, color: "#fff" }} fontWeight="light">
          {ifo.symbol} ბალანსი:
        </SuiTypography>
        <SuiBox>
          <SuiTypography sx={{ fontSize: 14, color: "#fff" }} fontWeight="light">
            1,000
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
        <SuiTypography sx={{ fontSize: 14, color: "#fff" }} fontWeight="light">
          {ifo.symbol} ფასი:
        </SuiTypography>
        <SuiBox>
          <SuiTypography sx={{ fontSize: 14, color: "#fff" }} fontWeight="light">
            1,000
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

export default Overview;
