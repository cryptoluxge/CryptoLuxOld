export const getNativeTransactions = async (walletAddress, chainId) => {
  let chain;
  if (chainId === 56) {
    chain = "bsc";
  } else if (chainId === 1) {
    chain = "eth";
  } else if (chainId === 43114) {
    chain = "avalanche";
  }

  const json = await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}?chain=${chain}`, {
    headers: {
      "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return json;
};

export const getTokenTransactions = async (walletAddress, chain) => {
  const json = await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}/erc20/transfers?chain=${chain}`, {
    headers: {
      "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return json;
};

export const getNftTransactions = async (walletAddress, chain) => {
  const json = await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}/nft/transfers?chain=${chain}&format=decimal&direction=both`, {
    headers: {
      "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return json;
};

export const getTokenBalances = async (walletAddress, chain) => {
  const json = await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=${chain}`, {
    headers: {
      "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return json;
};

export const getNftBalances = async (walletAddress, chain) => {
  const json = await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}/nft?chain=${chain}&format=decimal`, {
    headers: {
      "X-API-Key": "l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return json;
};
