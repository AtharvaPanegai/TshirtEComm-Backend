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
  addReview,
  deleteReview,
  getOnlyReviewsForOneProduct,
} = require("../controller/productController");
const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");

router.route("/products").get(getAllProducts);
router.route("/getSingleProduct/:id").get(getSingleProduct);
router.route("/review").put(isLoggedIn, addReview);
router.route("/review").delete(isLoggedIn, deleteReview);
router.route("/reviews").get(isLoggedIn, getOnlyReviewsForOneProduct);

// admin routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), createProduct);

router
  .route("/admin/products")
  .get(isLoggedIn, customRole("admin"), admingetAllProducts);

router
  .route("/admin/product/:id")
  .post(isLoggedIn, customRole("admin"), adminUdpateOneProduct)
  .delete(isLoggedIn, customRole("admin"), admindeleteOneProduct);


module.exports = router;
