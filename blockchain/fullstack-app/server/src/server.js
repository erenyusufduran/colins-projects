require("dotenv").config();
const ethers = require("ethers");
const { contractAddress, abi } = require("./constants");

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

const increment = async () => {
  const contract = useContract();
  await contract.increment();
  console.log("Incremented");
};

const decrement = async () => {
  const contract = useContract();
  await contract.decrement();
  console.log("Decremented");
};

const incrementBy = async (number) => {
  const contract = useContract();
  await contract.incrementBy(number);
  console.log(`Incremented with ${number}`);
};

async function main() {
  await incrementBy(500);
  const number = await getNumber();
  console.log(number.toString());

  const contract = useContract();
  contract.on("numberUpdated", (event) => {
    console.log(event.toString());
  });
}

main()
  .then()
  .catch((e) => console.log(e));
