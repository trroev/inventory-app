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

exports.meat_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat delete POST");
};

exports.meat_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat update GET");
};

exports.meat_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Meat update POST");
};
