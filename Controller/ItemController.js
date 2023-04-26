const Item = require("../Model/Item");

///(title, content, creatorRef)
exports.addItem = (req, res) => {
  const newItem = new Item(req.body);

  newItem.save((err, item) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).json({ message: "item created " + item, data: item });
    }
  });
};

/// (id, updateFields)
exports.edit = (req, res) => {
  Item.findByIdAndUpdate(req.body.id, { ...req.body.updateFields }) // => {content: "dsaa"}
    .then((item) => {
      if (!item) res.status(404).json({ message: "id dosent exist" });
      else {
        res.status(200).json({ message: "item update", data: item });
      }
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
};

/// ()
exports.getAll = (req, res) => {
  Item.find()
    .then((list) => {
      res.status(200).json({ message: list });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

/// (creatorRef)
exports.getAllForUser = (req, res) => {
  Item.find({
    creatorRef: req.userID,
  })
    .then((list) => {
      if (!list) res.status(400).json({ message: "tasks dosn't found" });
      else res.status(200).json({ message: "tasks-list", data: list });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

/// (id)
exports.delete = (req, res) => {
  Item.findByIdAndDelete(req.body.id)
    .then((item) => {
      if (!item) {
        res.status(500).json({ message: "id dosent exist" });
      } else {
        res.status(200).json({ message: "item deleted" });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
