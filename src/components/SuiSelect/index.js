/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-select components
import Select from "react-select";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import colorsDark from "assets/themeDark/base/colors";

// Custom styles for SuiSelect
import styles from "components/SuiSelect/styles";
import SuiBox from "components/SuiBox";

const SuiSelect = forwardRef(({ size, error, success, ...rest }, ref) => {
  const darkMode = localStorage.getItem("darkMode");
  const { light } = darkMode === "dark" ? colorsDark : colors;

  return (
    <Select
      {...rest}
      ref={ref}
      styles={styles(size, error, success)}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: light.main,
          primary: light.main,
        },
      })}
      getOptionLabel={(e) => (
        <SuiBox sx={{ display: "inline-flex", alignItems: "center" }}>
          {e.icon}
          <span style={{ marginLeft: 5 }}>{e.label}</span>
        </SuiBox>
      )}
    />
  );
});

// Setting default values for the props of SuiSelect
SuiSelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the SuiSelect
SuiSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default SuiSelect;
