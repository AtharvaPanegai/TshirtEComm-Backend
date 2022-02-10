/** @format */

const express = require("express");
const {
  createOrder,
  getOneOrder,
  getLoggedInUserOrders,
  admingetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
} = require("../controller/orderController");
const router = express.Router();

const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/order/:id").get(isLoggedIn, getOneOrder); // routes with id should go at the bottom or else routes below the id route should change the sturture
router.route("/myOrder").get(isLoggedIn, getLoggedInUserOrders);

// admin routes
router
  .route("/admin/getAllOrders")
  .get(isLoggedIn, customRole("admin"), admingetAllOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOrder)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOrder);

module.exports = router;
