const { contractAddress, abi } = require("../constants");
const ethers = require("ethers");

const useProvider = () => {
  const provider = new ethers.AlchemyProvider(5, process.env.ALCHEMY_API_KEY);
  return provider;
};

const useWallet = () => {
  const provider = useProvider();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  return wallet;
};

const useContract = () => {
  const wallet = useWallet();
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  return contract;
};

module.exports = { useContract };
