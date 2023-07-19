import { ObjectId } from "mongoose";
import { TradeModel } from "./trades.model";
import { ITrade, ITradeDocument } from "./trades.types";

export async function build(_trade: ITrade, owner: ObjectId): Promise<ITradeDocument> {
  try {
    const trade = await TradeModel.create({ ..._trade, owner });
    await trade.save();
    return trade;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
