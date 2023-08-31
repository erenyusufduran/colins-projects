require("dotenv").config();
require("./db/loaders/mongoose");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.router");

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRouter);

app.listen(PORT, () => console.log("Server is listening on PORT 4000"));
