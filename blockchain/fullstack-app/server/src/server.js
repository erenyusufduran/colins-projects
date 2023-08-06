require("dotenv").config();
const Number = require("./db/models/Number");
const app = require("./app");

app.listen(3000, () => "Server is listening on port 3000");
