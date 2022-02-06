/** @format */

const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  admingetAllProducts,
  getSingleProduct,
} = require("../controller/productController");
const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");

router.route("/products").get(getAllProducts);
router.route("/getSingleProduct/:id").get(getSingleProduct);

// admin routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), createProduct);

router
  .route("/admin/products")
  .get(isLoggedIn, customRole("admin"), admingetAllProducts);

module.exports = router;
