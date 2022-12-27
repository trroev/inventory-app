const Produce = require("../models/produce");

const async = require("async");

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

exports.produce_detail = (req, res, next) => {
  async.parallel(
    {
      produce(callback) {
        Produce.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.produce == null) {
        const err = new Error("Produce item not found");
        err.status = 404;
        return next(err);
      }
      res.render("produce_detail", {
        title: "Produce Item Detail",
        produce: results.produce,
      });
    }
  );
};

exports.produce_create_get = (req, res) => {
  res.render("produce_form", { title: "Create Produce Item" });
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
