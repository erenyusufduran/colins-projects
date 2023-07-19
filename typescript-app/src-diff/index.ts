import express from "express";
import { json } from "body-parser";
import { tradeRouter, userRouter } from "./routes";

const app = express();

app.use(json());
app.use("/api/users", userRouter);
app.use("/api/trades", tradeRouter);

export default app;
