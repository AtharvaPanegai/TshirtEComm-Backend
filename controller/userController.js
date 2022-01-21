/** @format */

const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

exports.signup = BigPromise(async (req, res, next) => {
  let photoUploadResult;
  if (req.files) {
    let file = req.files.photo;
    photoUploadResult = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "users",
      width: 150,
      crop: "scale",
    });
  }

  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Fields are Missing", 400));
  }

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
