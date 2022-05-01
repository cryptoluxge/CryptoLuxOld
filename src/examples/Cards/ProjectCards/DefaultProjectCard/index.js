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

// react-router-dom components

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiAvatar from "components/SuiAvatar";

function DefaultProjectCard({ authors }) {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <SuiAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,
          width: 36,
          height: 36,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return <SuiBox display="flex">{renderAuthors}</SuiBox>;
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  authors: PropTypes.oneOfType([PropTypes.object]),
};

export default DefaultProjectCard;
