/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;
const Validator = require("validator");
const bcrypt = require("bcryptjs");

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

// encrypt password before save
// we don't want to encrypt the password again and again everytime any field changes will be using isModified function to solve this problem
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);