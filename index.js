const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://q:q@cluster0.cyg6tdr.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("loser");
    console.log(err);
  });

const app = express();

const userController = require("./Controller/UserController");
const itemController = require("./Controller/ItemController");

app.use(cors());
app.use(bodyParser.json());

app.post("/addUser", userController.addUser);
app.post("/userExistCheck", userController.login);
app.post("/getUserByUsername", userController.getUserByUserName);

app.post("/getAllForUser", itemController.getAllForUser);
app.post("/addTask", itemController.addItem);
app.post("/deleteTask", itemController.delete);
app.post("/editTask", itemController.edit);
app.post("/getAllTasks", itemController.getAll);

app.listen(8000, () => console.log("listen"));
