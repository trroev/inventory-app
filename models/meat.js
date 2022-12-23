const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MeatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

MeatSchema.virtual("url").get(function () {
  return "/inventory/meat/" + this._id;
});

module.exports = mongoose.model("Meat", MeatSchema);
