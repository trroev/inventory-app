const Meat = require("../models/meat");

const async = require("async");
const { body, validationResult } = require("express-validator");

exports.meat_list = (req, res, next) => {
  Meat.find({}, "name price quantity")
    .sort({ name: 1 })
    .populate("price", "quantity")
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

exports.meat_create_post = [
  body("name", "Meat item name required")
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
    const meat = new Meat({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    if (!errors.isEmpty()) {
      res.render("meat_form", {
        title: "Create Meat Item",
        meat,
        errors: errors.array(),
      });
      return;
    } else {
      Meat.findOne({ name: req.body.name }).exec(
        (err, found_meat) => {
          if (err) {
            return next(err);
          }
          if (found_meat) {
            res.redirect(found_meat.url);
          } else {
            meat.save((err) => {
              if (err) {
                return next(err);
              }
              res.redirect(meat.url);
            });
          }
        }
      );
    }
  },
];

exports.meat_delete_get = (req, res, next) => {
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
        res.redirect("/inventory/meat");
      }
      res.render("meat_delete", {
        title: "Delete Meat Item",
        meat: results.meat,
      });
    }
  );
};

exports.meat_delete_post = (req, res, next) => {
  Meat.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/inventory/meat");
  });
};

exports.meat_update_get = (req, res, next) => {
  Meat.findById(req.params.id, (err, meat) => {
    if (err) {
      return next(err);
    }
    if (meat == null) {
      const err = new Error("Meat item not found");
      err.status = 404;
      return next(err);
    }
    res.render("meat_form", {
      title: `Update ${meat.name}`,
      meat: meat,
    });
  });
};

exports.meat_update_post = [
  body("name", "Meat item name required")
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
    const meat = new Meat({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("meat_form", {
        title: `Update ${meat.name}`,
        meat: meat,
        errors: errors.array(),
      });
      return;
    }
    Meat.findByIdAndUpdate(
      req.params.id,
      meat,
      {},
      (err, themeat) => {
        if (err) {
          return next(err);
        }
        res.redirect(themeat.url);
      }
    );
  },
];
