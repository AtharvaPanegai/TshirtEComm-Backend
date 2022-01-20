/** @format */

const express = require("express");
const router = express.Router();

const { signup } = require("../controller/userController");

router.route("/signup").get(signup);

module.exports = router;
