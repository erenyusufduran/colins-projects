const path = require("path");
const express = require("express");
const { notFound, mongooseErrors, developmentErrors, productionErrors } = require("./handlers/errorHandler");

const PORT = process.env.PORT || 3000;

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectoryPath));

app.use(notFound);
app.use(mongooseErrors);
if (process.env.ENV === "DEV") {
  app.use(developmentErrors);
} else {
  app.use(productionErrors);
}

app.listen(PORT, () => `Server is listening on port ${PORT}`);
