import express from "express";
import { json } from "body-parser";
import { userRouter } from "./routes";

const app = express();

app.use(json());
app.use("/users", userRouter);

// app.post("/", async (req, res) => {
//   try {
//     const trade = await TradeModel.build({
//       date: new Date("07/11/2023"),
//       pair: "BTC/USDT",
//       timeframe: TimeframeOptions.M3,
//       shortLong: true,
//       entry: 35000,
//       tp: 40000,
//       sl: 34000,
//       size: 2,
//     });
//     const user = await UserModel.build({
//       username: "e87r45e65",
//       email: "ere54yd@gmail.com",
//       password: "qweqsdfasdf",
//       age: 18,
//     });
//     res.send({ trade, user });
//   } catch (error) {
//     res.send((error as Error).message);
//   }
// });

export default app;
