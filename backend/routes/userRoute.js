const express= require("express");
const { registerUser, loginUser, logout, forgotPass, resetPass, getUserDetails, updatePass, updateProfile, getUsers, getSingleUsers, updateRole, deleteUser } = require("../controllers/userController");
const router= express.Router();
const { isAuthUser, authorizeRoles } = require("../middleware/auth");


// Register a new user
router.route("/register").post(registerUser);

// Login a user
router.route("/login").post(loginUser);

// Logout a user
router.route("/logout").get(logout);

// Forgot password - send email to reset password.
router.route("/password/forgot").post(forgotPass);

// Reset password with token sent to email
router.route("/password/reset/:token").put(resetPass);

// Get details for the authenticated user
router.route("/me").get(isAuthUser, getUserDetails);

// Update profile information for authenticated user
router.route("/me/update").put(isAuthUser, updateProfile);

// Update password for authenticated user
router.route("/password/update").put(isAuthUser, updatePass);

// Get all users (for admin users)
router.route("/admin/users").get(isAuthUser, authorizeRoles("admin"), getUsers);

// Get details for a single user (for admin users)
router.route("/admin/user/:id").get(isAuthUser, authorizeRoles("admin"), getSingleUsers);

// Update role (for admin users)
router.route("/admin/user/:id").put(isAuthUser, authorizeRoles("admin"), updateRole);

// Delete user (for admin users)
router.route("/admin/user/:id").delete(isAuthUser, authorizeRoles("admin"), deleteUser);

module.exports=router;