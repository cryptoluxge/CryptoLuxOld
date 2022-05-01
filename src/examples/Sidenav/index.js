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

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Brightness6Icon from "@mui/icons-material/Brightness6";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavList from "examples/Sidenav/SidenavList";
import SidenavItem from "examples/Sidenav/SidenavItem";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav } from "context";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const itemName = pathname.split("/").slice(1)[1];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, href }) =>
      href ? (
        <Link key={key} href={href} target="_blank" rel="noreferrer" sx={{ textDecoration: "none" }}>
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
          <SidenavItem name={name} active={route === pathname} nested />
        </NavLink>
      )
    );

    return template;
  };

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem key={key} name={name} active={key === itemName} open={openNestedCollapse === name} onClick={() => (openNestedCollapse === name ? setOpenNestedCollapse(false) : setOpenNestedCollapse(name))}>
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link href={href} key={key} target="_blank" rel="noreferrer" sx={{ textDecoration: "none" }}>
            <SidenavItem name={name} active={key === itemName} />
          </Link>
        ) : (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
    let returnValue;

    if (type === "collapseble") {
      returnValue = href ? (
        <NavLink to={route} key={key}>
          <SidenavCollapse color={color} key={key} name={name} icon={icon} active={key === collapseName} noCollapse={noCollapse} />
        </NavLink>
      ) : (
        <SidenavCollapse color={color} key={key} name={name} icon={icon} active={key === collapseName} open={openCollapse === name} onClick={() => (openCollapse === name ? setOpenCollapse(false) : setOpenCollapse(name))}>
          {collapse ? renderCollapse(collapse) : null}
        </SidenavCollapse>
      );
    } else if (type === "title") {
      returnValue = (
        <SuiTypography key={key} display="block" variant="caption" fontWeight="bold" textTransform="uppercase" opacity={0.6} pl={3} mt={2} mb={1} ml={1}>
          {title}
        </SuiTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} />;
    } else if (type === "uncollapseble") {
      returnValue = (
        <NavLink to={route} key={key}>
          <SidenavCollapse color={color} key={key} name={name} icon={icon} active={key === collapseName} noCollapse={noCollapse} />
        </NavLink>
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <SuiBox pt={3} pb={1} px={4} textAlign="center">
        <SuiBox display={{ xs: "block", xl: "none" }} position="absolute" top={0} right={0} p={1.625} onClick={closeSidenav} sx={{ cursor: "pointer" }}>
          <SuiTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </SuiTypography>
        </SuiBox>
        <SuiBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <SuiBox component="img" src={brand} alt="კრიპტოლუქსის ლოგო" width="2rem" />}
          <SuiBox width={!brandName && "100%"} sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}>
            <SuiTypography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      <SuiBox mb={0} mt={0} sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }} id="darkModeButton">
        <Brightness6Icon />
      </SuiBox>
      <Divider />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "primary",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Sidenav;
