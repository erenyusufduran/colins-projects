const cron = require("node-cron");

const cronMethod = cron.schedule("45 7 * * 1", () => {
  console.log(new Date());
});

module.exports = { cronMethod };
