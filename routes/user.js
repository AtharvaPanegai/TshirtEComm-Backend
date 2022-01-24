/** @format */

const express = require("express");
const router = express.Router();

const { signup, login,logout, forgotPassword } = require("../controller/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotPassword)

module.exports = router;
