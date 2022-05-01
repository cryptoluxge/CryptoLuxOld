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

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

function PCSLogo({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Rounded-Icons" transform="translate(-2319.000000, -291.000000)" fill={colors[color] ? colors[color].main : colors.dark.main} fillRule="nonzero">
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="box-3d-50" transform="translate(607.500000, 3.000000)">
              <path d="M5.7,5C5.2,2.4,7.2,0,9.8,0c2.3,0,4.2,1.9,4.2,4.2v5.2c0.6,0,1.2-0.1,1.8-0.1c0.6,0,1.1,0,1.7,0.1V4.2  c0-2.3,1.9-4.2,4.2-4.2c2.6,0,4.6,2.4,4.2,5l-1.1,6.1c3.9,1.7,6.9,4.7,6.9,8.4v2.3c0,3.1-2,5.7-4.9,7.4c-2.9,1.8-6.7,2.8-11,2.8  s-8.1-1-11-2.8C2,27.5,0,24.9,0,21.8v-2.3c0-3.7,2.9-6.7,6.8-8.4L5.7,5z M23.3,11.9l1.3-7.2c0.3-1.8-1-3.5-2.9-3.5  c-1.6,0-2.9,1.3-2.9,2.9v6.6c-0.4-0.1-0.9-0.1-1.3-0.1c-0.6,0-1.1-0.1-1.7-0.1c-0.6,0-1.2,0-1.8,0.1c-0.4,0-0.9,0.1-1.3,0.1V4.2  c0-1.6-1.3-2.9-2.9-2.9C8,1.3,6.6,3,7,4.8L8.3,12c-4.2,1.6-7,4.4-7,7.6v2.3c0,4.9,6.5,8.9,14.5,8.9c8,0,14.5-4,14.5-8.9v-2.3  C30.4,16.3,27.6,13.5,23.3,11.9z" id="Path" />
              <path d="M30.4,21.8c0,4.9-6.5,8.9-14.5,8.9c-8,0-14.5-4-14.5-8.9v-2.3h29.1V21.8z" id="Path" />
              <path d="M7,4.8C6.6,3,8,1.3,9.8,1.3c1.6,0,2.9,1.3,2.9,2.9v6.6c1-0.1,2-0.2,3.1-0.2c1,0,2,0.1,3,0.2V4.2  c0-1.6,1.3-2.9,2.9-2.9c1.8,0,3.2,1.7,2.9,3.5l-1.3,7.2c4.2,1.6,7.1,4.4,7.1,7.6c0,4.9-6.5,8.9-14.5,8.9c-8,0-14.5-4-14.5-8.9  c0-3.2,2.8-6,7-7.6L7,4.8z" id="Path" />
              <path d="M11.8,18.9c0,1.3-0.7,2.4-1.6,2.4c-0.9,0-1.6-1.1-1.6-2.4s0.7-2.4,1.6-2.4C11.1,16.5,11.8,17.6,11.8,18.9z" id="Path" />
              <path d="M22.9,18.9c0,1.3-0.7,2.4-1.6,2.4c-0.9,0-1.6-1.1-1.6-2.4s0.7-2.4,1.6-2.4C22.2,16.5,22.9,17.6,22.9,18.9z" id="Path" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of PCSLogo
PCSLogo.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the PCSLogo
PCSLogo.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark", "light", "white"]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default PCSLogo;
