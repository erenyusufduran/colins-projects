import { Schema } from "mongoose";
import { TimeframeOptions } from "./trades.types";
import { build } from "./trades.statics";
import { calculateProfit, calculateR, modifier } from "./trades.helper";

const TradeSchema = new Schema({
  date: Date,
  pair: String,
  timeframe: {
    type: String,
    enum: Object.values(TimeframeOptions),
  },
  shortLong: {
    type: Boolean,
    default: true,
    required: true,
  },
  entry: {
    type: Number,
    required: true,
  },
  tp: {
    type: Number,
  },
  sl: {
    type: Number,
  },
  size: {
    type: Number,
  },
  r: {
    type: Number,
    validate(val: number) {
      return val.toFixed(2);
    },
  },
  profit: {
    type: Number,
  },
  wl: {
    type: Boolean,
  },
  link: {
    type: String,
  },
  reasons: {
    type: String,
  },
  results: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

TradeSchema.statics.build = build;

TradeSchema.pre("save", async function (next) {
  const trade = this;
  const { shortLong, tp, sl, entry, wl, size } = trade;
  if (tp && sl) {
    modifier({ shortLong, tp, sl, entry });
    if (!(wl === undefined)) {
      this.r = calculateR({ entry, tp, sl, wl });
      if (size) {
        this.profit = calculateProfit({ entry, tp, sl, size, wl });
      }
    }
  }
  next();
});

export default TradeSchema;
