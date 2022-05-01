import { useState, useEffect, useRef } from "react";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import { getBSWContract } from "utils/BiSwapHelpers/cotractHelpers";
import { contract } from "config/BiSwap/constants/contracts";
import Grid from "@mui/material/Grid";
import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "components/ConnectWalletButton";
import ChangeNetworkButton from "components/ChangeNetworkButton";
import WithdrawButton from "./WithdrawButton";
import DepositButton from "./DepositButton";

function ApproveButton() {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React();
  const [approved, setApproved] = useState(false);
  const BSWContract = getBSWContract(chainId);

  async function checkApprove() {
    const isApproved = await BSWContract.methods.allowance(account, contract.masterChef.contractAddress).call();
    if (Number(isApproved) > 0) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  }

  // Toast-ის დამატება
  async function approveContract() {
    await BSWContract.methods
      .approve(contract.masterChef.contractAddress, "115792089237316195423570985008687907853269984665640564039456726971375468411753")
      .send({ from: account })
      .once("sending", (payload) => {
        console.log(payload);
        console.log("Sending...");
      })
      .once("transactionHash", (hash) => {
        console.log(hash);
        console.log("Transactions Hash...");
      })
      .on("error", (error) => {
        console.log("ERROR", error);
      })
      .then((receipt) => {
        console.log(receipt);
        if (receipt.status === true) {
          console.log("დადასტურდა");
        } else {
          console.log("არ დადასტურდა");
        }
      });
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      checkApprove();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active]);

  return (
    <SuiBox>
      {active === true ? (
        <SuiBox>
          {chainId === 56 ? (
            <SuiBox>
              {approved === true ? (
                <SuiBox sx={{ display: "flex", justifyContent: "center" }} mt={1}>
                  <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item>
                      <WithdrawButton />
                    </Grid>
                    <Grid item>
                      <DepositButton />
                    </Grid>
                  </Grid>
                </SuiBox>
              ) : (
                <SuiBox mt={1} sx={{ display: "flex", justifyContent: "center" }}>
                  <SuiButton onClick={() => approveContract()} variant="gradient" color="primary">
                    Enable
                  </SuiButton>
                </SuiBox>
              )}
            </SuiBox>
          ) : (
            <SuiBox sx={{ display: "flex", justifyContent: "center" }}>
              <ChangeNetworkButton changeTo="BSC" />
            </SuiBox>
          )}
        </SuiBox>
      ) : (
        <SuiBox sx={{ display: "flex", justifyContent: "right" }}>
          <ConnectWalletButton loginText="საფულის დაკავშირება" />
        </SuiBox>
      )}
    </SuiBox>
  );
}

export default ApproveButton;
