const validator = require("validator");

const validate = (req, res, next) => {
  const { age, name, gender, company, email, address } = req.body;
  if (
    gender !== "male" ||
    typeof age !== "number" ||
    typeof name !== "string" ||
    typeof company !== "string" ||
    !validator.isEmail(email) ||
    typeof address !== "string"
  ) {
    return res.status(400).send("Bad Request");
  }
  next();
};

module.exports = validate;
