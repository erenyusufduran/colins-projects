const express = require("express");
const { cronMethod } = require("./src/scheduler");
const {
  addToDb,
  initGovernement,
  chooseModerators,
  updateChoosedModerator,
} = require("./src/scheduler/jobs/moderators");
const PORT = process.env.PORT || 3000;
const app = express();
require("./src/db/mongodb");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    // cronMethod.start();
    await addToDb();
    const governement = await initGovernement();
    const sprintCount = governement.sprintCount;
    const choosedMods = await chooseModerators(governement);
    if (choosedMods) {
      await updateChoosedModerator(choosedMods, sprintCount);
      res.send(choosedMods);
    } else {
      res.send("This week current mods will continue.");
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
