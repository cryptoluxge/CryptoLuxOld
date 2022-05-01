import { useEffect, useRef } from "react";
import SuiBox from "components/SuiBox";
/* import Switch from "@mui/material/Switch"; */
import Checkbox from "@mui/material/Checkbox";
import SuiTypography from "components/SuiTypography";
import { useWeb3React } from "@web3-react/core";
import { getIfoPoolContract, getBep20TokenContract, getSwapContract } from "utils/PancakeSwapHelpers/contractHelpers";
import Web3 from "web3";
import { ifo } from "config/PancakeSwap/constants/ifo";

function Overview() {
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const web3 = new Web3(window.ethereum);
  const offeringTokenIFOPoolContract = getIfoPoolContract(ifo.poolContract, chainId);

  async function autoSell() {
    const botTimer = setInterval(async () => {
      const offeringTokenContract = getBep20TokenContract(ifo.address, chainId);
      const swapContract = getSwapContract(chainId);
      const tokenBalance = await offeringTokenContract.methods.balanceOf(account).call();
      if (tokenBalance > 0) {
        clearInterval(botTimer);
        const amountIn = tokenBalance;
        const amountOutMin = 0;
        const path = [ifo.address, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"];
        const toAddress = account;
        const deadline = Date.now() + 100000;

        await swapContract.methods
          .swapExactTokensForETH(amountIn, amountOutMin, path, toAddress, deadline)
          .send({ from: account })
          .on("error", (error) => {
            console.log("Error: ", error);
            if (error.code === 4001) {
              /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
              console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
            } else if (error.code === -32003) {
              /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
              console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
            } else if (error.code === -32603) {
              /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
            } else {
              /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
              console.log("არ დადასტურდა");
            }
          })
          .then((receipt) => {
            console.log("LAST CALLBACK: ", receipt);
            if (receipt.status === true) {
              /* showNotification("დადასტურდა", "გაიყიდა", "success"); */
              console.log("გაიყიდა");
              document.getElementById("autoWithdrawAndSellInPublic").checked = false;
              document.getElementById("autoWithdrawAndSellInPrivate").checked = false;
            } else {
              console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            }
          });
      }
    }, 1000);
  }

  async function AutoFunction() {
    /* 0 Private
    1 Public */
    const botTimer = setInterval(async () => {
      const bn = await web3.eth.getBlockNumber();
      const autoDepositInPublic = document.getElementById("autoDepositInPublic").checked;
      const autoWithdrawInPublic = document.getElementById("autoWithdrawInPublic").checked;
      const autoWithdrawAndSellInPublic = document.getElementById("autoWithdrawAndSellInPublic").checked;
      const autoDepositInPrivate = document.getElementById("autoDepositInPrivate").checked;
      const autoWithdrawInPrivate = document.getElementById("autoWithdrawInPrivate").checked;
      const autoWithdrawAndSellInPrivate = document.getElementById("autoWithdrawAndSellInPrivate").checked;

      if (bn >= ifo.endBlock) {
        if (autoWithdrawInPublic === true) {
          clearInterval(botTimer);
          await offeringTokenIFOPoolContract.methods
            .harvestPool(1)
            .send({ from: account })
            .once("transactionHash", (hash) => {
              console.log(`თქვენი ტრანზაქცია მუშავდება: ${hash}`);
            })
            .on("error", (error) => {
              console.log("Error: ", error);
              if (error.code === 4001) {
                /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
                console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
              } else if (error.code === -32003) {
                /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
                console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
              } else if (error.code === -32603) {
                /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
              } else {
                /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
                console.log("არ დადასტურდა");
              }
            })
            .then((receipt) => {
              if (receipt.status === true) {
                console.log("თქვენი ტრანზაქცია დადასტურდა!");
              } else {
                console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
              }
            });
        }

        if (autoWithdrawAndSellInPublic === true) {
          //  ეგრევე გატანა და გაყიდვა პაბლიკიდან
          console.log("ეგრევე გატანა და გაყიდვა პაბლიკიდან");
          autoSell();
        }

        if (autoWithdrawInPrivate === true) {
          clearInterval(botTimer);
          await offeringTokenIFOPoolContract.methods
            .harvestPool(0)
            .send({ from: account })
            .once("transactionHash", (hash) => {
              console.log(`თქვენი ტრანზაქცია მუშავდება: ${hash}`);
            })
            .on("error", (error) => {
              console.log("Error: ", error);
              if (error.code === 4001) {
                /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
                console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
              } else if (error.code === -32003) {
                /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
                console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
              } else if (error.code === -32603) {
                /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
              } else {
                /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
                console.log("არ დადასტურდა");
              }
            })
            .then((receipt) => {
              if (receipt.status === true) {
                console.log("თქვენი ტრანზაქცია დადასტურდა!");
              } else {
                console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
              }
            });
        }

        if (autoWithdrawAndSellInPrivate === true) {
          //  ეგრევე გატანა და გაყიდვა პრივატედან
          console.log("ეგრევე გატანა და გაყიდვა პრივატედან");
        }
      }

      if (bn > ifo.startBlock && bn < ifo.endBlock) {
        if (autoDepositInPublic === true) {
          //  ეგრევე შეტანა პაბლიკში
          console.log("ეგრევე შეტანა პაბლიკში");
        }

        if (autoDepositInPrivate === true) {
          //  ეგრევე შეტანა პრივატეში
          console.log("ეგრევე შეტანა პრივატეში");
        }
      }
    }, 3000);
  }

  function checkBoxState(e) {
    console.log(e.target.id);
    console.log("Changed!");
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      AutoFunction();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      <SuiBox p={0}>
        <SuiBox display="flex" justifyContent="left" alignItems="center" mb={1} lineHeight={1}>
          <SuiBox ml={2} mr={1}>
            <Checkbox id="autoDepositInPublic" onChange={(e) => checkBoxState(e)} />
          </SuiBox>
          <SuiTypography variant="button" fontWeight="bold" color="text">
            რომ დაიწყება შემატანინე (PUBLIC SALE)
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" justifyContent="left" alignItems="center" mb={1} lineHeight={1}>
          <SuiBox ml={2} mr={1}>
            <Checkbox id="autoWithdrawInPublic" onChange={(e) => checkBoxState(e)} />
          </SuiBox>
          <SuiTypography variant="button" fontWeight="bold" color="text">
            რომ მორჩება გამომატანინე (PUBLIC SALE)
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" justifyContent="left" alignItems="center" mb={1} lineHeight={1}>
          <SuiBox ml={2} mr={1}>
            <Checkbox id="autoWithdrawAndSellInPublic" onChange={(e) => checkBoxState(e)} />
          </SuiBox>
          <SuiTypography variant="button" fontWeight="bold" color="text">
            რომ მორჩება გამომატანინე და გამაყიდინე (PUBLIC SALE)
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" justifyContent="left" alignItems="center" mb={1} lineHeight={1}>
          <SuiBox ml={2} mr={1}>
            <Checkbox id="autoDepositInPrivate" onChange={(e) => checkBoxState(e)} />
          </SuiBox>
          <SuiTypography variant="button" fontWeight="bold" color="text">
            რომ დაიწყება შემატანინე (PRIVATE SALE)
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" justifyContent="left" alignItems="center" mb={1} lineHeight={1}>
          <SuiBox ml={2} mr={1}>
            <Checkbox id="autoWithdrawInPrivate" onChange={(e) => checkBoxState(e)} />
          </SuiBox>
          <SuiTypography variant="button" fontWeight="bold" color="text">
            რომ მორჩება გამომატანინე (PRIVATE SALE)
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" justifyContent="left" alignItems="center" mb={1} lineHeight={1}>
          <SuiBox ml={2} mr={1}>
            <Checkbox id="autoWithdrawAndSellInPrivate" onChange={(e) => checkBoxState(e)} />
          </SuiBox>
          <SuiTypography variant="button" fontWeight="bold" color="text">
            რომ მორჩება გამომატანინე და გამაყიდინე (PRIVATE SALE)
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

export default Overview;
