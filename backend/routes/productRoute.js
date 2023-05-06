const express= require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReviews, getAdminProducts } = require("../controllers/productController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


// Get all products
router.route("/products").get(getAllProducts);

// Create a new product (for admin users)
router.route("/admin/product/new").post(isAuthUser, authorizeRoles("admin"), createProduct);

// Update an existing product (for admin users)
router.route("/admin/product/:id").put(isAuthUser, authorizeRoles("admin"), updateProduct);

// Delete an existing product (for admin users).
router.route("/admin/product/:id").delete(isAuthUser, authorizeRoles("admin"), deleteProduct);

// Get details for a single product
router.route("/product/:id").get(getProductDetails);

// Create a review for a product
router.route("/review").put(isAuthUser, createProductReview);

// Get reviews for a product
router.route("/reviews").get(getProductReviews);

// Delete reviews for a product (for admin users)
router.route("/reviews").delete(isAuthUser, authorizeRoles("admin"), deleteReviews);

// Get all products (for admin users)
router.route("/admin/products").get(isAuthUser, authorizeRoles("admin"), getAdminProducts);

module.exports=router