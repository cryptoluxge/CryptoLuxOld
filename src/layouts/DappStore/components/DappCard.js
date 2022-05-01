import SuiBox from "components/SuiBox";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Info from "components/Info";
import { BsGlobe2, BsTwitter, BsTelegram, BsDiscord, BsMedium, BsYoutube, BsGithub } from "react-icons/bs";
import DappStores from "config/DappStore";
import SuiTypography from "components/SuiTypography";

function Dashboard() {
  console.log(DappStores);
  return (
    <SuiBox>
      <Card>
        <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
          <Stack mt={2} spacing={1} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="PancakeSwap" src="https://github.com/pancakeswap/pancake-frontend/blob/develop/public/logo.png?raw=true" sx={{ width: 50, height: 50 }} />
            <SuiTypography fontSize="15px">PancakeSwap</SuiTypography>
            <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
              <BsGlobe2 fontSize="16px" />
              <BsTwitter fontSize="16px" />
              <BsTelegram fontSize="16px" />
              <BsDiscord fontSize="16px" />
              <BsMedium fontSize="16px" />
              <BsYoutube fontSize="16px" />
              <BsGithub fontSize="16px" />
            </Stack>
          </Stack>
        </SuiBox>
        <SuiBox px={2} mt={2}>
          <SuiTypography fontSize="14px">The most popular AMM on BSC! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.</SuiTypography>
        </SuiBox>
        <SuiBox px={2} mt={2}>
          <Info name="ტოკენი:" data="CAKE" />
        </SuiBox>
        <SuiBox px={2} mt={2}>
          <SuiTypography fontSize="14px">DeFi, BSC, NFT, Exchange, Staking, Farming, Lottery</SuiTypography>
        </SuiBox>
      </Card>
    </SuiBox>
  );
}

export default Dashboard;
