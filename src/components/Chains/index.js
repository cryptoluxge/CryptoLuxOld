import React from "react";
import SuiSelect from "components/SuiSelect";
import SuiBox from "components/SuiBox";
import { BSCLogo, ETHLogo, AvaxLogo, MilkomedaLogo } from "assets/images/Logos/Chains";
import { BNBChain, AvalancheChain, ETHChain, MilkomedaChain } from "hooks/networks";
import { useWeb3React } from "@web3-react/core";

const index = () => {
  const { chainId } = useWeb3React();

  function changeChain(event) {
    console.log(event.label);
    if (event.label === "BSC") {
      BNBChain();
    } else if (event.label === "ETH") {
      ETHChain();
    } else if (event.label === "AVAX") {
      AvalancheChain();
    } else if (event.label === "Milkomeda") {
      MilkomedaChain();
    }
  }

  function getChain() {
    let connectedChain;
    if (chainId === 56) {
      connectedChain = (
        <SuiBox sx={{ display: "inline-flex", alignItems: "center" }}>
          <BSCLogo />
        </SuiBox>
      );
    } else if (chainId === 1) {
      connectedChain = (
        <SuiBox sx={{ display: "inline-flex", alignItems: "center" }}>
          <ETHLogo />
        </SuiBox>
      );
    } else if (chainId === 43114) {
      connectedChain = (
        <SuiBox sx={{ display: "inline-flex", alignItems: "center" }}>
          <AvaxLogo />
        </SuiBox>
      );
    } else if (chainId === 2001) {
      connectedChain = (
        <SuiBox sx={{ display: "inline-flex", alignItems: "center" }}>
          <MilkomedaLogo />
        </SuiBox>
      );
    } else {
      connectedChain = "აირჩიეთ ქსელი";
    }
    return connectedChain;
  }

  return (
    <SuiSelect
      onChange={(e) => changeChain(e)}
      placeholder={getChain()}
      options={[
        { icon: <BSCLogo />, value: "smartChain", label: "BSC" },
        { icon: <AvaxLogo />, value: "avalancheChain", label: "AVAX" },
        { icon: <ETHLogo />, value: "ethereumChain", label: "ETH" },
        { icon: <MilkomedaLogo />, value: "MilkomedaChain", label: "Milkomeda" },
      ]}
    />
  );
};

export default index;
