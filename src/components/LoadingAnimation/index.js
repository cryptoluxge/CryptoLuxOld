import Skeleton from "@mui/material/Skeleton";
import SuiBox from "components/SuiBox";
import PropTypes from "prop-types";

function LoadingAnimation({ sigrdze }) {
  return (
    <SuiBox sx={{ width: sigrdze }}>
      <Skeleton />
    </SuiBox>
  );
}

// Setting default values for the props of TimelineItem
LoadingAnimation.defaultProps = {
  sigrdze: 100,
};

// Typechecking props for the TimelineItem
LoadingAnimation.propTypes = {
  sigrdze: PropTypes.number,
};

export default LoadingAnimation;
