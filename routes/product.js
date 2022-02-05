/** @format */

const express = require("express");
const router = express.Router();

const { createProduct } = require("../controller/productController");
const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");

router.route("/createproduct").post(createProduct);

module.exports = router;
