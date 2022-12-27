const Dairy = require("../models/dairy");
const Meat = require("../models/meat");
const Produce = require("../models/produce");
const Seafood = require("../models/seafood");

const async = require("async");
const { body, validationResult } = require("express-validator");

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
  Dairy.find({}, "name price quantity")
    .sort({ name: 1 })
    .populate("price", "quantity")
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

exports.dairy_create_post = [
  body("name", "Dairy item name required")
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
    const dairy = new Dairy({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    if (!errors.isEmpty()) {
      res.render("dairy_form", {
        title: "Create Dairy Item",
        dairy,
        errors: errors.array(),
      });
      return;
    } else {
      Dairy.findOne({ name: req.body.name }).exec(
        (err, found_dairy) => {
          if (err) {
            return next(err);
          }
          if (found_dairy) {
            res.redirect(found_dairy.url);
          } else {
            dairy.save((err) => {
              if (err) {
                return next(err);
              }
              res.redirect(dairy.url);
            });
          }
        }
      );
    }
  },
];

exports.dairy_delete_get = (req, res, next) => {
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
        res.redirect("/inventory/dairy");
      }
      res.render("dairy_delete", {
        title: "Delete Dairy Item",
        dairy: results.dairy,
      });
    }
  );
};

exports.dairy_delete_post = (req, res, next) => {
  Dairy.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/inventory/dairy");
  });
};

exports.dairy_update_get = (req, res, next) => {
  Dairy.findById(req.params.id, (err, dairy) => {
    if (err) {
      return next(err);
    }
    if (dairy == null) {
      const err = new Error("Dairy item not found");
      err.status = 404;
      return next(err);
    }
    res.render("dairy_form", {
      title: `Update ${dairy.name}`,
      dairy: dairy,
    });
  });
};

exports.dairy_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Dairy update POST");
};
