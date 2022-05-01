import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import SuiBox from "components/SuiBox";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import SuiTypography from "components/SuiTypography";
import Info from "components/Info";
import { getVaultUserData, getTotalStakedCake, getTotalCakeLocked } from "layouts/staking/PancakeSwap/TableView/CakeVault/Helpers";
import LoadingAnimation from "components/LoadingAnimation";
/* import LockCakeButton from "layouts/staking/PancakeSwap/TableView/CakeVault/Buttons/LockCakeButton";
import FlexibleCakeButton from "layouts/staking/PancakeSwap/TableView/CakeVault/Buttons/FlexibleCakeButton"; */
import { useWeb3React } from "@web3-react/core";

function Overview() {
  const mountedRef = useRef(true);
  const { account, active } = useWeb3React();
  const [pendingCake, setPendingCake] = useState(Number);
  const [lockedCake, setLockedCake] = useState(Number);
  const [isLocked, setIsLocked] = useState();
  const [unlockDate, setUnlockDate] = useState("");
  const [totalStakedCake, setTotalStakedCake] = useState(Number);
  const [totalLockedCake, setTotalLockedCake] = useState(Number);

  async function getUserData() {
    const userData = await getVaultUserData(account);
    console.log(userData);
    setIsLocked(userData.isLocked);
    setPendingCake(Number(userData.pendingAmount));
    setLockedCake(Number(userData.cakeAmount));
    if (userData.isLocked === true) {
      setUnlockDate(userData.lockEndTime.date);
    }

    const totalStaked = await getTotalStakedCake();
    setTotalStakedCake(Number(totalStaked));
    const totalLocked = await getTotalCakeLocked();
    setTotalLockedCake(Number(totalLocked));
  }

  useEffect(() => {
    if (active === true) {
      getUserData();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <Card>
      <SuiBox p={2}>
        <SuiTypography fontSize="17px">IFO Pool</SuiTypography>
        {isLocked ? null : (
          <SuiBox>
            <Alert severity="info" sx={{ fontSize: "14px" }}>
              Public Sale-ში მონაწილეობის მისაღებად უნდა <strong>დალუქოთ CAKE!</strong>
            </Alert>
          </SuiBox>
        )}
        <Stack spacing={0} mt={1}>
          <SuiTypography fontSize="15px" fontWeight="bold">
            დაგროვებული
          </SuiTypography>
          {Number(pendingCake) >= 0 ? <SuiTypography fontSize="14px">{Number(pendingCake).toLocaleString("en-US")}</SuiTypography> : <LoadingAnimation />}
        </Stack>
        <Stack spacing={0} mt={1}>
          <SuiTypography fontSize="15px" fontWeight="bold">
            {isLocked ? "დალუქული" : "დასტეიკებული"}
          </SuiTypography>
          {Number(lockedCake) >= 0 ? <SuiTypography fontSize="14px">{Number(lockedCake).toLocaleString("en-US")}</SuiTypography> : <LoadingAnimation />}
        </Stack>
        {isLocked === true ? (
          <Stack spacing={0} mt={1}>
            <SuiTypography fontSize="15px" fontWeight="bold">
              გაიხსნება
            </SuiTypography>
            <SuiBox>{unlockDate === "" ? <LoadingAnimation /> : <SuiTypography fontSize="14px">{unlockDate}</SuiTypography>}</SuiBox>
          </Stack>
        ) : null}
        {/* <FlexibleCakeButton />
        <LockCakeButton /> */}
        <SuiBox mt={1}>
          <Info name="Total Staked: " data={totalStakedCake.toLocaleString("en-US")} />
          <Info name="Total Locked: " data={totalLockedCake.toLocaleString("en-US")} />
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default Overview;
