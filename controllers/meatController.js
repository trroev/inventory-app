const Meat = require("../models/meat");

const async = require("async");

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

exports.meat_detail = (req, res, next) => {
  async.parallel(
    {
      meat(callback) {
        Meat.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.meat == null) {
        const err = new Error("Meat item not found");
        err.status = 404;
        return next(err);
      }
      res.render("meat_detail", {
        title: "Meat Item Detail",
        meat: results.meat,
      });
    }
  );
};

exports.meat_create_get = (req, res) => {
  res.render("meat_form", { title: "Create Meat Item" });
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
