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

const getNumber = async () => {
  const contract = useContract();
  const number = await contract.getNumber();
  return number;
};

const increment = async (address) => {
  const contract = useContract();
  await contract.increment(address);
  console.log("Incremented");
};

const decrement = async (address) => {
  const contract = useContract();
  await contract.decrement(address);
  console.log("Decremented");
};

const incrementBy = async (address, number) => {
  const contract = useContract();
  await contract.incrementBy(address, number);
  console.log(`Incremented with ${number}`);
};

module.exports = { useProvider, useWallet, useContract, getNumber, increment, decrement, incrementBy };
