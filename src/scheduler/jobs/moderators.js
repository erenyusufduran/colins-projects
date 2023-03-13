const Moderator = require("../../models/Moderator");
const { sendModeratorEmail } = require("./mails");

// chooseModerators takes an argument, its governement model
// and returns choosed moderators.
const chooseModerators = async (governement) => {
  const moderators = await Moderator.find({});

  // This expression is looking for if every mods is selected, and if we are in skip week,
  // update every mod's isChoosable --> true
  if (governement.sprintCount % Math.floor(moderators.length / 2) === 0 && !governement.skipWeek) {
    const mods = Moderator.find({});
    await Moderator.updateMany(mods, { $set: { isChoosable: true } });
  }
  // if we are in skipWeek, skipWeek will be false.
  if (governement.skipWeek) {
    governement.skipWeek = !governement.skipWeek;
    await governement.save();
  } else {
    // if we are not in skipWeek, we are delivering two mod from mongo.
    // first match is controls for selectedSprint is not last sprint.
    // second match is controls isChoosable is true.
    // with sample give me two mods.
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

// updateChoosedModerator takes 2 argument one of them an array it includes 2 mod, second one is current sprint number
// we are updating choosed mod's isChoosable to false, and selectedSprint to this sprint.
// and sending mail who will be the moderators?
const updateChoosedModerator = async (choosedMods, sprint) => {
  await Moderator.updateOne(choosedMods[0], [{ $set: { isChoosable: false } }, { $set: { selectedSprint: sprint } }]);
  await Moderator.updateOne(choosedMods[1], [{ $set: { isChoosable: false } }, { $set: { selectedSprint: sprint } }]);
  await sendModeratorEmail(choosedMods[0], choosedMods[1]);
};

module.exports = { chooseModerators, updateChoosedModerator };
