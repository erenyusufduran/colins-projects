const Supporter = require("../models/supporter");
const Management = require("../models/management");
const { supporters } = require("../../constants/supporters");

// adds current supporters to db, and returns supporters from db.
const addToDb = async () => {
  const databaseSupporters = await Supporter.find({});
  if (databaseSupporters.length === 0) {
    await Supporter.insertMany(supporters);
  }
  return await Supporter.find({});
};

// adds management collection
const initManagement = async () => {
  let management = await Management.findOne({});
  if (!management) {
    management = new Management({ skipWeek: false, sprintCount: 0 });
    await management.save();
  }
  return management;
};

module.exports = { addToDb, initManagement };
