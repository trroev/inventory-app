const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SeafoodSchema = new Schema({
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

SeafoodSchema.virtual("url").get(function () {
  return "/inventory/seafood/" + this._id;
});

module.exports = mongoose.model("Seafood", SeafoodSchema);
