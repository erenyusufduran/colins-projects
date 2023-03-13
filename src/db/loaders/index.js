const Moderator = require("../../models/Moderator");
const Governement = require("../../models/Governement");
const { moderators } = require("../../utils/moderators");

// adds current moderators to db, and returns moderators from db.
const addToDb = async () => {
  const databaseModerators = await Moderator.find({});
  if (databaseModerators.length === 0) {
    await Moderator.insertMany(moderators);
  }
  return await Moderator.find({});
};

// adds governement for management
const initGovernement = async () => {
  let governement = await Governement.findOne({});
  if (!governement) {
    governement = new Governement({ skipWeek: false, sprintCount: 0 });
    await governement.save();
  }
  return governement;
};

module.exports = { addToDb, initGovernement };
