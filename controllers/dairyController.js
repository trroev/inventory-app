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

exports.dairy_list = (req, res, next) => {
  Dairy.find({}, "name price")
    .sort({ name: 1 })
    .populate("price")
    .exec(function (err, list_dairy) {
      if (err) {
        return next(err);
      }
      res.render("dairy_list", {
        title: "Dairy List",
        dairy_list: list_dairy,
      });
    });
};

exports.dairy_detail = (req, res, next) => {
  async.parallel(
    {
      dairy(callback) {
        Dairy.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.dairy == null) {
        const err = new Error("Dairy item not found");
        err.status = 404;
        return next(err);
      }
      res.render("dairy_detail", {
        title: "Dairy Item Detail",
        dairy: results.dairy,
      });
    }
  );
};

exports.dairy_create_get = (req, res) => {
  res.render("dairy_form", { title: "Create Dairy Item" });
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
