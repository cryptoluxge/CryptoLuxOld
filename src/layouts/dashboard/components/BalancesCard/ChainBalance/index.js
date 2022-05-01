/**
=========================================================
* Soft UI Dashboard PRO React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiProgress from "components/SuiProgress";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import LoadingAnimation from "components/LoadingAnimation";

function ChainBalance({ icon, title, price }) {
  const { socialMediaColors } = colors;
  const { size } = typography;

  return (
    <SuiBox width="100%" py={1} mb={0}>
      <SuiBox display="flex" justifyContent="space-between" mb={2}>
        <SuiBox fontSize={16} display="flex" alignItems="center" lineHeight={0}>
          <SuiBox mr={1} color={socialMediaColors[icon.color].main} fontSize={size.xl}>
            {icon.component}
          </SuiBox>
          {title}
        </SuiBox>
        <SuiTypography variant="button" fontWeight="medium" color="text">
          ${price.toLocaleString("en-US")}
        </SuiTypography>
      </SuiBox>
      <SuiProgress value={0} color="dark" />
    </SuiBox>
  );
}

ChainBalance.defaultProps = {
  price: "$0.00",
  title: <LoadingAnimation />,
};

// Typechecking props for the ChainBalance
ChainBalance.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["facebook", "twitter", "instagram", "linkedin", "pinterest", "youtube", "vimeo", "slack", "dribbble", "github", "reddit", "tumblr"]).isRequired,
    component: PropTypes.node.isRequired,
  }).isRequired,
  title: PropTypes.node,
  price: PropTypes.node,
};

export default ChainBalance;
