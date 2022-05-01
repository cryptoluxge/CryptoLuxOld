import PropTypes from "prop-types";
import SuiButton from "components/SuiButton";
import { BNBChain, ETHChain, AvalancheChain, MilkomedaChain } from "hooks/networks";

function ChangeNetworkButton({ changeTo }) {
  async function changeNetwork() {
    if (changeTo === "BSC") {
      BNBChain();
    } else if (changeTo === "ETH") {
      ETHChain();
    } else if (changeTo === "AVAX") {
      AvalancheChain();
    } else if (changeTo === "Milkomeda") {
      MilkomedaChain();
    }
  }

  return (
    <SuiButton onClick={() => changeNetwork()} fullWidth variant="gradient" color="error">
      გადართე {changeTo} ქსელზე
    </SuiButton>
  );
}

export default ChangeNetworkButton;

ChangeNetworkButton.propTypes = {
  changeTo: PropTypes.string.isRequired,
};
