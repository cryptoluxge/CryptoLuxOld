import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import SuiBox from "components/SuiBox";
import Alert from "@mui/material/Alert";
import { getUserData } from "utils/PancakeSwapHelpers/profileHelpers";

function Overview() {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [isSquad, setIsSquad] = useState();

  async function squadNFT() {
    const getProfile = await getUserData(account);
    console.log(getProfile);
    setIsSquad(String(getProfile.nftAddress).toLowerCase() === "0x0a8901b0e25deb55a87524f0cc164e9644020eba");
  }

  useEffect(() => {
    if (active === true) {
      squadNFT();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      {active ? (
        <SuiBox>
          {chainId === 56 ? (
            <SuiBox mt={1} mb={1}>
              {isSquad ? null : (
                <Alert severity="error" sx={{ fontSize: "14px" }}>
                  არ გაქვთ PancakeSquad NFT!
                </Alert>
              )}
            </SuiBox>
          ) : null}
        </SuiBox>
      ) : null}
    </SuiBox>
  );
}

export default Overview;
