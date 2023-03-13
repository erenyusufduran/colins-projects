const cron = require("node-cron");
const { addToDb, initGovernement } = require("../db/loaders");
const { chooseModerators, updateChoosedModerator } = require("./jobs/moderators");

const cronMethod = cron.schedule("45 7 * * 1", async () => {
  await addToDb();
  const governement = await initGovernement();
  const sprintCount = governement.sprintCount;
  const choosedMods = await chooseModerators(governement);
  if (choosedMods) {
    await updateChoosedModerator(choosedMods, sprintCount);
  }
});

module.exports = { cronMethod };
