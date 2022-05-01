import { useState } from "react";
import axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import SuiAlert from "components/SuiAlert";

import Card from "@mui/material/Card";

function Overview() {
  const [name, setName] = useState("");

  const update = () => {
    const username = document.getElementById("nameToCheck").value;
    if (username === "") {
      // eslint-disable-next-line
      console.log("შეიყვანეთ სახელი!");
    } else if (username.length < 3) {
      // eslint-disable-next-line
      console.log("სახელი უნდა იყოს 3 სიმბოლოზე მეტი!");
    } else if (username.length > 15) {
      // eslint-disable-next-line
      console.log("სახელი უნდა იყოს 15 სიმბოლოზე ნაკლები!");
    } else {
      axios(`https://profile.pancakeswap.com/api/users/valid/${username}`)
        .then((response) => {
          setName(response.data);
        })
        .catch(() => {
          setName("error");
        });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox display="flex" justifyContent="center" mb={5}>
        <Card sx={{ width: 400 }}>
          <SuiBox p={3} mb={0}>
            <SuiInput id="nameToCheck" fullWidth placeholder="სახელი" />
            <SuiBox mt={1}>
              <SuiButton onClick={update} variant="gradient" color="primary" fullWidth>
                მანახე
              </SuiButton>
              {name ? <SuiBox mt={1}>{name === "error" ? <SuiAlert color="error">დაკავებულია</SuiAlert> : <SuiAlert color="success">{name.username} თავისუფალია</SuiAlert>}</SuiBox> : null}
            </SuiBox>
          </SuiBox>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
