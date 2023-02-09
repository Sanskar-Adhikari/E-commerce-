const express = require("express");
const router= express.Router();
const { newOrder, getSingleOrder, myOrder } = require("../controllers/orderController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthUser, newOrder);
router.route("/order/_id").get(isAuthUser, authorizeRoles("admin"),getSingleOrder);
router.route("/orders/me").get(isAuthUser, myOrder);




module.exports = router;