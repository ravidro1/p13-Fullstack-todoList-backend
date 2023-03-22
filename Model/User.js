const mongoose = require("mongoose");

const User = mongoose.Schema({
  // fullName: {type: String, require: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

module.exports = mongoose.model("User", User);
