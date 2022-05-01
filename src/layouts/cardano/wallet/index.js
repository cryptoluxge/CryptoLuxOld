import React, { useState } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

function Overview() {
  const [data, setData] = useState(null);
  const [adaBalance, setAdaBalance] = useState("");
  const [isStaked, setIsStaked] = useState("");
  const [pendingReward, setPendingReward] = useState("");
  const [tokenList, setTokenList] = useState();

  const getWallet = () => {
    const adaWallet = document.getElementById("adaWallet").value;
    axios(`https://pool.pm/wallet/${adaWallet}`)
      .then((response) => {
        // eslint-disable-next-line
        console.log(response);
        setData(response.data);
        setAdaBalance(response.data.lovelaces / 1000000);
        setIsStaked(response.data.pool ? "კი" : "არა");
        setPendingReward(response.data.reward / 1000000);
        setTokenList(response.data.tokens);
      })
      .catch(() => {
        setData("error");
      });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox display="flex" justifyContent="center">
        <Card sx={{ width: 600 }}>
          <SuiBox p={3}>
            <SuiInput fullWidth id="adaWallet" placeholder="კარდანოს საფულის მისამართი" />
            <SuiBox mt={1}>
              <SuiButton onClick={() => getWallet()} variant="gradient" color="primary" fullWidth>
                მანახე
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </Card>
      </SuiBox>
      <SuiBox mb={3} mt={3}>
        {data ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard title={{ text: "ბალანსი" }} count={adaBalance} icon={{ color: "info", component: "paid" }} />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard title={{ text: "სტეიკზეა" }} count={isStaked} icon={{ color: "info", component: "paid" }} />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard title={{ text: "დაგროვებული" }} count={pendingReward} icon={{ color: "info", component: "paid" }} />
            </Grid>
          </Grid>
        ) : null}
      </SuiBox>
      {tokenList ? console.log(tokenList.map((token) => console.log(token.name, token.quantity))) : null}
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
