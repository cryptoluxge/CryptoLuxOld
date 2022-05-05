const pools = [
  {
    id: "gal_pool",
    symbol: "GAL",
    name: "Galaxy ECO",
    tokenContractAddress: "0xe4Cc45Bb5DBDA06dB6183E8bf016569f40497Aa5",
    poolContractAddress: "0xa5D57C5dca083a7051797920c78fb2b19564176B",
    website: "https://galaxy.eco/",
    twitter: "https://twitter.com/ProjectGalaxyHQ",
    telegram: "https://t.me/ProjectGalaxyHQ",
    startBlock: 17538945,
    endBlock: 19266945,
    rewardPerBlock: 0.09645,
    decimals: 18,
  },
  {
    id: "rpg_pool",
    symbol: "RPG",
    name: "Rangers Protocol",
    tokenContractAddress: "0xc2098a8938119A52B1F7661893c0153A6CB116d5",
    poolContractAddress: "0xD1c395BCdC2d64ac6544A34A36185483B00530a1",
    website: "https://rangersprotocol.com/",
    twitter: "https://twitter.com/rangersprotocol",
    telegram: "https://twitter.com/rangersprotocol",
    startBlock: 17366040,
    endBlock: 18230040,
    rewardPerBlock: 0.06794,
    decimals: 18,
  },
  {
    id: "ankr_pool",
    symbol: "ANKR",
    name: "ANKR",
    tokenContractAddress: "0xf307910A4c7bbc79691fD374889b36d8531B08e3",
    poolContractAddress: "0xc581345e1648CcE154978eA80bF8A584EC8aFDe0",
    website: "https://www.ankr.com/",
    twitter: "https://twitter.com/ankr",
    telegram: "https://t.me/ankrnetwork",
    startBlock: 17165700,
    endBlock: 18893700,
    rewardPerBlock: 4.6296,
    decimals: 18,
  },
  {
    id: "ceek_pool",
    symbol: "CEEK",
    name: "CEEK",
    tokenContractAddress: "0xe0F94Ac5462997D2BC57287Ac3a3aE4C31345D66",
    poolContractAddress: "0xED53944b1c0cEecDe1a413fDb4D0496e1a08ab58",
    website: "https://ceek.io",
    twitter: "https://twitter.com/CEEK",
    telegram: "https://t.me/ceekmetaverse",
    startBlock: 16936989,
    endBlock: 17800989,
    rewardPerBlock: 0.8078,
    decimals: 18,
  },
  {
    id: "tiny_pool",
    symbol: "TINC",
    name: "Tiny World",
    tokenContractAddress: "0x05aD6E30A855BE07AfA57e08a4f30d00810a402e",
    poolContractAddress: "0x9593462fF51A14633b243Ba3d054A8183d057A02",
    website: "https://tinyworlds.io/",
    twitter: "https://twitter.com/tinyworldgamefi",
    telegram: "https://t.me/tinyworld_en",
    startBlock: 16735880,
    endBlock: 17599880,
    rewardPerBlock: 0.4677,
    decimals: 18,
  },
  {
    id: "pear_pool",
    symbol: "PEX",
    name: "PearDAO",
    tokenContractAddress: "0x6a0b66710567b6beb81A71F7e9466450a91a384b",
    poolContractAddress: "0x641B1F2781B34a493E4308A0A3F1c7E042A9B952",
    website: "https://peardao.io/",
    twitter: "https://twitter.com/OfficialPearDAO",
    telegram: "https://t.me/peardaoen",
    startBlock: 16535470,
    endBlock: 17399470,
    rewardPerBlock: 0.3865,
    decimals: 18,
  },
  {
    id: "gmi_pool",
    symbol: "GMI",
    name: "GAMIFI",
    tokenContractAddress: "0x93D8d25E3C9A847a5Da79F79ecaC89461FEcA846",
    poolContractAddress: "0x0D53E0f2Eb384777442e4EB813d8f5fAcC742206",
    website: "https://gamifi.gg",
    twitter: "https://twitter.com/gamifigg",
    telegram: "https://t.me/GamiFiOfficial",
    startBlock: 16508095,
    endBlock: 17372095,
    rewardPerBlock: 17.939,
    decimals: 18,
  },
  {
    id: "froyo_pool",
    symbol: "FRO",
    name: "FROYO",
    tokenContractAddress: "0xe369fec23380f9F14ffD07a1DC4b7c1a9fdD81c9",
    poolContractAddress: "0x84e3208578eE7db397a3d584d97Fea107b15bF35",
    website: "https://froyo.games/",
    twitter: "https://twitter.com/realfroyogames",
    telegram: "https://t.me/froyogames",
    startBlock: 16364580,
    endBlock: 18092580,
    rewardPerBlock: 3.404,
    decimals: 18,
  },
  {
    id: "bsw_pool",
    symbol: "BSW",
    name: "Biswap",
    tokenContractAddress: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1",
    poolContractAddress: "0x7092e029E4ce660F9AC081BF6D8a339BE602398b",
    website: "https://biswap.org/",
    twitter: "https://twitter.com/Biswap_DEX",
    telegram: "https://t.me/biswap",
    startBlock: 16050085,
    endBlock: 17778085,
    rewardPerBlock: 1.157,
    decimals: 18,
  },
  {
    id: "duet_pool",
    symbol: "DUET",
    name: "Duet Protocol",
    tokenContractAddress: "0x95EE03e1e2C5c4877f9A298F1C0D6c98698FAB7B",
    poolContractAddress: "0xA581349F26dE887700045F9B7d148775d422fDA2",
    website: "https://duet.finance/",
    twitter: "https://twitter.com/duetprotocol",
    telegram: "https://t.me/duetprotocol",
    startBlock: 15962870,
    endBlock: 17690870,
    rewardPerBlock: 0.4861,
    decimals: 18,
  },
  {
    id: "gmt_pool",
    symbol: "GMT",
    name: "Green Metaverse Token",
    tokenContractAddress: "0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1",
    poolContractAddress: "0xe76a31cF974BA5819ce86cB4667a4bf05174bC59",
    website: "https://www.stepn.com/",
    twitter: "https://twitter.com/Stepnofficial",
    telegram: "https://t.me/STEPNofficial",
    startBlock: 15908220,
    endBlock: 17636220,
    rewardPerBlock: 4.629,
    decimals: 8,
  },
  /* {
    id: "xwg_pool",
    symbol: "XWG",
    name: "XWG",
    tokenContractAddress: "0x6b23C89196DeB721e6Fd9726E6C76E4810a464bc",
    poolContractAddress: "0x6e0272A70075f6782F6842730107E9ABf74C5CC7",
    website: "https://xwg.games/",
    twitter: "https://twitter.com/xwg_games",
    telegram: "https://t.me/xworldgames",
    startBlock: 15706160,
    endBlock: 17434160,
    rewardPerBlock: 5.106,
    decimals: 18,
  }, */
  /* {
    id: "high_pool",
    symbol: "HIGH",
    name: "HighStreet Token",
    tokenContractAddress: "0x5f4Bde007Dc06b867f86EBFE4802e34A1fFEEd63",
    poolContractAddress: "0x60c4998C058BaC8042712B54E7e43b892Ab0B0c4",
    website: "https://www.highstreet.market/",
    twitter: "https://twitter.com/highstreetworld",
    telegram: "https://t.me/highstreetworld",
    startBlock: 15563970,
    endBlock: 17291970,
    rewardPerBlock: 0.09756,
    decimals: 18,
  }, */
  /* {
    id: "thg_pool",
    symbol: "THG",
    name: "Thetan GEM",
    tokenContractAddress: "0x9fD87aEfe02441B123c3c32466cD9dB4c578618f",
    poolContractAddress: "0xD1D03A3D4C27884a8703Cdb78504737C9E9A159e",
    website: "https://thetanarena.com/",
    twitter: "https://twitter.com/ThetanArena",
    telegram: "https://t.me/thetanarenalinks",
    startBlock: 15363100,
    endBlock: 17091100,
    rewardPerBlock: 0.162,
    decimals: 18,
  }, */
  /* {
    id: "era_pool",
    symbol: "ERA",
    name: "ERA",
    tokenContractAddress: "0x6f9F0c4ad9Af7EbD61Ac5A1D4e0F2227F7B0E5f9",
    poolContractAddress: "0x260F95f5b7FD8eda720ED9d0829164dE35B048ab",
    website: "https://www.era7.io/",
    twitter: "https://twitter.com/Era7_official",
    telegram: "https://t.me/joinchat/aF3LUIC8PKVhNDA6",
    startBlock: 15363100,
    endBlock: 17088890,
    rewardPerBlock: 1.608,
    decimals: 18,
  }, */
  /* {
    id: "btt_pool",
    symbol: "BTT",
    name: "BitTorrent",
    tokenContractAddress: "0x352Cb5E19b12FC216548a2677bD0fce83BaE434B",
    poolContractAddress: "0x346a1b672C5Cbb6AE21715428f77A0049B29B332",
    website: "https://www.bittorrent.com/",
    twitter: "https://twitter.com/BitTorrent",
    telegram: "https://t.me/BTTBitTorrent",
    startBlock: 15189605,
    endBlock: 16917605,
    rewardPerBlock: 157829,
    decimals: 18,
  }, */
  /* {
    id: "fuse_pool",
    symbol: "FUSE",
    name: "FUSION PROTOCOL",
    tokenContractAddress: "0x5857c96DaE9cF8511B08Cb07f85753C472D36Ea3",
    poolContractAddress: "0xeAd7b8fc5F2E5672FAe9dCf14E902287F35CB169",
    website: "https://fuse.io/",
    twitter: "https://twitter.com/fuse_network",
    telegram: "https://t.me/fuseio",
    startBlock: 14558170,
    endBlock: 16286170,
    rewardPerBlock: 0.19,
    decimals: 18,
  }, */
];

export default pools;
