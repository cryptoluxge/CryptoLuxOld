import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { explorerLink } from "utils/getExplorerUrls";
import { shortAddress } from "utils/truncateAddress";
import Divider from "@mui/material/Divider";

function DisconnectButton() {
  const mountedRef = useRef(true);
  const { deactivate, account, active } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [userBalance, setUserBalance] = useState(Number);
  const [viewOnExplorer, setViewOnExplorer] = useState("");
  const [chainName, setChainName] = useState("");
  const [chainId, setChainId] = useState(Number);
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3(window.ethereum);

  async function getChain() {
    const chain = await web3.eth.getChainId();
    setChainId(chain);
    if (chain === 56) {
      setChainName("BNB");
      const nativeBalance = await web3.eth.getBalance(account);
      const nativeBalanceInETH = web3.utils.fromWei(nativeBalance, "ether");
      setUserBalance(Number(nativeBalanceInETH));
      setViewOnExplorer("ნახე BSCScan-ზე");
    } else if (chain === 1) {
      setChainName("ETH");
      const nativeBalance = await web3.eth.getBalance(account);
      const nativeBalanceInETH = web3.utils.fromWei(nativeBalance, "ether");
      setUserBalance(Number(nativeBalanceInETH));
      setViewOnExplorer("ნახე Etherscan-ზე");
    } else if (chain === 43114) {
      setChainName("AVAX");
      const nativeBalance = await web3.eth.getBalance(account);
      const nativeBalanceInETH = web3.utils.fromWei(nativeBalance, "ether");
      setUserBalance(Number(nativeBalanceInETH));
      setViewOnExplorer("ნახე SnowTrace-ზე");
    } else if (chain === 2001) {
      setChainName("MilkADA");
      const nativeBalance = await web3.eth.getBalance(account);
      const nativeBalanceInWADA = web3.utils.fromWei(nativeBalance, "ether");
      setUserBalance(Number(nativeBalanceInWADA));
      setViewOnExplorer("ნახე Milkomeda-ზე");
    }
  }

  function refreshPage() {
    window.location.reload();
  }

  window.ethereum.on("chainChanged", refreshPage);
  window.ethereum.on("accountsChanged", refreshPage);

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
      refreshPage();
    } catch (ex) {
      console.log(ex);
    }
  }

  const darkMode = localStorage.getItem("darkMode");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 311,
    bgcolor: darkMode === "dark" ? "#1c1c1c" : "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 2,
  };

  useEffect(() => {
    if (active === true) {
      getChain();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      <SuiButton onClick={handleOpenWallet} variant="gradient" color="primary">
        {shortAddress(account, 4)}
      </SuiButton>
      <Modal open={openWallet} onClose={handleCloseWallet} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SuiBox sx={style}>
          <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
            <SuiTypography mb={2} id="modal-modal-title" variant="h6" component="h2">
              შენი საფულე
            </SuiTypography>
            <SuiTypography onClick={handleCloseWallet} sx={{ cursor: "pointer" }} mb={2} variant="h6" component="h2">
              X
            </SuiTypography>
          </SuiBox>
          <SuiBox>
            <Grid container spacing={2}>
              <Grid item>
                <SuiTypography sx={{ fontSize: 14 }}>საფულის მისამართი:</SuiTypography>
                <SuiBox
                  component="div"
                  sx={{
                    whiteSpace: "nowrap",
                    overflowX: "auto",
                    my: 0,
                    p: 1,
                    width: 280,
                    bgcolor: darkMode === "dark" ? "#1c1c1c" : "background.paper",
                    color: darkMode === "dark" ? "#fff" : "1c1c1c",
                    border: "1px solid",
                    borderColor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.300"),
                    borderRadius: 2,
                    fontSize: "0.875rem",
                    fontWeight: "700",
                  }}
                >
                  {account}
                </SuiBox>
              </Grid>
            </Grid>
            <SuiBox mt={1} sx={{ display: "flex", justifyContent: "space-between" }}>
              <SuiTypography sx={{ fontSize: 14 }} fontWeight="light">
                {chainName} ბალანსი:
              </SuiTypography>
              <SuiBox>
                <SuiTypography sx={{ fontSize: 14 }} fontWeight="light">
                  {userBalance.toFixed(5)}
                </SuiTypography>
              </SuiBox>
            </SuiBox>
            <SuiBox mt={1} sx={{ display: "flex", justifyContent: "right" }}>
              <SuiBox>
                <SuiTypography sx={{ fontSize: 14 }} fontWeight="bold">
                  <Link target="_blank" href={explorerLink("wallet", account, chainId)} underline="hover">
                    {viewOnExplorer} <OpenInNewIcon />
                  </Link>
                </SuiTypography>
              </SuiBox>
            </SuiBox>
          </SuiBox>
          <Divider />
          <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
            <SuiButton onClick={() => disconnect()} variant="gradient" color="primary">
              გამოსვლა
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

export default DisconnectButton;
