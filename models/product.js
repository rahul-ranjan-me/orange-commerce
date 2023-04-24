const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Product = new Schema({
  details: {
    name: String,
    image: String,
    price: String,
    productId: String,
    tagged: String,
    description: String,
  },
});

module.exports = mongoose.model("Product", Product);
