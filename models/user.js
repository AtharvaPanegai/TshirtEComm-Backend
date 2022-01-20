/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;
const Validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"], // first property is required and second is during the error
    maxlength: [40, "Name should be under 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"], // first property is required and second is during the error
    validate: [Validator.isEmail, "Please Enter a Valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide an password"], // first property is required and second is during the error
    minlength: [8, "Password should be atleast 8 Characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
