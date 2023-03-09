const express = require("express");
const { cronMethod } = require("./scheduler");
const { addToDb, initGovernement, chooseModerators, updateChoosedModerator } = require("./scheduler/jobs/moderators");
const PORT = process.env.PORT || 3000;
const app = express();
require("./db/mongodb");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    // cronMethod.start();
    await addToDb();
    const governement = await initGovernement();
    const sprintCount = governement.sprintCount;
    const choosedMods = await chooseModerators(governement);
    if (choosedMods) await updateChoosedModerator(choosedMods, sprintCount);
    res.send(choosedMods);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
