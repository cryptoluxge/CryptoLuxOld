import { useEffect, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "components/ConnectWalletButton/connectors";
import SuiBox from "components/SuiBox";
import PropTypes from "prop-types";
import WrongNetworkButton from "components/WrongNetworkButton";
import ConnectButton from "./ConnectButton";
import DisconnectButton from "./DisconnectButton";

function ConnectWalletButton({ loginText }) {
  const mountedRef = useRef(true);
  const { active, activate, chainId } = useWeb3React();
  const provider = window.ethereum;
  const isConnected = localStorage.getItem("isWalletConnected");
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          if (typeof provider !== "undefined") {
            await activate(injected);
            localStorage.setItem("isWalletConnected", true);
          } else {
            console.log("გთხოვთ დააყენოთ Metamask!");
          }
        } catch (ex) {
          console.log("error", ex);
        }
      }
    };
    connectWalletOnPageLoad();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return <SuiBox>{active === true || isConnected === "true" ? <SuiBox>{chainId === 1 || chainId === 56 || chainId === 43114 || chainId === 2001 ? <DisconnectButton /> : <WrongNetworkButton />}</SuiBox> : <ConnectButton loginText={loginText} />}</SuiBox>;
}

ConnectWalletButton.defaultProps = {
  loginText: "შესვლა",
};

// Typechecking props for the TimelineItem
ConnectWalletButton.propTypes = {
  loginText: PropTypes.string,
};

export default ConnectWalletButton;
