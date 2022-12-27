const Meat = require("../models/meat");

exports.meat_list = (req, res, next) => {
  Meat.find({}, "name price")
    .sort({ name: 1 })
    .populate("price")
    .exec(function (err, list_meat) {
      if (err) {
        return next(err);
      }
      res.render("meat_list", {
        title: "Meat List",
        meat_list: list_meat,
      });
    });
};

exports.meat_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Meat detail: ${req.params.id}`);
};

exports.meat_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat create GET");
};

exports.meat_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat create POST");
};

exports.meat_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat delete GET");
};

exports.meat_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat delete POST");
};

exports.meat_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat update GET");
};

exports.meat_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat update POST");
};
