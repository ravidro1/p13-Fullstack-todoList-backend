const mongoose = require("mongoose");
require("dotenv").config();

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV == "test") {
      //   console.warn("test");
      mongoose
        .connect(process.env.MONGO_URL, {})
        .then(() => {
          console.log("connected");
          resolve();
        })
        .catch((err) => {
          console.log("loser");
          console.log(err);
          reject(err);
        });
    } else {
      console.warn("dev");

      mongoose
        .connect(
          process.env.MONGO_URL,
          {}
          // { useNewUrlParser: true, useCreateIndex: true }
        )
        .then(() => {
          console.log("connected");
          resolve();
        })
        .catch((err) => {
          console.log("loser");
          console.log(err);
          reject(err);
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
