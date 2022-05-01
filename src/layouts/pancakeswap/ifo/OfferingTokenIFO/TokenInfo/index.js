import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
/* import Grid from "@mui/material/Grid"; */
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import Link from "@mui/material/Link";
import SuiTypography from "components/SuiTypography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import SuiButton from "components/SuiButton";
import { getBep20TokenContract } from "utils/PancakeSwapHelpers/contractHelpers";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { BSCScanLogo } from "layouts/pancakeswap/profile/components/Logos";
import { contract } from "config/PancakeSwap/constants/contracts";
import { ifo } from "config/PancakeSwap/constants/ifo";

function Overview() {
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [isApproved, setIsApproved] = useState();
  const tokenContract = getBep20TokenContract(ifo.address);
  async function checkApprove() {
    const approvalCheck = await tokenContract.methods.allowance(account, contract.router.contractAddress).call();
    if (approvalCheck > 0) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }

  async function handleApprove() {
    await tokenContract.methods.approve(contract.router.contractAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: account });
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      checkApprove();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [active, account]);

  return (
    <SuiBox py={0}>
      <Card className="h-100">
        <Stack mt={2} direction="row" spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar alt="Remy Sharp" src={ifo.tokenLogo} sx={{ width: 26, height: 26 }} />
          <SuiTypography fontSize="16px">
            {ifo.name} ({ifo.symbol})
          </SuiTypography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={ifo.website} target="_blank" underline="none" color="#00acee">
            <LanguageIcon />
          </Link>
          <Link href={ifo.twitterUrl} target="_blank" underline="none" color="#00acee">
            <TwitterIcon />
          </Link>
          <Link href={ifo.telegramUrl} target="_blank" underline="none" color="#00acee">
            <TelegramIcon />
          </Link>
          <Link href={`https://bscscan.com/address/${ifo.address}`} target="_blank" underline="none" color="#00acee">
            <BSCScanLogo width="19px" />
          </Link>
        </Stack>
        <SuiTypography px={2} sx={{ fontSize: 14 }}>
          {ifo.description}
        </SuiTypography>
        <Stack px={2} mb={2} mt={1} spacing={1}>
          {active === true && chainId === 56 ? (
            <SuiBox>
              {isApproved ? (
                <SuiButton disabled fullWidth color="secondary">
                  Approve ვაჭრობისთვის
                </SuiButton>
              ) : (
                <SuiButton onClick={() => handleApprove()} color="primary" size="small">
                  Approve ვაჭრობისთვის
                </SuiButton>
              )}
            </SuiBox>
          ) : null}
          {/* <SuiButton size="small" href={`https://bscscan.com/address/${ifo.address}`} target="_blank" color="primary">
            ნახე BSCScan-ზე
          </SuiButton> */}
        </Stack>
      </Card>
    </SuiBox>
  );
}

export default Overview;
