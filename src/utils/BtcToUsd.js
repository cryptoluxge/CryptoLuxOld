import { useState } from "react";
import axios from "axios";

const BtcToUsd = () => {
  const [BtcPrice, setBtcprice] = useState("");
  axios
    .get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
    .then((response) => {
      const price = response.data.USD;
      setBtcprice(price);
    })
    .catch((error) => {
      console.log(error);
    });
  return [BtcPrice];
};

export default BtcToUsd;
