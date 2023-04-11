
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const userController = require("./Controller/UserController");
const itemController = require("./Controller/ItemController");

app.use(cors());
app.use(bodyParser.json());

app.post("/addUser", userController.addUser);
app.post("/login", userController.login);
app.post("/getUserByUsername", userController.getUserByUserName);

app.post("/addTask", itemController.addItem);
app.post("/editTask", itemController.edit);
app.post("/getAllTasks", itemController.getAll);
app.post("/getAllForUser", itemController.getAllForUser);
app.post("/deleteTask", itemController.delete);

module.exports = app;
