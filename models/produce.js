const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProduceSchema = new Schema({
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

ProduceSchema.virtual("url").get(function () {
  return "/inventory/produce/" + this._id;
});

module.exports = mongoose.model("Produce", ProduceSchema);
