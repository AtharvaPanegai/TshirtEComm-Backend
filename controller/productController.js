/** @format */

const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");
const Product = require("../models/product");
const fileUpload = require("express-fileupload");

exports.createProduct = BigPromise(async (req, res, next) => {
  // images

  let imageArray = [];

  if (!req.files) {
    return next(new CustomError("Images are required!"), 401);
  }

  if (req.files) {
    for (let i = 0; i < req.files.photos.length; i++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[i].tempFilePath,
        {
          folder: "products",
        }
      );

      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imageArray;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});
