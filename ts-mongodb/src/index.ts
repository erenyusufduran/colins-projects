import express from "express";
import { connectDatabase } from "./services/database.service";
import { gamesRouter } from "./routes/game";
import { usersRouter } from "./routes/user";

const app = express();
const PORT = 3000;

connectDatabase()
  .then(() => {
    app.use("/games", gamesRouter);
    app.use("/users", usersRouter);
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
  });


