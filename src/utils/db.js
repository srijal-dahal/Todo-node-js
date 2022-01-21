const mongoose = require("mongoose");
const messageHandler = require("../utils/messageHandler");
const keys = require("../config/keys");

function connectToDb() {
  console.log(keys)
  mongoose
    .connect(keys.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
      messageHandler(true, "succesfully connected to db", 201);
    })
    .catch((err) => {
      console.log("MongoDB connection error", err);
      messageHandler(false, err, 500);
    });
}
module.exports = connectToDb;
