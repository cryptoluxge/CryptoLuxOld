import PropTypes from "prop-types";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

function TimelineItem({ name, value }) {
  return (
    <SuiBox position="relative">
      <SuiBox ml={1} mt={1} lineHeight={0} maxWidth="30rem">
        <SuiTypography variant="button" fontWeight="medium" sx={{ display: "inline-flex", alignItems: "center" }}>
          <ArrowCircleRightRoundedIcon fontSize="medium" />
          <span style={{ marginLeft: 5 }}>
            {name}: {value}
          </span>
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

TimelineItem.defaultProps = {
  value: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.node,
};

export default TimelineItem;
