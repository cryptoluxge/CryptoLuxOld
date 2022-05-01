import PropTypes from "prop-types";
import SuiTypography from "components/SuiTypography";
import { MetamaskLogo } from "components/ConnectWalletButton/WalletIcons";

function AddToMetamaskButton({ tokenAddress, tokenSymbol, tokenDecimals }) {
  async function addToken() {
    const provider = window.ethereum;
    try {
      await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SuiTypography onClick={() => addToken()} sx={{ fontSize: 14, display: "flex", cursor: "pointer" }}>
      მეტამასკში დამატება <MetamaskLogo width={20} />
    </SuiTypography>
  );
}

AddToMetamaskButton.propTypes = {
  tokenAddress: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  tokenDecimals: PropTypes.number.isRequired,
};

export default AddToMetamaskButton;
