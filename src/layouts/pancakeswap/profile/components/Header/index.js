import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import LoadingAnimation from "components/LoadingAnimation";
import SuiAvatar from "components/SuiAvatar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { getUserData, getProfileCreationTime, getProfileUsername, getProfilePictureFor, getUserAchievements, getBunnyAndSquadBalance } from "utils/PancakeSwapHelpers/profileHelpers";
import { BSCScanLogo } from "../Logos";

function Header({ walletAddress }) {
  const [userName, setUserName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [userPoints, setUserPoints] = useState(Number);
  const [userId, setUserId] = useState(Number);
  const [userTeam, setUserTeam] = useState(Number);
  const [userPcsNfts, setUserPcsNfts] = useState(Number);
  const [userAchivements, setUserAchivements] = useState(Number);

  const cakersBanner = "https://pancakeswap.finance/images/teams/cakers-banner.png";
  const flippersBanner = "https://pancakeswap.finance/images/teams/flippers-banner.png";
  const stromBanner = "https://pancakeswap.finance/images/teams/storm-banner.png";

  async function getProfileInfo() {
    const userProfile = await getUserData(walletAddress);
    const creationTime = await getProfileCreationTime(walletAddress);
    const getUsername = await getProfileUsername(walletAddress);
    const profilePIC = await getProfilePictureFor(walletAddress);
    const achievements = await getUserAchievements(walletAddress);
    const bunnySquadBalance = await getBunnyAndSquadBalance(walletAddress);

    setCreatedAt(creationTime);
    setUserName(getUsername);
    setUserProfilePic(profilePIC);
    setUserAchivements(achievements.length);
    setUserPcsNfts(bunnySquadBalance);
    setUserPoints(userProfile.numberPoints);
    setUserId(userProfile.userId);

    if (Number(userProfile.teamId) === 1) {
      setUserTeam(stromBanner);
    } else if (Number(userProfile.teamId) === 2) {
      setUserTeam(flippersBanner);
    } else if (Number(userProfile.teamId) === 3) {
      setUserTeam(cakersBanner);
    }
  }

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <SuiBox position="relative" mt={2}>
      <SuiBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="12.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) => `${linearGradient(rgba(gradients.info.main, 0.0), rgba(gradients.info.state, 0.0))}, url(${userTeam})`,
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
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SuiAvatar src={userProfilePic} alt="profile-image" variant="rounded" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <SuiBox height="100%" mt={0.5} lineHeight={0}>
              <SuiBox sx={{ display: "flex" }}>
                {userName !== "" ? (
                  <SuiTypography variant="h5" fontWeight="medium">
                    <Link href={`https://pancakeswap.finance/nfts/profile/${walletAddress}/achievements`} target="_blank" underline="none">
                      @{userName}
                    </Link>
                    <IconButton aria-label="delete" href={`https://bscscan.com/address/${walletAddress}`} target="_blank">
                      <BSCScanLogo />
                    </IconButton>
                  </SuiTypography>
                ) : (
                  <LoadingAnimation />
                )}
              </SuiBox>
              {Number(userId) > 0 ? (
                <SuiTypography variant="button" color="text" fontWeight="medium">
                  ID: {userId} / {createdAt.slice(0, 10)}
                </SuiTypography>
              ) : (
                <LoadingAnimation />
              )}
            </SuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <SuiBox sx={{ backgroundColor: "primary.main" }} borderRadius="lg" p={1}>
              <Grid container spacing={0} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <SuiTypography fontSize={16} color="white" fontWeight="medium">
                      მიღწევები
                    </SuiTypography>
                    {Number(userAchivements) > 0 ? (
                      <SuiTypography fontSize={16} color="white" fontWeight="medium">
                        {userAchivements}
                      </SuiTypography>
                    ) : (
                      <LoadingAnimation sigrdze={10} />
                    )}
                  </SuiBox>
                </Grid>
                <Grid item>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <SuiTypography fontSize={16} color="white" fontWeight="medium">
                      ქულა
                    </SuiTypography>
                    {Number(userPoints) > 0 ? (
                      <SuiTypography fontSize={16} color="white" fontWeight="medium">
                        {userPoints}
                      </SuiTypography>
                    ) : (
                      <LoadingAnimation sigrdze={10} />
                    )}
                  </SuiBox>
                </Grid>
                <Grid item>
                  <SuiBox sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <SuiTypography fontSize={16} color="white" fontWeight="medium">
                      NFT
                    </SuiTypography>
                    {Number(userPcsNfts) >= 0 ? (
                      <SuiTypography fontSize={16} color="white" fontWeight="medium">
                        {userPcsNfts}
                      </SuiTypography>
                    ) : (
                      <LoadingAnimation sigrdze={10} />
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

Header.propTypes = {
  walletAddress: PropTypes.string.isRequired,
};
