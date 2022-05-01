import Grid from "@mui/material/Grid";

import SuiBox from "components/SuiBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import AppCard from "examples/Lists/AppCard";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <AppCard name="Binance" apptype="ბირჟა" description="N1 ბირჟა სადაც შეგიძლიათ იყიდოთ და გაყიდოთ კრიპტოვალუტები." imageUrl="https://cryptoluxv2.netlify.app/assets/img/apps/binance.webp" url="https://accounts.binance.com/en/register?ref=DIXLHC8A" btnColor="warning" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <AppCard name="Trust Wallet" apptype="Software საფულე" description="ყველაზე სანდო, დაცული და მოსახერხებელი Software საფულე." imageUrl="https://cryptoluxv2.netlify.app/assets/img/apps/trustwallet.webp" url="https://trustwallet.com/" btnColor="primary" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <AppCard name="CoinMarketCap" apptype="კრიპტოვალუტების ფასები და სხვა." description="კრიპტოვალუტების ფასები და ჩარტები. ასევე პროტფოლიო და Watchlist." imageUrl="https://cryptoluxv2.netlify.app/assets/img/apps/cmc-logo.png" url="https://coinmarketcap.com/invite?ref=YF6ESUM3" btnColor="primary" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <AppCard name="CoinGecko" apptype="კრიპტოვალუტების ფასები და სხვა." description="კრიპტოვალუტების ფასები და ჩარტები. ასევე პროტფოლიო და Watchlist." imageUrl="https://cryptoluxv2.netlify.app/assets/img/apps/cg-logo.svg" url="https://www.coingecko.com/en" btnColor="primary" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <AppCard name="DAppRadar" apptype="DeFi Tracker" description="DappStore - სხვადასხვა ქსელებზე სხვადასხვა აპლიკაციები. Games, NFT, Metaverse, Marketplaces, DeFi და Exchanges" imageUrl="https://cryptoluxv2.netlify.app/assets/img/apps/DappRadar.png" url="https://defillama.com/" btnColor="primary" />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <AppCard name="DeFi Llama" apptype="DeFi Tracker" description="DeFiLlama არის DeFi TVL აგრეგატორი, სადაც შეგიძლიათ ნახო სხვადასხვა ქსელებზე სხვადასხვა აპლიკაციები." imageUrl="https://cryptoluxv2.netlify.app/assets/img/apps/defillama.png" url="https://defillama.com/" btnColor="primary" />
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
