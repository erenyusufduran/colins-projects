import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { todoRouter } from "./routes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use(todoRouter);

mongoose.connect("mongodb://localhost:27017/todo");

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
