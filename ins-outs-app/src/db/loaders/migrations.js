const xlsx = require("xlsx");
const Transaction = require("../models/transactions");

const wb = xlsx.readFile("./data/paymaster.xlsx", { cellDates: true });

const transactionsToDB = async () => {
  const ws = wb.Sheets["Transactions"];
  const data = xlsx.utils.sheet_to_json(ws);
  data.map(async (rec) => {
    const strDate = rec.Date;
    const dateArr = strDate.split("/");
    const date = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);

    await Transaction.create({
      date,
      category: rec.Category,
      parentCategory: rec["Parent category"],
      type: rec.Type.toLowerCase(),
      tag: rec.Tag,
      sum: parseInt(rec.Sum),
      commentText: rec["Comment text"],
    });
  });
  return true;
};

module.exports = {
  transactionsToDB,
};
