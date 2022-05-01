import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import LoadingAnimation from "components/LoadingAnimation";
import { useCakePrice } from "hooks/getDexTokenPrices";
import { getIfoPoolContract } from "utils/PancakeSwapHelpers/contractHelpers";
import { useWeb3React } from "@web3-react/core";
import { ifo } from "config/PancakeSwap/constants/ifo";
import getSquadUsers from "./getSquadUsers";

function Overview() {
  const mountedRef = useRef(true);
  const { chainId } = useWeb3React();
  const [maxLP, setMaxLP] = useState();
  const [users, setUsers] = useState();
  const [cakePrice, setCakePrice] = useState();
  //  Squad-ის იუზერების რაოდენობა
  const squadUsers = getSquadUsers();
  //  ქეიქის ფასი
  async function getCakePrice() {
    const price = await useCakePrice();
    setCakePrice(price);
  }
  //  თუ ყველამ მიიღო მონაწილეობა მაშინ აგროვდება
  const ifAllUserParticipatedRaised = squadUsers * (maxLP * cakePrice);
  //  ტოკენების გადანაწილება
  const eachTokensForAllUsers = ifo.poolPrivate.saleAmountInNumber / squadUsers;
  //  ტოკენების ფასი
  const eachTokensForAllUsersPrice = eachTokensForAllUsers * ifo.poolPrivate.tokenOfferingPriceInNumber;
  // Overflow-ს გამოთვლა
  const overflowIfAllUserParticipatd = (ifAllUserParticipatedRaised / ifo.poolPrivate.raiseAmountInNumber) * 100;
  // დასაბრუნებელი ქეიქი
  const maXLPinUSD = maxLP * cakePrice;
  const overflowThree = ifo.poolPrivate.saleAmountInNumber / squadUsers;
  const eachTokensPrice = overflowThree * ifo.poolPrivate.tokenOfferingPriceInNumber;
  const cakeToReturn = (maXLPinUSD - eachTokensPrice) / cakePrice;
  const cakeToReturnPrice = cakeToReturn * cakePrice;

  async function getMaximumCAKE() {
    const web3 = new Web3("https://bsc-dataseed.binance.org");
    const OfferingIFOContract = getIfoPoolContract(ifo.poolContract, chainId);
    const getMax = await OfferingIFOContract.methods.viewPoolInformation(0).call();
    setMaxLP(web3.utils.fromWei(getMax[2], "ether"));
  }

  async function getUserParticipated() {
    const urlToFetch = `https://deep-index.moralis.io/api/v2/${ifo.poolContract}/erc20/transfers?chain=bsc&from_block=${ifo.startBlock}&to_block=${ifo.endBlock}`;
    fetch(urlToFetch, {
      headers: {
        "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.total);
      });
  }

  useEffect(() => {
    getCakePrice();
    getMaximumCAKE();
    getUserParticipated();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <SuiBox py={0}>
      <SuiBox>
        <Card>
          <SuiBox pt={2} px={3}>
            <SuiTypography variant="h6" fontWeight="medium">
              PRIVATE SALE - ინფო
            </SuiTypography>
            <Grid container direction="column" spacing={0} mb={2}>
              <Grid item xs={12} md={6} lg={4} mt={2}>
                <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                  აგროვდება
                </SuiTypography>
                {Number(ifAllUserParticipatedRaised) > 0 ? (
                  <SuiBox>
                    {Number(ifAllUserParticipatedRaised) > 0 ? (
                      <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                        ${ifAllUserParticipatedRaised.toLocaleString("en-US")}
                      </SuiTypography>
                    ) : (
                      <LoadingAnimation />
                    )}
                  </SuiBox>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={4} mt={2}>
                <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                  თითოს შეხვდება
                </SuiTypography>
                {Number(eachTokensForAllUsers) > 0 ? (
                  <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                    ~{eachTokensForAllUsers.toLocaleString("en-US")} (${eachTokensForAllUsersPrice.toLocaleString("en-US")})
                  </SuiTypography>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={4} mt={2}>
                <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                  Overflow იქნება
                </SuiTypography>
                {Number(overflowIfAllUserParticipatd) > 0 ? (
                  <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                    ~{overflowIfAllUserParticipatd.toLocaleString("en-US")}%
                  </SuiTypography>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={4} mt={2}>
                <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                  დაგიბრუნდებათ
                </SuiTypography>
                {Number(cakeToReturn) > 0 ? (
                  <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                    ~{cakeToReturn.toLocaleString("en-US")} CAKE (~${cakeToReturnPrice.toLocaleString("en-US")})
                  </SuiTypography>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={4} mt={2}>
                <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                  იუზერები Squad-ით
                </SuiTypography>
                {Number(squadUsers) > 0 ? (
                  <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                    {squadUsers}
                  </SuiTypography>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
            </Grid>
          </SuiBox>
        </Card>
      </SuiBox>
      <SuiBox mt={2}>
        <Card>
          <SuiBox pt={2} px={3}>
            <SuiTypography fontSize={15} fontWeight="medium">
              Private და Public Sale-ში მონაწილეობა მიიღო
            </SuiTypography>
            <Grid container direction="column" spacing={0} mb={2}>
              <Grid item xs={12} md={6} lg={4} mt={1}>
                {Number(users) >= 0 ? (
                  <SuiTypography sx={{ fontSize: 15 }} fontWeight="bold">
                    {users.toLocaleString("en-US")} ადამიანმა
                  </SuiTypography>
                ) : (
                  <LoadingAnimation />
                )}
              </Grid>
            </Grid>
          </SuiBox>
        </Card>
      </SuiBox>
    </SuiBox>
  );
}

export default Overview;
