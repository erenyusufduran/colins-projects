const { useContract } = require("../controllers");
const Number = require("../db/models/Number");

class Service {
  constructor(contract) {
    this.contract = contract;
  }
}

const contract = useContract();
const service = new Service(contract);

service.contract.on("numberUpdated", async (address, number) => {
  await Number.create({ address, number: number.toString() });
});
