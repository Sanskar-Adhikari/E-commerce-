const express = require("express");
const router= express.Router();
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");


// Create a new order
router.route("/order/new").post(isAuthUser, newOrder);

// Get details for a single order
router.route("/order/:id").get(isAuthUser, getSingleOrder);

// Get all orders for the authenticated user
router.route("/orders/me").get(isAuthUser, myOrder);

// Get all orders for admin users
router.route("/admin/orders").get(isAuthUser, authorizeRoles("admin"), getAllOrder);

// Update an existing order (for admin users)
router.route("/admin/order/:id").put(isAuthUser, authorizeRoles("admin"), updateOrder);

// Delete an order (for admin users)
router.route("/admin/order/:id").delete(isAuthUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;