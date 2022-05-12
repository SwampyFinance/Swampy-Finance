import Web3 from "web3";
import { getRpc } from "./getRpc";
import { abi } from "./abi";


const RPC_URL = getRpc();
const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
const getWeb3 = (provider = httpProvider) => {
  const web3 = new Web3(provider);
  return web3;
};

const getContractW3 = (provider = httpProvider) => {
  const address = "0xCf1202629d6d4D11fE72ED4615e6348C2403F73d";
  const web3 = getWeb3(provider);
  return new web3.eth.Contract(abi, address);
}

export { getWeb3, httpProvider, getContractW3 };
