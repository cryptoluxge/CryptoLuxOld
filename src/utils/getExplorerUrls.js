const explorerURLS = {
  56: "https://bscscan.com",
  1: "https://etherscan.io",
  43114: "https://snowtrace.io",
  137: "https://polygonscan.com",
  250: "https://ftmscan.com",
  2001: "https://explorer-mainnet-cardano-evm.c1.milkomeda.com",
};

export function explorerLink(type, data, chain) {
  switch (type) {
    case "wallet":
      return `${explorerURLS[chain]}/address/${data}`;
    case "tx":
      return `${explorerURLS[chain]}/tx/${data}`;
    case "token":
      return `${explorerURLS[chain]}/token/${data}`;
    case "block":
      return `${explorerURLS[chain]}/block/${data}`;
    default:
      return `${explorerURLS[chain]}/`;
  }
}

export function getExplorerLinkForNFT(collectionAddress, tokenId, chain) {
  return `${explorerURLS[chain]}/token/${collectionAddress}?a=${tokenId}`;
}
