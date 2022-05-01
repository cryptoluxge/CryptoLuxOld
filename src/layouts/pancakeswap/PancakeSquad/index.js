import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import LoadingPage from "components/LoadingPage";
import NftCard from "./components/NftCard";
import Header from "./components/Header";

function Overview() {
  const [squadList, setSquadList] = useState([]);
  const [isLoading, setIsLoading] = useState();

  async function getSquadNFTs() {
    setIsLoading(true);
    await fetch("https://api.thegraph.com/subgraphs/name/pancakeswap/nft-market", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `query getNftsMarketData($first: Int, $skip: Int!, $where: NFT_filter, $orderBy: NFT_orderBy, $orderDirection: OrderDirection) {
					nfts(
						where: $where
						first: $first
						orderBy: $orderBy
						orderDirection: $orderDirection
						skip: $skip
					) {
						tokenId
						metadataUrl
						currentAskPrice
						currentSeller
						latestTradedPriceInBNB
						tradeVolumeBNB
						totalTrades
						isTradable
						updatedAt
						otherId
						collection {
							id
						}
						transactionHistory {
							id
							block
							timestamp
							askPrice
							netPrice
							withBNB
							buyer {
								id
							}
							seller {
								id
							}
						}
					}
				}
        `,
        variables: {
          where: {
            collection: "0x0a8901b0e25deb55a87524f0cc164e9644020eba",
            isTradable: true,
          },
          first: 100,
          skip: 0,
          orderBy: "currentAskPrice",
          orderDirection: "asc",
        },
        operationName: "getNftsMarketData",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSquadList(res.data.nfts);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getSquadNFTs();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header />
      {isLoading ? (
        <SuiBox mt={3}>
          <LoadingPage />
        </SuiBox>
      ) : (
        <Grid container spacing={2} mt={2}>
          {squadList.map((x) => (
            <Grid key={x.tokenId} item xs={12} md={4.5} lg={2}>
              <NftCard key={x.tokenId} tokenId={Number(x.tokenId)} currentAskPrice={x.currentAskPrice} />
            </Grid>
          ))}
        </Grid>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
