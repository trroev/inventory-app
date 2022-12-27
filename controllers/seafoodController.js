const Seafood = require("../models/seafood");

const async = require("async");

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

exports.seafood_detail = (req, res, next) => {
  async.parallel(
    {
      seafood(callback) {
        Seafood.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.seafood == null) {
        const err = new Error("Seafood item not found");
        err.status = 404;
        return next(err);
      }
      res.render("seafood_detail", {
        title: "Seafood Item Detail",
        seafood: results.seafood,
      });
    }
  );
};

exports.seafood_create_get = (req, res) => {
  res.render("seafood_form", { title: "Create Seafood Item" });
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
