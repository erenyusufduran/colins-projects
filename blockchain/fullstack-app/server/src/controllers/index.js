const { useContract } = require("../hooks");

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

module.exports = { getNumber, increment, decrement, incrementBy };
