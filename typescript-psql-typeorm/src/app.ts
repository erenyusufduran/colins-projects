import express from "express";
import { loadDB } from "./db/dbConfig";
import { clientRouter, bankerRouter } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

loadDB();

app.use(express.json());
app.use("/api/client", clientRouter);
app.use("/api/banker", bankerRouter);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
