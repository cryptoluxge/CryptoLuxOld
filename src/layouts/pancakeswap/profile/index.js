import { useState } from "react";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { getPancakeProfileContract } from "utils/PancakeSwapHelpers/contractHelpers";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import Web3 from "web3";
import Header from "./components/Header";
import Achievement from "./components/UserAchievement";

function Overview() {
  const [headerCard, setHeaderCard] = useState();
  const [achievementCard, setAchievementCard] = useState();
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const pancakeProfileContract = getPancakeProfileContract();

  async function checkProfile() {
    setHeaderCard(null);
    setAchievementCard(null);
    const walletAddress = document.getElementById("walletAddressInput").value;
    const correctWalletAddrss = web3.utils.checkAddressChecksum(walletAddress);
    if (correctWalletAddrss) {
      try {
        const getUserData = await pancakeProfileContract.methods.getUserProfile(walletAddress).call();
        if (getUserData[5] === true) {
          setHeaderCard(<Header walletAddress={walletAddress} />);
          setAchievementCard(<Achievement walletAddress={walletAddress} />);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(`False: ${walletAddress}`);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox display="flex" justifyContent="center">
        <Card sx={{ width: 600 }}>
          <SuiBox p={3}>
            <SuiInput id="walletAddressInput" fullWidth placeholder="BSC საფულის მისამართი" />
            <SuiBox mt={1}>
              <SuiButton onClick={() => checkProfile()} variant="gradient" color="primary" fullWidth>
                მანახე
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </Card>
      </SuiBox>
      {headerCard}
      {achievementCard}
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
