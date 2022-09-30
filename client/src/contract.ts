import { Contract } from '@ethersproject/contracts'
import KCoin from "./contracts/kcoin.sol/KCoin.json";
import NFT from "./contracts/nft.sol/NFT.json";
import NFTLand from "./contracts/nftland.sol/NFTLand.json";

const CoinToken = new Contract(
  import.meta.env.VITE_TOKEN_ADDRESS,
  KCoin.abi
);

const NFTToken = new Contract(
  import.meta.env.VITE_NFT_ADDRESS,
  NFT.abi
);

const NFTLandToken = new Contract(
  import.meta.env.VITE_NFT_LAND_ADDRESS,
  NFTLand.abi
);

export {CoinToken, NFTToken, NFTLandToken}
