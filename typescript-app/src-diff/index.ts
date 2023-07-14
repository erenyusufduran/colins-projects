import express from "express";
import { json } from "body-parser";
import { TradeModel } from "./database/models/trades/trades.model";
import { TimeframeOptions } from "./database/models/trades/trades.types";

const app = express();

app.use(json());

app.post("/", async (req, res) => {
  const trade = await TradeModel.build({
    date: new Date("07/11/2023"),
    pair: "BTC/USDT",
    timeframe: TimeframeOptions.M3,
    shortLong: true,
    entry: 35000,
    tp: 40000,
    sl: 34000,
    size: 2,
  });
  res.send(trade);
});

export default app;
