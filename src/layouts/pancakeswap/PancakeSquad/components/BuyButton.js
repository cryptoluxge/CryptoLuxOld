import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Info from "components/Info";
import Stack from "@mui/material/Stack";
import { getBNBPrice } from "utils/NativeCoinsPrice";
import Web3 from "web3";
import { getWBNBContract } from "utils/BNBChainHelpers/contractHelpers";
import { getNFTMarket } from "utils/PancakeSwapHelpers/contractHelpers";
import { useWeb3React } from "@web3-react/core";
import ChangeNetworkButton from "components/ChangeNetworkButton";

function Overview({ tokenId, priceBNB, priceUSD }) {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  const [bnbBalance, setBnbBalance] = useState();
  const [wbnbBalance, setWbnbBalance] = useState();
  const [bnbPrice, setBnbPrice] = useState();
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  const wbnbContract = getWBNBContract(chainId);
  const NFTMarketContract = getNFTMarket(chainId);

  async function getBNBBalances() {
    const bnb = await web3.eth.getBalance(account);
    setBnbBalance(web3.utils.fromWei(bnb, "ether"));
    const wbnb = await wbnbContract.methods.balanceOf(account).call();
    setWbnbBalance(web3.utils.fromWei(wbnb, "ether"));
  }

  async function buyNFTWithWBNB() {
    const price = web3.utils.toWei(priceBNB, "ether");
    await NFTMarketContract.methods.buyTokenUsingWBNB("0x0a8901b0E25DEb55A87524f0cC164E9644020EBA", tokenId, price).send({ from: account });
  }

  async function buyNFTWithBNB() {
    await NFTMarketContract.methods.buyTokenUsingBNB("0x0a8901b0E25DEb55A87524f0cC164E9644020EBA", tokenId).send({ from: account });
  }

  async function getBNB() {
    const price = await getBNBPrice();
    setBnbPrice(price);
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
    getBNB();
    if (active === true) {
      getBNBBalances();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiBox>
          {chainId === 56 ? (
            <SuiButton fullWidth onClick={() => handleOpenWallet()} variant="gradient" color="primary">
              ყიდვა
            </SuiButton>
          ) : (
            <ChangeNetworkButton changeTo="BSC" />
          )}
        </SuiBox>
      ) : null}
      <Modal open={openWallet} onClose={handleCloseWallet} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SuiBox sx={style}>
          <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
            <SuiTypography mb={2} id="modal-modal-title" variant="h6" component="h2">
              ყიდვა
            </SuiTypography>
            <SuiTypography onClick={handleCloseWallet} sx={{ cursor: "pointer" }} mb={2} variant="h6" component="h2">
              X
            </SuiTypography>
          </SuiBox>
          <SuiBox>
            <Grid container spacing={2}>
              <Grid item>
                <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                  <SuiBox>
                    <Avatar variant="rounded" sx={{ width: "75px", height: "75px" }} src={`https://static-nft.pancakeswap.com/mainnet/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA/pancake-squad-${tokenId}-1000.png`} alt="pcs" />
                  </SuiBox>
                  <SuiBox ml={1}>
                    <SuiTypography fontSize="12px">PancakeSquad</SuiTypography>
                    <SuiTypography fontSize="14px" fontWeight="bold">
                      Pancake Squad #{tokenId}
                    </SuiTypography>
                    <SuiTypography fontSize="14px">ID: #{tokenId}</SuiTypography>
                  </SuiBox>
                </SuiBox>
              </Grid>
            </Grid>
            <Grid item mt={2}>
              <SuiBox sx={{ backgroundColor: darkMode === "dark" ? "#0d0d0d" : "#ededed" }} p={1} borderRadius="8px">
                <Info
                  name="ფასი: "
                  data={
                    <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                      <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ width: "20px", height: "20px" }} src="https://pancakeswap.finance/images/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.svg" alt="BNBLogo" />
                        <SuiTypography ml={0.5} fontSize="14px">
                          {priceBNB}
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox>
                        <SuiTypography ml={0.5} fontSize="14px">
                          (~${Number(priceUSD).toLocaleString("en-US")})
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                  }
                />
                <Divider />
                <Info
                  name="BNB ბალანსი: "
                  data={
                    <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                      <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ width: "20px", height: "20px" }} src="https://pancakeswap.finance/images/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.svg" alt="BNBLogo" />
                        <SuiTypography ml={0.5} fontSize="14px">
                          {Number(bnbBalance).toFixed(3)}
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox>
                        <SuiTypography ml={0.5} fontSize="14px">
                          (~${(Number(bnbBalance) * Number(bnbPrice)).toLocaleString("en-US")})
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                  }
                />
                <Info
                  name="WBNB ბალანსი: "
                  data={
                    <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                      <SuiBox sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ width: "20px", height: "20px" }} src="https://pancakeswap.finance/images/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.svg" alt="BNBLogo" />
                        <SuiTypography ml={0.5} fontSize="14px">
                          {Number(wbnbBalance).toFixed(3)}
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox>
                        <SuiTypography ml={0.5} fontSize="14px">
                          (~${(Number(wbnbBalance) * Number(bnbPrice)).toLocaleString("en-US")})
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                  }
                />
              </SuiBox>
            </Grid>
          </SuiBox>
          <Divider />
          <SuiBox>
            <Stack direction="column" spacing={1}>
              {Number(wbnbBalance) < Number(priceBNB) ? (
                <SuiButton disabled onClick={() => buyNFTWithWBNB()} fullWidth variant="gradient" color="primary">
                  WBNB-ით ყიდვა
                </SuiButton>
              ) : (
                <SuiButton id="buyWithWBNB" onClick={() => buyNFTWithWBNB()} fullWidth variant="gradient" color="primary">
                  WBNB-ით ყიდვა
                </SuiButton>
              )}
              {Number(wbnbBalance) < Number(priceBNB) ? (
                <SuiButton disabled onClick={() => buyNFTWithBNB()} fullWidth variant="gradient" color="primary">
                  BNB-ით ყიდვა
                </SuiButton>
              ) : (
                <SuiButton id="buyWithBNB" onClick={() => buyNFTWithBNB()} fullWidth variant="gradient" color="primary">
                  BNB-ით ყიდვა
                </SuiButton>
              )}
            </Stack>
          </SuiBox>
        </SuiBox>
      </Modal>
    </SuiBox>
  );
}

Overview.propTypes = {
  tokenId: PropTypes.number.isRequired,
  priceBNB: PropTypes.string.isRequired,
  priceUSD: PropTypes.string.isRequired,
};

export default Overview;
