import PropTypes from "prop-types";

import Card from "@mui/material/Card";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiButton from "components/SuiButton";

function ProfilesList({ name, apptype, description, imageUrl, url, btnColor }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <SuiBox p={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <SuiBox component="li" display="flex" alignItems="center" py={0} mb={0}>
            <SuiBox mr={2}>
              <SuiAvatar src={imageUrl} alt="something here" variant="rounded" />
            </SuiBox>
            <SuiBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
              <SuiTypography variant="button" fontWeight="medium">
                {name}
              </SuiTypography>
              <SuiTypography variant="caption" color="text">
                {apptype}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
        <SuiTypography fontSize="14px" color="text" mt={2}>
          {description}
        </SuiTypography>
        <SuiBox mt={2} alignContent="center">
          <SuiButton variant="gradient" color={btnColor} href={url} fullWidth>
            საიტის ნახვა
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

ProfilesList.propTypes = {
  name: PropTypes.string.isRequired,
  apptype: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnColor: PropTypes.string.isRequired,
};

export default ProfilesList;
