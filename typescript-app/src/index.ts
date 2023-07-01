import express from "express";
import "./db/mongoose";
import { json } from "body-parser";
import { todoRouter } from "./routes";

const app = express();

app.use(json());
app.use(todoRouter);

export default app;
