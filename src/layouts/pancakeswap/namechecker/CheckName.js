import React from "react";

const CheckName = () => {
  fetch("https://profile.pancakeswap.com/api/users/valid/gongadzevar")
    .then((response) => {
      console.log(response);
      response.json();
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });

  return <div></div>;
};

export default CheckName;
