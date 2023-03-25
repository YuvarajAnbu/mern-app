const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 500,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    max: 500,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
