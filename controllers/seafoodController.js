const Seafood = require("../models/seafood");

exports.seafood_list = (req, res, next) => {
  Seafood.find({}, "name price")
    .sort({ name: 1 })
    .populate("price")
    .exec(function (err, list_seafood) {
      if (err) {
        return next(err);
      }
      res.render("seafood_list", {
        title: "Seafood List",
        seafood_list: list_seafood,
      });
    });
};

exports.seafood_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Seafood detail: ${req.params.id}`);
};

exports.seafood_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Seafood create GET");
};

exports.seafood_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Seafood create POST");
};

exports.seafood_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Seafood delete GET");
};

exports.seafood_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Seafood delete POST");
};

exports.seafood_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Seafood update GET");
};

exports.seafood_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Seafood update POST");
};
