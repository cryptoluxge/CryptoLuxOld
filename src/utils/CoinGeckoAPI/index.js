import axios from "axios";

export const getGlobalData = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/global`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};

export const getTopCoins = async () => {
  const json = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
    .then((response) => response)
    .catch(() => "error");
  return json;
};
