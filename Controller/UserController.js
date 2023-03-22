const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  const {username, password} = req.body;
  //   const salt = bcrypt.genSaltSync(10);
  //   const hash = bcrypt.hashSync(password, salt);
  const hash = await bcrypt.hash(password, 10);
  //   const newUser = new User({username, password: hash});
  const newUser = new User({...req.body, password: hash});

  newUser.save((err, user) => {
    if (err) res.status(500).json({message: err});
    else res.status(200).json({message: "User Created: " + user});
  });
};

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then(
      (user) => {
        if (!user) res.status(500).json({message: "user dosn't exist!!!"});
        else {
          console.log("user", user);
          console.log("req", req.body);
          bcrypt
            .compare(req.body.password, user.password)
            .then((isMatch) => {
              console.log(isMatch);
              if (!isMatch) {
                res.status(400).json({message: "the password dosnt match"});
              } else {
                const token = jsonwebtoken.sign({id: user._id}, process.env.JWT_TOKEN);
                res
                  .status(200)
                  .json({message: "the password match", data: user, token: token});
              }
            })
            .catch((err) => res.status(500).json({message: err}));
        }
      }

      //   if (!user) res.status(500).json({message: "user dosn't exist!!!"});
      //   else if (user.password != req.body.password)
      //     res.status(400).json({message: "wrong password!!!"});
      //   else if (user.password == req.body.password)
      //     res.status(200).json({message: "user found - login"});
      // }
    )
    .catch((err) => {
      res.status(500).json({message: "Error: " + err});
    });
};

exports.getUserByUserName = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) res.status(400).json({message: "user not Found"});
      else res.status(200).json({message: "user Found", data: user});
    })
    .catch((err) => {
      res.status(500).json({message: err});
    });
};
