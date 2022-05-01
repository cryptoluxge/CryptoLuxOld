import PropTypes from "prop-types";
import SuiButton from "components/SuiButton";
import WarningIcon from "@mui/icons-material/Warning";
import { BNBChain } from "hooks/networks";

function WrongNetworkButton({ text }) {
  return (
    <SuiButton onClick={() => BNBChain()} startIcon={<WarningIcon />} color="error" variant="gradient">
      {text}
    </SuiButton>
  );
}

WrongNetworkButton.defaultProps = {
  text: "არასწორი ქსელი",
};

WrongNetworkButton.propTypes = {
  text: PropTypes.string,
};

export default WrongNetworkButton;
