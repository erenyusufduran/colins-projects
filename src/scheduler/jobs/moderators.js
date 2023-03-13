const Moderator = require("../../models/Moderator");
const { sendModeratorEmail } = require("./mails");

const chooseModerators = async (governement) => {
  const moderators = await Moderator.find({});

  if (governement.sprintCount % Math.floor(moderators.length / 2) === 0 && !governement.skipWeek) {
    const mods = Moderator.find({});
    await Moderator.updateMany(mods, { $set: { isChoosable: true } });
  }
  if (governement.skipWeek) {
    governement.skipWeek = !governement.skipWeek;
    await governement.save();
  } else {
    const choosedMods = await Moderator.aggregate([
      {
        $match: { $expr: { $lt: ["$selectedSprint", governement.sprintCount - 1] } },
      },
      { $match: { isChoosable: true } },
      { $sample: { size: 2 } },
    ]);
    governement.sprintCount++;
    governement.skipWeek = !governement.skipWeek;
    await governement.save();
    return choosedMods;
  }
};

const updateChoosedModerator = async (choosedMods, sprint) => {
  await Moderator.updateOne(choosedMods[0], [{ $set: { isChoosable: false } }, { $set: { selectedSprint: sprint } }]);
  await Moderator.updateOne(choosedMods[1], [{ $set: { isChoosable: false } }, { $set: { selectedSprint: sprint } }]);
  await sendModeratorEmail(choosedMods[0], choosedMods[1]);
};

module.exports = { chooseModerators, updateChoosedModerator };
