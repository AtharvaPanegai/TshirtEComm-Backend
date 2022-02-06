/** @format */

const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
} = require("../controller/productController");
const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");

router.route("/products").get(getAllProducts);

// admin routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), createProduct);

module.exports = router;
