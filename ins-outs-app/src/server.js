const XLSX = require("xlsx");
const workbook = XLSX.readFile("data/paymaster.xlsx");

let worksheet = workbook.Sheets[workbook.SheetNames[0]];

for (let i = 2; i < 241; i++) {
  const data = worksheet[`A${i}`].v;
  const category = worksheet[`B${i}`].v;
  const parentCategory = worksheet[`C${i}`]?.v;
  const account = worksheet[`D${i}`].v;
  const sum = worksheet[`F${i}`].v;
  const type = worksheet[`H${i}`].v;
  const tag = worksheet[`J${i}`]?.v;
  const commentText = worksheet[`K${i}`]?.v;

  console.log({ data, category, parentCategory, account, sum, type, tag, commentText });
}

const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
