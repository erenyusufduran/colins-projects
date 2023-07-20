import { Router, Response } from "express";
import { TradeModel } from "../database/models/trades/trades.model";
import { auth, AuthRequest } from "../middlewares/auth";
import { ObjectId } from "mongoose";

const router = Router();

router.get("/:tradeId", auth, async (req: AuthRequest, res: Response) => {
  try {
    const trade = await TradeModel.findOne({ _id: req.params.tradeId, owner: req.user?._id });
    if (!trade) return res.status(404).send({ error: `There is no trade with this id: ${req.params.id}` });
    res.status(200).send({ trade });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.get("/", auth, async (req: AuthRequest, res: Response) => {
  try {
    const trades = await TradeModel.find({ owner: req.user?._id });
    res.status(200).send({ trades });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

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

router.patch("/:tradeId", auth, async (req: AuthRequest, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "date",
    "pair",
    "timeframe",
    "shortLong",
    "entry",
    "tp",
    "sl",
    "size",
    "wl",
    "link",
    "reasons",
    "results",
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) return res.status(400).send({ error: "Invalid Updates!" });
  try {
    const trade = await TradeModel.findOne({ _id: req.params.tradeId, owner: req.user?._id });
    if (!trade) return res.status(404).send({ error: `There is no trade with this id: ${req.params.tradeId}` });
    updates.forEach((update) => ((trade as any)[update] = req.body[update]));
    await trade.save();
    res.send({ trade });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export default router;
