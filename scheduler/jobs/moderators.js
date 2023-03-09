const Moderator = require("../../models/Moderator");
const Governement = require("../../models/Governement");
const { moderators } = require("../../utils/moderators");

const addToDb = async () => {
  const databaseModerators = await Moderator.find({});
  if (databaseModerators.length === 0) {
    await Moderator.insertMany(moderators);
  }
  return await Moderator.find({});
};

const initGovernement = async () => {
  let governement = await Governement.findOne({});
  if (!governement) {
    governement = new Governement({ skipWeek: false, sprintCount: 0, selectedSprint: null });
    await governement.save();
  }
  return governement;
};

const chooseModerators = async (governement) => {
  if (governement.sprintCount % 4 === 0 && !governement.skipWeek) {
    const mods = Moderator.find({});
    await Moderator.updateMany(mods, { $set: { isChoosable: true } });
  }
  if (governement.skipWeek) {
    governement.skipWeek = !governement.skipWeek;
    await governement.save();
  } else {
    governement.sprintCount++;
    governement.skipWeek = !governement.skipWeek;
    await governement.save();
    return await Moderator.aggregate([{ $match: { isChoosable: true } }, { $sample: { size: 2 } }]);
  }
};

const updateChoosedModerator = async (choosedMods, sprint) => {
  await Moderator.updateOne(choosedMods[0], [{ $set: { isChoosable: false } }, { $set: { selectedSprint: sprint } }]);
  await Moderator.updateOne(choosedMods[1], [{ $set: { isChoosable: false } }, { $set: { selectedSprint: sprint } }]);
};

module.exports = { addToDb, initGovernement, chooseModerators, updateChoosedModerator };
