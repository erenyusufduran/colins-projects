const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => console.log("Mongoose Connection Error", err.message));

mongoose.connection.once("open", () => console.log("DB Connected"));
