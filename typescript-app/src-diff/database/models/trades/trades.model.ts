import { model } from "mongoose";
import { ITradeDocument, ITradeModel } from "./trades.types";
import TradeSchema from "./trades.schema";

export const TradeModel = model<ITradeDocument, ITradeModel>("trade", TradeSchema);
