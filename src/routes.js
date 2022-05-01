import Dashboard from "layouts/dashboard";
import Apps from "layouts/apps";
import Networks from "layouts/networks";
import BotsAndGroups from "layouts/botsandgroups";
import CardanoWallet from "layouts/cardano/wallet";
import PCSNameChecker from "layouts/pancakeswap/namechecker";
import PCSProfile from "layouts/pancakeswap/profile";
import PCSIfo from "layouts/pancakeswap/ifo";
import PCSSquad from "layouts/pancakeswap/PancakeSquad";
import Staking from "layouts/staking";
import Farming from "layouts/farming";
/* import DappStore from "layouts/DappStore"; */

// Soft UI Dashboard React icons
import PCSLogo from "examples/Icons/PCSLogo";
import CardanoLogo from "examples/Icons/CardanoLogo";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SavingsIcon from "@mui/icons-material/Savings";
import AgricultureIcon from "@mui/icons-material/Agriculture";
/* import StorefrontIcon from "@mui/icons-material/Storefront"; */

const routes = [
  {
    type: "uncollapseble",
    name: "მთავარი",
    key: "dashboard",
    route: "/dashboard",
    icon: <HomeRoundedIcon />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "uncollapseble",
    name: "Staking",
    key: "staking",
    route: "/staking",
    icon: <SavingsIcon />,
    component: Staking,
    noCollapse: true,
  },
  {
    type: "uncollapseble",
    name: "Farming",
    key: "farming",
    route: "/farming",
    icon: <AgricultureIcon />,
    component: Farming,
    noCollapse: true,
  },
  {
    type: "collapseble",
    name: "PancakeSwap",
    key: "pancakeswap",
    icon: <PCSLogo size="18px" color="white" />,
    collapse: [
      {
        name: "IFO",
        key: "ifo",
        route: "/pancakeswap/ifo",
        component: PCSIfo,
      },
      {
        name: "PancakeSquad",
        key: "squad",
        route: "/pancakeswap/squad",
        component: PCSSquad,
      },
      {
        name: "პროფილი",
        key: "profile",
        route: "/pancakeswap/profile",
        component: PCSProfile,
      },
      {
        name: "სახელის შემოწმება",
        key: "name",
        route: "/pancakeswap/name",
        component: PCSNameChecker,
      },
    ],
  },
  {
    type: "collapseble",
    name: "Cardano",
    key: "cardano",
    icon: <CardanoLogo size="18px" />,
    collapse: [
      {
        name: "საფულის შემოწმება",
        key: "wallet",
        route: "/cardano/wallet",
        component: CardanoWallet,
      },
    ],
  },
  { type: "title", title: "სხვა", key: "account-pages" },
  /* {
    type: "uncollapseble",
    name: "DappStore",
    key: "dappstore",
    route: "/dappstore",
    icon: <StorefrontIcon />,
    component: DappStore,
    noCollapse: true,
  }, */
  {
    type: "uncollapseble",
    name: "ქსელები",
    key: "networks",
    route: "/networks",
    icon: <LinkRoundedIcon />,
    component: Networks,
    noCollapse: true,
  },
  {
    type: "uncollapseble",
    name: "აპლიკაციები",
    key: "apps",
    route: "/apps",
    icon: <AppsRoundedIcon />,
    component: Apps,
    noCollapse: true,
  },
  {
    type: "uncollapseble",
    name: "Bots & Groups",
    key: "groups",
    route: "/groups",
    icon: <PeopleRoundedIcon />,
    component: BotsAndGroups,
    noCollapse: true,
  },
];

export default routes;
