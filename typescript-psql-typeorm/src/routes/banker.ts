import { Router } from "express";
import { Banker, Client } from "../entities";

const router = Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;
  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });
  await banker.save();
  res.status(201).send({ banker });
});

router.put("/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;
  const client = await Client.findOneBy({ id: parseInt(clientId) });
  const banker = await Banker.findOneBy({ id: parseInt(bankerId) });
  if (!banker || !client) throw new Error("Banker or client couldn't find!");
  banker.clients = banker.clients?.concat(client) || [client];
  await banker.save();
  res.send({ message: "Banker connected to client" });
});

export { router as bankerRouter };
