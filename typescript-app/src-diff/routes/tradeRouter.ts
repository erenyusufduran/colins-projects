import { Router, Response } from "express";
import { TradeModel } from "../database/models/trades/trades.model";
import { auth, AuthRequest } from "../middlewares/auth";
import { ObjectId } from "mongoose";

const router = Router();

router.post("/", auth, async (req: AuthRequest, res: Response) => {
  const { date, pair, timeframe, shortLong, entry, tp, sl, size, wl, link, reasons, results } = req.body;
  try {
    const userId = req.user?._id as ObjectId;
    const trade = await TradeModel.build(
      {
        date: new Date(date),
        pair,
        timeframe,
        shortLong,
        entry,
        tp,
        sl,
        size,
        wl,
        link,
        reasons,
        results,
      },
      userId
    );

    res.send({ trade });
  } catch (error) {
    res.send((error as Error).message);
  }
});

export default router;
