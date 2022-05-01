import PropTypes from "prop-types";

import Card from "@mui/material/Card";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiButton from "components/SuiButton";

function ProfilesList({ name, appName, description, imageUrl, url, btnColor, variant }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <SuiBox p={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <SuiBox component="li" display="flex" alignItems="center" py={0} mb={0}>
            <SuiBox mr={2}>
              <SuiAvatar src={imageUrl} alt="something here" variant={variant} />
            </SuiBox>
            <SuiBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
              <SuiTypography variant="button" fontWeight="medium">
                {name}
              </SuiTypography>
              <SuiTypography variant="caption" color="text">
                {appName}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
        <SuiTypography fontSize="14px" color="text" mt={2}>
          {description}
        </SuiTypography>
        <SuiBox mt={2} alignContent="center">
          <SuiButton variant="gradient" color={btnColor} href={url} fullWidth>
            გადასვლა
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

ProfilesList.defaultProps = {
  btnColor: "primary",
  description: "",
  variant: "rounded",
};

ProfilesList.propTypes = {
  name: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnColor: PropTypes.string,
  variant: PropTypes.string,
};

export default ProfilesList;
