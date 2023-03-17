const cron = require("node-cron");
const { addToDb, initManagement } = require("../db/loaders/migrations");
const { chooseSupporters, updateChoosedSupporter } = require("./jobs/chooseSupporters");

// every week on mondays at 7:45 AM
const cronMethod = cron.schedule("45 7 * * 1", async () => {
  await addToDb();
  const management = await initManagement();
  const sprintCount = management.sprintCount;
  const choosedSupporters = await chooseSupporters(management);
  if (choosedSupporters) {
    await updateChoosedSupporter(choosedSupporters, sprintCount);
  }
});

module.exports = { cronMethod };
