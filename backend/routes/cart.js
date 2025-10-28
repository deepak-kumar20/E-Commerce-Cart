const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// @route   GET /api/cart
// @desc    Get cart items and total
// @access  Public
router.get("/", getCart);

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Public
router.post("/", addToCart);

// @route   PUT /api/cart/:itemId
// @desc    Update cart item quantity
// @access  Public
router.put("/:itemId", updateCartItem);

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Public
router.delete("/:itemId", removeFromCart);

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Public
router.delete("/", clearCart);

module.exports = router;
