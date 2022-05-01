/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Link from "@mui/material/Link";
// Timeline context
import { useTimeline } from "examples/Timeline/context";

// Custom styles for the TimelineItem
import { timelineItem } from "examples/Timeline/TimelineItem/styles";

function TimelineItem({ icon, title, price, description, slug, lastItem, url }) {
  const isDark = useTimeline();

  return (
    <SuiBox position="relative" sx={(theme) => timelineItem(theme, { lastItem })}>
      <SuiBox bgColor={isDark ? "dark" : "white"} position="absolute" top="3.25%" left="2px" zIndex={2}>
        <img src={icon} alt="test" style={{ width: 30 }} />
      </SuiBox>
      <SuiBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <SuiTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          <Link href={`${url}${slug}`} target="_blank" underline="none" sx={{ fontSize: 14 }}>
            {title}
          </Link>
        </SuiTypography>
        <SuiBox mt={0.5}>
          {price ? (
            <SuiTypography variant="caption" fontWeight="medium" color={isDark ? "secondary" : "text"}>
              ${price}
            </SuiTypography>
          ) : (
            price
          )}
        </SuiBox>
        <SuiBox mt={2} mb={1.5}>
          {description ? (
            <SuiTypography variant="button" fontWeight="regular" color="text">
              {description}
            </SuiTypography>
          ) : null}
        </SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  lastItem: false,
  description: "",
  price: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string,
  slug: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  lastItem: PropTypes.bool,
};

export default TimelineItem;
