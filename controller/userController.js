/** @format */

const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Fields are Missing", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  // these functions will be used again and again in resetPassword and more places
  cookieToken(user,res);
});
