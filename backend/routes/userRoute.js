const express= require("express");
const { registerUser, loginUser, logout, forgotPass, resetPass, getUserDetails, updatePass } = require("../controllers/userController");
const router= express.Router();
const { isAuthUser, authorizeRoles } = require("../middleware/auth");


router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPass)
router.route("/password/reset/:token").put(resetPass)
router.route("/me").get(isAuthUser, getUserDetails)
router.route("/password/update").put(isAuthUser, updatePass)
module.exports=router;