import { Router } from "express";
import { Client } from "../entities";

const router = Router();

router.post("/client", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;
  const client = Client.create({ first_name: firstName, last_name: lastName, email, card_number: cardNumber, balance });
  await client.save();
  res.status(201).send({ client });
});

export { router as clientRouter };
