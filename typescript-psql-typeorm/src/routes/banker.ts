import { Router } from "express";
import { Banker } from "../entities";

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

export { router as bankerRouter };
