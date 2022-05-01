import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import LoadingAnimation from "components/LoadingAnimation";

function Header() {
  const [listed, setListed] = useState(0);
  const [totalVolumeBNB, setTotalVolumBNB] = useState(0);
  const [floorPrice, setFloorPrice] = useState(0);

  async function getSquadData() {
    await fetch("https://api.thegraph.com/subgraphs/name/pancakeswap/nft-market", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `query getCollectionData($collectionAddress: String!) {
          collection(id: $collectionAddress) {
            id
            name
            symbol
            active
            totalTrades
            totalVolumeBNB
            numberTokensListed
            creatorAddress
            tradingFee
            creatorFee
            whitelistChecker
          }
        }
        `,
        variables: {
          collectionAddress: "0x0a8901b0e25deb55a87524f0cc164e9644020eba",
        },
        operationName: "getCollectionData",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setListed(Number(res.data.collection.numberTokensListed));
        setTotalVolumBNB(Number(res.data.collection.totalVolumeBNB));
      });
  }

  async function getFloorPrice() {
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
          first: 1,
          skip: 0,
          orderBy: "currentAskPrice",
          orderDirection: "asc",
        },
        operationName: "getNftsMarketData",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setFloorPrice(res.data.nfts[0].currentAskPrice);
      });
  }

  useEffect(() => {
    getFloorPrice();
    getSquadData();
  }, []);

  return (
    <SuiBox position="relative">
      <SuiBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: `url(https://pancakeswap.finance/_next/image?url=https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x0a8901b0E25DEb55A87524f0cC164E9644020EBA%2Fbanner-lg.png&w=1920&q=75)`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 2,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SuiAvatar src="https://static-nft.pancakeswap.com/mainnet/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA/avatar.png" alt="profile-image" variant="rounded" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <SuiBox height="100%" mt={0.5} lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Pancake Squad
              </SuiTypography>
              <SuiTypography variant="button" color="text" fontWeight="medium">
                10,000 unique, randomly-generated PancakeSwap NFTs from the mind of Chef Cecy Meade. Join the squad.
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <SuiBox sx={{ backgroundColor: "primary.main" }} borderRadius="lg" p={1}>
              <Grid container spacing={0} direction={window.innerWidth < 500 ? "column" : "row"} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <SuiTypography fontSize={14} color="white" fontWeight="medium">
                      სულ
                    </SuiTypography>
                    <SuiTypography fontSize={14} color="white" fontWeight="bold">
                      10,000
                    </SuiTypography>
                  </SuiBox>
                </Grid>
                <Grid item>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <SuiTypography fontSize={14} color="white" fontWeight="medium">
                      ბაზარზეა
                    </SuiTypography>
                    {Number(listed) > 0 ? (
                      <SuiTypography fontSize={14} color="white" fontWeight="bold">
                        {Number(listed).toLocaleString("en-US")}
                      </SuiTypography>
                    ) : (
                      <LoadingAnimation />
                    )}
                  </SuiBox>
                </Grid>
                <Grid item>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <SuiTypography fontSize={14} color="white" fontWeight="medium">
                      Floor
                    </SuiTypography>
                    {Number(floorPrice) > 0 ? (
                      <SuiTypography fontSize={14} color="white" fontWeight="bold">
                        {floorPrice} BNB
                      </SuiTypography>
                    ) : (
                      <LoadingAnimation />
                    )}
                  </SuiBox>
                </Grid>
                <Grid item>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <SuiTypography fontSize={14} color="white" fontWeight="medium">
                      ნავაჭრი
                    </SuiTypography>
                    {Number(totalVolumeBNB) > 0 ? (
                      <SuiTypography fontSize={14} color="white" fontWeight="bold">
                        {Number(totalVolumeBNB).toLocaleString("en-US")} BNB
                      </SuiTypography>
                    ) : (
                      <LoadingAnimation />
                    )}
                  </SuiBox>
                </Grid>
              </Grid>
            </SuiBox>
          </Grid>
        </Grid>
      </Card>
    </SuiBox>
  );
}

export default Header;
