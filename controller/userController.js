/** @format */

const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");

exports.signup = BigPromise(async (req, res, next) => {
  let photoUploadResult;

  if (!req.files) {
    return next(new CustomError("Photo is required for signup", 400));
  }

  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Fields are Missing", 400));
  }

  let file = req.files.photo;
  photoUploadResult = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "users",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: photoUploadResult.public_id,
      secure_url: photoUploadResult.secure_url,
    },
  });
  // these functions will be used again and again in resetPassword and more places
  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // check for presence of Email and Password of given by the user
  if (!email || !password) {
    return next(new CustomError("Please Provide Email and Password", 400));
  }

  // finding if the user exits in the database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new CustomError("User Does not exist Please Sign Up", 400));
  }

  // checking if the password is valid
  const isPasswordCorrect = user.isPasswordValid(password);

  // if the password is not correct
  if(!isPasswordCorrect){
    return next(new CustomError("Enter Correct Password",400));
  }

  // sending Token
  cookieToken(user, res);

});
