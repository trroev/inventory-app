const Dairy = require("../models/dairy");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
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
