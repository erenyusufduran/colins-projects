const validator = require("validator");

const validate = (req, res, next) => {
  const { age, name, gender, company, email, address } = req.body;
  if (
    typeof age !== "number" ||
    typeof name !== "string" ||
    typeof company !== "string" ||
    !validator.isEmail(email) ||
    typeof address !== "string"
  ) {
    return res.status(400).send("Bad Request");
  }
  if (gender !== "male" && gender !== "female") {
    return res.status(400).send("You must show your gender.");
  }
  next();
};

module.exports = validate;
