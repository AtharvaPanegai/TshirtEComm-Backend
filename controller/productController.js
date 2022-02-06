/** @format */

const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");
const Product = require("../models/product");
const fileUpload = require("express-fileupload");
const WhereClause = require("../utils/whereClause");

exports.createProduct = BigPromise(async (req, res, next) => {
  // images

  let imageArray = [];

  if (!req.files) {
    return next(new CustomError("Images are required!"), 401);
  }

  // let lenghthofPhotoArray = req.files.photos.length;
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
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

exports.getAllProducts = BigPromise(async (req, res, next) => {
  const resultPerPage = 6;
  const countTotalProduct = await Product.countDocuments();

  const productsObj = new WhereClause(Product.find(), req.query)
    .search()
    .filter();

  // number of filtered products
  let products = await productsObj.base;
  const filteredProducts = products.length;

  // pager function
  productsObj.pager(resultPerPage);
  products = await productsObj.base.clone();

  res.status(200).json({
    success: true,
    products,
    filteredProducts,
    countTotalProduct,
  });
});

exports.admingetAllProducts = BigPromise(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new CustomError("NO products to display"));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

exports.getSingleProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError("No product Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.adminUdpateOneProduct = BigPromise(async (req, res, next) => {
  // only admin can access this route
  const product = await Product.find(req.params.id);

  if (!product) {
    return next(new CustomError("No product Found", 404));
  }

  let imageArray = [];
  if (req.files) {
    // destory the existing photos

    for (let index = 0; index < product.photos.length; index++) {
      const res = cloudinary.v2.uploader.destroy(product.photos[index].id);
    }
    // upload and save the images

    for (let i = 0; i < req.files.photos.length; i++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[i].tempFilePath,
        {
          folder: "products", // folder name => .env
        }
      );

      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imageArray;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
