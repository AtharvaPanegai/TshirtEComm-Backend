/** @format */

const express = require("express");
const { createOrder, getOneOrder } = require("../controller/orderController");
const router = express.Router();

const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/order/:id").get(isLoggedIn, getOneOrder);

module.exports = router;
