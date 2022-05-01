import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import GroupCard from "examples/Lists/GroupCard";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={1} mb={3}>
        <SuiBox display="flex" alignItems="center" justifyContent="center">
          <SuiTypography>ქართული კრიპტო ბოტები</SuiTypography>
        </SuiBox>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="კრიპტოლუქსის ბოტი" appName="Telegram" description="ქოინების/ტოკენების ფასების გაგება და კიდევ მრავალი სხვა." imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/cryptolux.png" url="https://t.me/cryptoluxge_bot" btnColor="warning" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="კრიპტო ნიუსრუმი" appName="Telegram" description="სიახლეები წინასწარ გაწერილი კრიპტო გვერდებიდან." imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/news_bot.jpg" url="https://t.me/CryptoNewsRoomGE_bot" btnColor="primary" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="Staking ბოტი" appName="Telegram" description="მიცემ მისამართს და გიწერს სად რამდენი დაასტეიკე და დაააგროვე." imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/staking_bot.jpg" url="https://t.me/StakingGE_bot" btnColor="primary" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="PancakeSwap-ის ბოტი" appName="Telegram" description="სტეიკების კალკულატორი და კიდე სხვა რაღაცეებიც აქვს ბოტს." imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/pcsbot_logo.jpg" url="https://t.me/pcsge_bot" btnColor="primary" />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mt={1} mb={3}>
        <SuiBox display="flex" alignItems="center" justifyContent="center">
          <SuiTypography>ქართული ჯგუფები</SuiTypography>
        </SuiBox>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="კრიპტოლუქსი" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/cryptolux.png" url="https://t.me/cryptoluxge" btnColor="warning" variant="circle" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="PCS - ქართული" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/pcsbot_logo.jpg" url="https://t.me/PancakeSwapGeorgia" btnColor="primary" variant="rounded" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="₿ კრიპტო" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/bcrypto.jpg" url="https://t.me/cryptgeo" btnColor="primary" variant="circle" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="Coiners" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/Coiners.jpg" url="https://t.me/joinchat/vRntss01Ge02ODYy" btnColor="primary" variant="circle" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="კრიპტო მანიაკი" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/cryptomaniac.jpg" url="https://t.me/joinchat/AjvlKjB47DY2NzMy" btnColor="primary" variant="rounded" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="TW - საქართველო" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/tw_georgia.jpg" url="https://t.me/trustwallet_ge" btnColor="primary" variant="rounded" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="SundaeSwap - GEO" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/SundaeSwap.jpg" url="https://t.me/SundaeSwapGeorgia" btnColor="primary" variant="rounded" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="Crypto Georgia" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/cryptogeorgia.jpg" url="https://t.me/CryptoGeorgiaOfficial" btnColor="primary" variant="rounded" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="Airdrop Georgia" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/airdropgeorgia.jpg" url="https://t.me/BestAirdropOnlyOficcial" btnColor="primary" variant="rounded" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="MyCoins" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/mycoins.jpg" url="https://t.me/MyCoinsge" btnColor="primary" variant="rounded" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <GroupCard name="Coinmania" appName="Telegram" description="" imageUrl="https://cryptoluxv2.netlify.app/assets/img/botsgroup/coinmania.jpg" url="https://t.me/coinmaniaOfficial" btnColor="primary" variant="rounded" />
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
