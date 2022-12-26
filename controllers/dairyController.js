const Dairy = require("../models/dairy");
const Meat = require("../models/meat");
const Produce = require("../models/produce");
const Seafood = require("../models/seafood");

const async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      dairy_count(callback) {
        Dairy.countDocuments({}, callback);
      },
      meat_count(callback) {
        Meat.countDocuments({}, callback);
      },
      produce_count(callback) {
        Produce.countDocuments({}, callback);
      },
      seafood_count(callback) {
        Seafood.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Inventory",
        error: err,
        data: results,
      });
    }
  );
};

exports.dairy_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Dairy list");
};

exports.dairy_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Dairy detail: ${req.params.id}`);
};

exports.dairy_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Dairy create GET");
};

exports.dairy_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Dairy create POST");
};

exports.dairy_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Dairy delete GET");
};

exports.dairy_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Dairy delete POST");
};

exports.dairy_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Dairy update GET");
};

exports.dairy_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Dairy update POST");
};
