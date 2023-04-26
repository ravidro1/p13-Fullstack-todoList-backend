const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");

const app = express();

const userController = require("./Controller/UserController");
const itemController = require("./Controller/ItemController");

app.use(cors([process.env.FRONTEND_URL, "http://localhost:3001"]));
app.use(bodyParser.json());

const jwtVerify = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) res.status(400).json({ message: "Token Required" });
  else {
    jsonwebtoken.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        res.status(400).json({ message: "Token Wrong" });
      } else {
        req.userID = decoded.id;
        next();
      }
    });
  }
};

app.get("/isTokenValid", jwtVerify, (req, res) => {
  console.warn("TokenValid");
  res.status(200).json({ message: "TokenValid" });
});

app.post("/addUser", userController.addUser);
app.post("/login", userController.login);
app.get("/getUserById", jwtVerify, userController.getUserByID);
app.get("/getUsername", jwtVerify, userController.getUsername);

app.post("/addTask", jwtVerify, itemController.addItem);
app.post("/editTask", jwtVerify, itemController.edit);
app.get("/getAllTasks", jwtVerify, itemController.getAll);
app.get("/getAllForUser", jwtVerify, itemController.getAllForUser);
app.post("/deleteTask", jwtVerify, itemController.delete);

module.exports = app;
