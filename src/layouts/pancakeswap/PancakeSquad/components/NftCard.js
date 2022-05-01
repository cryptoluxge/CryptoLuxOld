import { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import SuiBox from "components/SuiBox";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getBNBPrice } from "utils/NativeCoinsPrice";
import Info from "components/Info";
import BuyButton from "./BuyButton";

function Overview({ tokenId, currentAskPrice }) {
  const [open, setOpen] = useState(false);
  const [traits, setTraits] = useState([]);
  const [bnbPrice, setBnbPrice] = useState();

  async function getBNB() {
    const price = await getBNBPrice();
    setBnbPrice(price);
  }

  async function getSquadTraits() {
    await fetch(`https://nft.pancakeswap.com/api/v1/collections/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA/tokens/${tokenId}`)
      .then((res) => res.json())
      .then((res) => {
        setTraits(res.data.attributes);
      })
      .catch((error) => {
        console.log(`${tokenId}`, error);
      });
  }

  useEffect(() => {
    getBNB();
    if (Number(tokenId) > 0) {
      getSquadTraits();
    }
  }, [tokenId]);

  return (
    <Card width="auto">
      <SuiBox p={1} mb={0} mt={0}>
        <Avatar sx={{ width: "100%", height: "100%" }} src={`https://static-nft.pancakeswap.com/mainnet/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA/pancake-squad-${tokenId}-1000.png`} variant="rounded" />
        <SuiTypography mt={0.5} color="secondary" fontSize="12px" fontWeight="bold">
          Pancake Squad
        </SuiTypography>
        <SuiTypography mb={1} color="dark" fontSize="15px" fontWeight="bold">
          Pancake Squad #{tokenId}
        </SuiTypography>
        <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
          <SuiTypography fontSize="14px">ფასი: </SuiTypography>
          <SuiBox sx={{ display: "flex", alignItems: "center" }}>
            <SuiTypography mr={0.5} fontWeight="bold" fontSize="13px">
              (${(bnbPrice * currentAskPrice).toLocaleString("en-US")}) {currentAskPrice}
            </SuiTypography>
            <Avatar sx={{ width: "20px", height: "20px" }} src="https://pancakeswap.finance/images/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.svg" alt="BNBLogo" />
          </SuiBox>
        </SuiBox>
        <SuiBox mt={1}>
          <BuyButton tokenId={tokenId} priceBNB={currentAskPrice} priceUSD={(bnbPrice * currentAskPrice).toFixed(2)} />
        </SuiBox>
      </SuiBox>
      <SuiBox mb={1} sx={{ display: "flex", justifyContent: "center" }}>
        <SuiButton onClick={() => setOpen(!open)} variant="text" color="dark" endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}>
          ნახე მეტი
        </SuiButton>
      </SuiBox>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <SuiBox p={2}>
          {traits.map((x) => (
            <Info key={Number(tokenId) / 2.5677} name={`${x.traitType.toUpperCase()}:`} data={x.value} />
          ))}
        </SuiBox>
      </Collapse>
    </Card>
  );
}

Overview.propTypes = {
  tokenId: PropTypes.number.isRequired,
  currentAskPrice: PropTypes.string.isRequired,
};

export default Overview;
