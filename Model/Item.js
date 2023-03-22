const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  creatorRef: {type: mongoose.Types.ObjectId, ref: "User", required: true},
//   date: {type: String},
});

module.exports = mongoose.model("Item", ItemSchema);
