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

exports.addReview = BigPromise(async (req, res, next) => {
  // taking the information from front end for a review
  const { rating, comment, productId } = req.body;

  // creating an Object to push a review
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // find a product on which review is done

  const product = await Product.findById(productId);

  // check if the user has already reviewed product
  const alreadyReviewed = product.reviews.find((rev) => {
    rev.user.toString() === req.user._id.toString();
  });

  // depending upon the already reviewed

  if (alreadyReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  // adjust rating according all ratings
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});


exports.adminUdpateOneProduct = BigPromise(async (req, res, next) => {
  // only admin can access this route
  let product = await Product.findById(req.params.id);

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

exports.admindeleteOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError("No product found for this id"), 404);
  }

  // removing images from cloudinary
  for (let index = 0; index < product.photos.length; index++) {
    await cloudinary.v2.uploader.destroy(product.photos[index].id);
  }

  // remove product data from db
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
});
