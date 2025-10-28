const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @desc    Process checkout and create order
// @route   POST /api/checkout
// @access  Public
exports.processCheckout = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      cartItems,
      userId = "guest",
    } = req.body;

    // Validation
    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required",
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Calculate totals
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 0 ? 5.99 : 0;
    const grandTotal = subtotal + tax + shipping;

    // Generate order number
    const orderNumber = `VC${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create order
    const order = await Order.create({
      orderNumber,
      customerName,
      customerEmail,
      items: cartItems.map((item) => ({
        productId: item.id || item._id,
        name: item.title || item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: subtotal,
      tax,
      shipping,
      grandTotal,
      status: "completed",
    });

    // Clear cart after successful checkout
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      cart.totalAmount = 0;
      await cart.save();
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        totalAmount: order.totalAmount,
        tax: order.tax,
        shipping: order.shipping,
        grandTotal: order.grandTotal,
        timestamp: order.createdAt,
        items: order.items,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing checkout",
      error: error.message,
    });
  }
};

// @desc    Get all orders
// @route   GET /api/checkout/orders
// @access  Public
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// @desc    Get single order by order number
// @route   GET /api/checkout/orders/:orderNumber
// @access  Public
exports.getOrderByNumber = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};
