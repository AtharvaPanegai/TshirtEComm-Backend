/** @format */

const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  adminAllUsers,
  managerAllUsers,
  admingetSingleUser,
  adminUpdateOneUserDetail,
  adminDeleteSingleUserById,
} = require("../controller/userController");
const { isLoggedIn, customRole } = require("../middlewares/userMiddleware");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userdashBoard").get(isLoggedIn, getLoggedInUserDetails);
router.route("/password/update").post(isLoggedIn, changePassword);
router.route("/userdashboard/update").post(isLoggedIn, updateUserDetails);

// admin routes
router
  .route("/admin/users")
  .get(isLoggedIn, customRole("admin"), adminAllUsers);
router
  .route("/admin/user/:id")
  .get(isLoggedIn, customRole("admin"), admingetSingleUser)
  .put(isLoggedIn, customRole("admin"), adminUpdateOneUserDetail)
  .delete(isLoggedIn, customRole("admin"), adminDeleteSingleUserById);

// manager route
router
  .route("/manager/users")
  .get(isLoggedIn, customRole("manager"), managerAllUsers);

module.exports = router;
