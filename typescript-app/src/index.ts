import express from "express";
import "./db/mongoose";
import { json } from "body-parser";
import { todoRouter } from "./routes";
import { userRouter } from "./routes";

const app = express();

app.use(json());
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

export default app;
