import { useState, useEffect, useRef } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";
import themeDark from "assets/themeDark";

// Soft UI Dashboard PRO React routes
import routes from "routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav } from "context";

// Images
import brand from "assets/images/logo.png";

export default function App() {
  const mountedRef = useRef(true);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [themee, setThemee] = useState();
  const { pathname } = useLocation();

  const checkDarkMode = localStorage.getItem("darkMode");

  const DarkModeState = () => {
    const checkDarkModee = localStorage.getItem("darkMode");
    if (checkDarkModee === null) {
      setThemee("dark");
      localStorage.setItem("darkMode", "dark");
    } else if (checkDarkModee === "ligth") {
      setThemee("dark");
      localStorage.setItem("darkMode", "dark");
    } else if (checkDarkModee === "dark") {
      setThemee("ligth");
      localStorage.setItem("darkMode", "ligth");
    }
  };

  useEffect(() => {
    document.getElementById("darkModeButton").addEventListener("click", () => {
      DarkModeState();
    });
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (checkDarkMode === "dark") {
      setThemee("dark");
    } else if (checkDarkMode === "ligth") {
      setThemee("ligth");
    }
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
    return () => {
      mountedRef.current = false;
    };
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    return () => {
      mountedRef.current = false;
    };
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={themee === "dark" ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav color={sidenavColor} brand={brand} brandName="კრიპტოლუქსი" routes={routes} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} />
        </>
      )}
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </ThemeProvider>
  );
}
