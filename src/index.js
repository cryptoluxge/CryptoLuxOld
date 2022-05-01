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

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <BrowserRouter>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Web3ReactProvider>,
  document.getElementById("root")
);
