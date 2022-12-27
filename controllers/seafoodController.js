const Seafood = require("../models/seafood");

const async = require("async");
const { body, validationResult } = require("express-validator");

exports.seafood_list = (req, res, next) => {
  Seafood.find({}, "name price quantity")
    .sort({ name: 1 })
    .populate("price", "quantity")
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

exports.seafood_create_post = [
  body("name", "Seafood item name required")
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
    const seafood = new Seafood({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    if (!errors.isEmpty()) {
      res.render("seafood_form", {
        title: "Create Seafood Item",
        seafood,
        errors: errors.array(),
      });
      return;
    } else {
      Seafood.findOne({ name: req.body.name }).exec(
        (err, found_seafood) => {
          if (err) {
            return next(err);
          }
          if (found_seafood) {
            res.redirect(found_seafood.url);
          } else {
            seafood.save((err) => {
              if (err) {
                return next(err);
              }
              res.redirect(seafood.url);
            });
          }
        }
      );
    }
  },
];

exports.seafood_delete_get = (req, res, next) => {
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
        res.redirect("/inventory/seafood");
      }
      res.render("seafood_delete", {
        title: "Delete Seafood Item",
        seafood: results.seafood,
      });
    }
  );
};

exports.seafood_delete_post = (req, res, next) => {
  Seafood.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/inventory/seafood");
  });
};

exports.seafood_update_get = (req, res, next) => {
  Seafood.findById(req.params.id, (err, seafood) => {
    if (err) {
      return next(err);
    }
    if (seafood == null) {
      const err = new Error("Seafood item not found");
      err.status = 404;
      return next(err);
    }
    res.render("seafood_form", {
      title: `Update ${seafood.name}`,
      seafood: seafood,
    });
  });
};

exports.seafood_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Seafood update POST");
};
