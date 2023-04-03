const Account = require("./src/db/models/accounts");
require("./src/db/loaders/mongoose");
async function main() {
  let account = await Account.findOne({ name: "eren" });

  console.log(account);
  if (account === null) {
    account = new Account({ name: "eren" });
    await account.save();
  }
}

main();
