import { Router, Request, Response } from "express";
import { Client, Transaction, TransactionTypes } from "../entities";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;
  const client = Client.create({ first_name: firstName, last_name: lastName, email, card_number: cardNumber, balance });
  await client.save();
  res.status(201).send({ client });
});

router.post("/:clientId/transaction", async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const { type, amount } = req.body;
    const client = await Client.findOneBy({ id: parseInt(clientId) });
    if (!client) return res.status(400).send({ message: "Client not found!" });
    const transaction = Transaction.create({ amount, type, client });
    await transaction.save();
    if (type === TransactionTypes.DEPOSIT) {
      client.balance += amount as number;
    } else if (type === TransactionTypes.WITHDRAW) {
      client.balance -= amount as number;
    }
    await client.save();
    res.send({ message: "Transaction added" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

export { router as clientRouter };
