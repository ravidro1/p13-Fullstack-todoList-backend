const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

/// (username, password)
exports.addUser = async (req, res) => {
  try {
    console.log("addUser");
    const { username, password } = req.body;
    //   const salt = bcrypt.genSaltSync(10);
    //   const hash = bcrypt.hashSync(password, salt);
    const hash = await bcrypt.hash(password, 10);
    //   const newUser = new User({username, password: hash});
    const newUser = new User({ ...req.body, password: hash });
    newUser
      .save()
      .then((user) => {
        if (!user) res.status(400).json({ message: "Username Already Taken" });
        else res.status(200).json({ message: "User Created: " + user });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error - addUser - Username Already Taken", err })
      );
  } catch (err) {
    res.status(500).json({ message: "Error - addUser", err });
  }
};

/// (username, password)
exports.login = (req, res) => {
  try {
    console.log("login");
    User.findOne({
      username: req.body.username,
    }).then((user) => {
      if (!user) res.status(400).json({ message: "user dosn't exist!!!" });
      else {
        bcrypt
          .compare(req.body.password.toString(), user.password.toString())
          .then((isMatch) => {
            if (!isMatch) {
              res.status(400).json({ message: "the password dosn't match" });
            } else {
              const token = jsonwebtoken.sign(
                { id: user._id },
                process.env.JWT_TOKEN,
                { expiresIn: 100 }
              );
              // console.log(isMatch);
              res.status(200).json({
                message: "the password match",
                data: user,
                token: token,
              });
            }
          });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err });
  }
};

/// (username)
exports.getUserByID = (req, res) => {
  User.findById(req.userID)
    .then((user) => {
      if (!user) res.status(400).json({ message: "user not Found" });
      else res.status(200).json({ message: "user Found", data: user });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.getUsername = (req, res) => {
  User.findById(req.userID)
    .then((user) => {
      if (!user) res.status(400).json({ message: "user not Found" });
      else
        res
          .status(200)
          .json({ message: "user Found", username: user.username });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};
