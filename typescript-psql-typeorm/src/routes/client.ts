import { Router, Request, Response } from "express";
import { Client, Transaction, TransactionTypes } from "../entities";
import { createQueryBuilder } from "typeorm";

const router = Router();

router.get("/", async (req, res) => {
  const clients = await createQueryBuilder("client")
    .select("client")
    .addSelect("client.last_name")
    .from(Client, "client")
    .leftJoinAndSelect("client.transactions", "transaction")
    .where("client.balance >= :balance", { balance: 0 })
    .getMany();
  return res.send({ clients });
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, cardNumber, balance } = req.body;
    const client = Client.create({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      balance,
    });
    await client.save();
    res.status(201).send({ client });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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

router.delete("/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;
    const response = await Client.delete(parseInt(clientId));
    res.send({ message: response });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export { router as clientRouter };
