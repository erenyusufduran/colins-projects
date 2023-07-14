import express from "express";
import { loadDB } from "./db/dbConfig";
import { clientRouter } from "./routes/client";
import { bankerRouter } from "./routes/banker";

const app = express();
const PORT = process.env.PORT || 3000;

loadDB();

app.use(express.json());
app.use("/api", clientRouter);
app.use("/api", bankerRouter);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
