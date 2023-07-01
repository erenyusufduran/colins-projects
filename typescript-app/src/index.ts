import express from "express";
import "./db/mongoose";
import { json } from "body-parser";
import { todoRouter } from "./routes";
import { userRouter } from "./routes";

const app = express();

app.use(json());
app.use("/api", userRouter);
app.use("/api", todoRouter);

export default app;
