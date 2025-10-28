// @desc    Get all products from FakeStore API
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch products from FakeStore API
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products from FakeStore API",
      error: error.message,
    });
  }
};

// @desc    Get single product from FakeStore API
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${req.params.id}`
    );
    const product = await response.json();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};
