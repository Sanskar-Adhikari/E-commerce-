const express = require("express");
const router= express.Router();
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthUser, newOrder);
router.route("/order/:id").get(isAuthUser,getSingleOrder);
router.route("/orders/me").get(isAuthUser, myOrder);
router.route("/admin/orders").get(isAuthUser, authorizeRoles("admin"), getAllOrder);
router.route("/admin/order/:id").put(isAuthUser, authorizeRoles("admin"), updateOrder);
router.route("/admin/order/:id").delete(isAuthUser, authorizeRoles("admin"), deleteOrder);


module.exports = router;