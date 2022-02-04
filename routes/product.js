/** @format */

const express = require("express");
const router = express.Router();

const { testController } = require("../controller/productController");
const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");



router.route("/testProduct").get(testController);

module.exports = router;
