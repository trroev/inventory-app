const Produce = require("../models/produce");

exports.produce_list = (req, res, next) => {
  Produce.find({}, "name price")
    .sort({ name: 1 })
    .populate("price")
    .exec(function (err, list_produce) {
      if (err) {
        return next(err);
      }
      res.render("produce_list", {
        title: "Produce List",
        produce_list: list_produce,
      });
    });
};

exports.produce_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Produce detail: ${req.params.id}`);
};

exports.produce_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Produce create GET");
};

exports.produce_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Produce create POST");
};

exports.produce_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Produce delete GET");
};

exports.produce_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Produce delete POST");
};

exports.produce_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Produce update GET");
};

exports.produce_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Produce update POST");
};
