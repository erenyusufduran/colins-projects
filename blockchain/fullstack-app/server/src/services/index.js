const { useContract } = require("../hooks");
const Number = require("../db/models/Number");

class ListenerService {
  constructor(contract) {
    this.contract = contract;
  }
}

const contract = useContract();
const service = new ListenerService(contract);

service.contract.on("numberUpdated", async (address, number) => {
  await Number.create({ address, number: number.toString() });
});
