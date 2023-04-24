const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  userId: String,
  admin: {
    type: Boolean,
    default: false,
  },
  name: String,
  password: String,
  phoneNumber: String,
  email: String,
  address: String,
  cart:[{
    productId: String,
    quantity: Number,
  }],
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
