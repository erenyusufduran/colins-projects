import { Schema } from "mongoose";
import { TimeframeOptions } from "./trades.types";
import { build } from "./trades.statics";

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
});

TradeSchema.statics.build = build;

export default TradeSchema;
