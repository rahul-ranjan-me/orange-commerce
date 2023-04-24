const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const PastOrders = new Schema({
  username: String,
  pastOrders: [
    {
      price: Number,
      productId: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("PastOrders", PastOrders);
