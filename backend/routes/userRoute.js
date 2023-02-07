const express= require("express");
const { registerUser, loginUser, logout, forgotPass, resetPass, getUserDetails, updatePass, updateProfile, getUsers, getSingleUsers, updateRole, deleteUser } = require("../controllers/userController");
const router= express.Router();
const { isAuthUser, authorizeRoles } = require("../middleware/auth");


router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPass)
router.route("/password/reset/:token").put(resetPass)
router.route("/me").get(isAuthUser, getUserDetails)
router.route("/me/update").put(isAuthUser, updateProfile)
router.route("/password/update").put(isAuthUser, updatePass)
router.route("/admin/users").get(isAuthUser, authorizeRoles("admin"),getUsers)
router.route("/admin/user/:id").get(isAuthUser, authorizeRoles("admin"), getSingleUsers)
router.route("/admin/user/:id").put(isAuthUser, authorizeRoles("admin"), updateRole)
router.route("/admin/user/:id").delete(isAuthUser, authorizeRoles("admin"), deleteUser)



module.exports=router;