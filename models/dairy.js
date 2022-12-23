const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DairySchema = new Schema({
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

DairySchema.virtual("url").get(function () {
  return "/inventory/dairy/" + this._id;
});

module.exports = mongoose.model("Dairy", DairySchema);
