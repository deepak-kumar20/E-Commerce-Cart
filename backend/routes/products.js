const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

// @route   GET /api/products
router.get("/", getAllProducts);

// @route   GET /api/products/:id
router.get("/:id", getProductById);

module.exports = router;
