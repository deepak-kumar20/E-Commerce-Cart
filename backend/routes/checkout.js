const express = require("express");
const router = express.Router();
const {
  processCheckout,
  getAllOrders,
  getOrderByNumber,
} = require("../controllers/checkoutController");

// @route   POST /api/checkout
// @desc    Process checkout and create order
// @access  Public
router.post("/", processCheckout);

// @route   GET /api/checkout/orders
// @desc    Get all orders
// @access  Public
router.get("/orders", getAllOrders);

// @route   GET /api/checkout/orders/:orderNumber
// @desc    Get single order by order number
// @access  Public
router.get("/orders/:orderNumber", getOrderByNumber);

module.exports = router;
