const Produce = require("../models/produce");

const async = require("async");
const { body, validationResult } = require("express-validator");

exports.produce_list = (req, res, next) => {
  Produce.find({}, "name price quantity")
    .sort({ name: 1 })
    .populate("price", "quantity")
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

exports.produce_create_post = [
  body("name", "Produce item name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "a short description in required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "price is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantity", "quantity is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const produce = new Produce({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    if (!errors.isEmpty()) {
      res.render("produce_form", {
        title: "Create Produce Item",
        produce,
        errors: errors.array(),
      });
      return;
    } else {
      Produce.findOne({ name: req.body.name }).exec(
        (err, found_produce) => {
          if (err) {
            return next(err);
          }
          if (found_produce) {
            res.redirect(found_produce.url);
          } else {
            produce.save((err) => {
              if (err) {
                return next(err);
              }
              res.redirect(produce.url);
            });
          }
        }
      );
    }
  },
];

exports.produce_delete_get = (req, res, next) => {
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
        res.redirect("/inventory/produce");
      }
      res.render("produce_delete", {
        title: "Delete Produce Item",
        produce: results.produce,
      });
    }
  );
};

exports.produce_delete_post = (req, res, next) => {
  Produce.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/inventory/produce");
  });
};

exports.produce_update_get = (req, res, next) => {
  Produce.findById(req.params.id, (err, produce) => {
    if (err) {
      return next(err);
    }
    if (produce == null) {
      const err = new Error("Produce item not found");
      err.status = 404;
      return next(err);
    }
    res.render("produce_form", {
      title: `Update ${produce.name}`,
      produce: produce,
    });
  });
};

exports.produce_update_post = [
  body("name", "Produce item name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "a short description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantity", "Quantity is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const produce = new Produce({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("produce_form", {
        title: `Update ${produce.name}`,
        produce: produce,
        errors: errors.array(),
      });
      return;
    }
    Produce.findByIdAndUpdate(
      req.params.id,
      produce,
      {},
      (err, theproduce) => {
        if (err) {
          return next(err);
        }
        res.redirect(theproduce.url);
      }
    );
  },
];
