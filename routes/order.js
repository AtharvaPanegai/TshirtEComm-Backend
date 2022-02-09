/** @format */

const express = require("express");
const { createOrder } = require("../controller/orderController");
const router = express.Router();

const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");

router.route("/order/create").post(isLoggedIn, createOrder);

module.exports = router;
