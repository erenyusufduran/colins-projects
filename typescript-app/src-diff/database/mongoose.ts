import mongoose from "mongoose";

export const connectMongo = async () => {
  mongoose.connect("mongodb://localhost:27017/tradeCollection");
  const database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnectMongo = () => {
  mongoose.disconnect();
};
