const Supporter = require("../../db/models/supporter");
const { sendSupporterMail } = require("./sendSupportMail");

// chooseSupporters takes an argument, its management model
// and returns choosed supporters.
const chooseSupporters = async (management) => {
  const supporters = await Supporter.find({});

  // This expression is looking for if every sups is selected, and if we are in skip week,
  // update every mod's isChoosable --> true
  if (management.sprintCount % Math.floor(supporters.length / 2) === 0 && !management.skipWeek) {
    const mods = Supporter.find({});
    await Supporter.updateMany(mods, { $set: { isChoosable: true } });
  }
  // if we are in skipWeek, skipWeek will be false.
  if (management.skipWeek) {
    management.skipWeek = !management.skipWeek;
    await management.save();
  } else {
    // if we are not in skipWeek, we are delivering two sup from mongo.
    // first match is controls for selectedSprint is not last sprint.
    // second match is controls isChoosable is true.
    // with sample give me two mods.
    const choosedSupporters = await Supporter.aggregate([
      {
        $match: { $expr: { $lt: ["$selectedSprint", management.sprintCount - 1] } },
      },
      { $match: { isChoosable: true } },
      { $sample: { size: 2 } },
    ]);
    management.sprintCount++;
    management.skipWeek = !management.skipWeek;
    await management.save();
    return choosedSupporters;
  }
};

// updateChoosedSupporters takes 2 argument one of them an array it includes 2 sup, second one is current sprint number
// we are updating choosed mod's isChoosable to false, and selectedSprint to this sprint.
// and sending mail who will be the supporters?
const updateChoosedSupporter = async (choosedSupporters, sprint) => {
  await Supporter.updateOne(choosedSupporters[0], [
    { $set: { isChoosable: false } },
    { $set: { selectedSprint: sprint } },
  ]);
  await Supporter.updateOne(choosedSupporters[1], [
    { $set: { isChoosable: false } },
    { $set: { selectedSprint: sprint } },
  ]);
  await sendSupporterMail(sprint, choosedSupporters[0], choosedSupporters[1]);
};

module.exports = { chooseSupporters, updateChoosedSupporter };
