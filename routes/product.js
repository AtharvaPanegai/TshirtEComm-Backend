/** @format */

const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  admingetAllProducts,
  getSingleProduct,
  adminUdpateOneProduct,
  admindeleteOneProduct,
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

router
  .route("/admin/updateProduct/:id")
  .post(isLoggedIn, customRole("admin"), adminUdpateOneProduct);

router
  .route("/admin/deleteOneProduct/:id")
  .get(isLoggedIn, customRole("admin"), admindeleteOneProduct);

module.exports = router;
