import { TradeModel } from "./trades.model";
import { ITrade, ITradeDocument } from "./trades.types";

function modifier(trade: ITrade) {
  if (trade.shortLong !== undefined) {
    if (trade.shortLong) {
      if (trade.tp && trade.sl) {
        if (trade.entry > trade.tp) throw new Error("TP must be greater than from entry point!");
        if (trade.entry < trade.sl) throw new Error("SL must be less than from entry point!");
      }
    } else {
      if (trade.tp && trade.sl) {
        if (trade.entry < trade.tp) throw new Error("TP must be less than from entry point!");
        if (trade.entry > trade.sl) throw new Error("SL must be greater than from entry point!");
      }
    }
  }
}

function calculateProfit(trade: ITradeDocument) {
  const { entry, tp, sl, size, wl } = trade;
  if (!tp || !sl || !size) throw new Error("TP, SL AND SIZE required!");
  if (wl === false) return Math.abs(size * (entry - sl)) * -1;
  trade.profit = Math.abs(size * (tp - entry));
}

function calculateR(trade: ITradeDocument) {
  const { entry, tp, sl, wl } = trade;
  if (!tp || !sl) throw new Error("TP AND SL required!");
  if (wl === false) return -1;
  trade.r = Math.abs((tp - entry) / (entry - sl));
}

export async function build(_trade: ITrade): Promise<ITradeDocument> {
  try {
    modifier(_trade);
    const trade = await TradeModel.create(_trade);
    if (trade.tp && trade.sl && trade.size) {
      calculateProfit(trade);
      calculateR(trade);
    }
    await trade.save();
    return trade;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
