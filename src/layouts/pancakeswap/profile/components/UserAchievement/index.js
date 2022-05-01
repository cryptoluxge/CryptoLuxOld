import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { getUserAchievements } from "utils/PancakeSwapHelpers/profileHelpers";
import AchievementCard from "../AchievementCard";

function Achievement({ walletAddress }) {
  const mounted = useRef(true);
  const [achievementlist, setAchievementlist] = useState([]);

  async function getAchievements() {
    const achievements = await getUserAchievements(walletAddress);
    setAchievementlist(achievements);
  }

  useEffect(() => {
    getAchievements();

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <SuiBox mt={2}>
      {achievementlist.length > 0 ? (
        <Card sx={{ height: "100%" }}>
          <SuiBox pt={2} px={2}>
            <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              მიღწევები
            </SuiTypography>
          </SuiBox>
          <Grid container spacing={0}>
            {achievementlist.map((x) => (
              <Grid key={x.campaignId} item xs={12} md={6} lg={6}>
                <AchievementCard campaignId={x.campaignId} points={x.points} />
              </Grid>
            ))}
          </Grid>
        </Card>
      ) : null}
    </SuiBox>
  );
}

export default Achievement;

Achievement.propTypes = {
  walletAddress: PropTypes.string.isRequired,
};
