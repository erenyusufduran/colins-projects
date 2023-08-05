require("dotenv").config();
const { connectMongo } = require("./db/mongoose");
const ethers = require("ethers");
const { contractAddress, abi } = require("./constants");
const Number = require("./db/models/Number");

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

async function main() {
  await incrementBy("0x333A2399f8b7d898d8F20F53AD725455F679845D", 500);
  const number = await getNumber();
  console.log(number.toString());
  await connectMongo();
  const contract = useContract();
  contract.on("numberUpdated", async (address, number) => {
    await Number.insert({ address, number: number.toString() });
  });
}

main()
  .then()
  .catch((e) => console.log(e));
