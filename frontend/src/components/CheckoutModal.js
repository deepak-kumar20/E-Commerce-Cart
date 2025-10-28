import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const API_URL = "http://localhost:5000/api";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, getCartTotal, clearCart, showToast } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (cart.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Call backend checkout API
      const response = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          cartItems: cart,
          userId: "guest",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Set receipt data from backend response
        setReceipt({
          orderNumber: data.data.orderNumber,
          name: data.data.customerName,
          email: data.data.customerEmail,
          subtotal: data.data.totalAmount,
          tax: data.data.tax,
          shipping: data.data.shipping,
          total: data.data.grandTotal,
          timestamp: new Date(data.data.timestamp).toLocaleString(),
          items: data.data.items,
        });
        setIsSubmitted(true);
        showToast("Order placed successfully!", "success");
      } else {
        showToast(data.message || "Failed to place order", "error");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      showToast("Error placing order. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isSubmitted) {
      clearCart();
    }
    setFormData({ name: "", email: "" });
    setIsSubmitted(false);
    setReceipt(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp">
        {/* Header */}
        <div className="bg-primary p-5 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">
              {isSubmitted ? "Order Confirmed" : "Checkout"}
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors duration-150"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150"
                  placeholder="Deepak Kumar"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150"
                  placeholder="deepak@example.com"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded p-4 mt-6 border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-normal text-gray-900">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded text-sm font-medium 
                         hover:bg-blue-700 transition-colors duration-150 mt-6 disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isLoading ? "Processing..." : "Confirm Checkout"}
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {/* Receipt */}
              <div className="bg-gray-50 rounded border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Thank You!
                  </h3>
                  <p className="text-sm text-secondary mt-2">
                    Your order has been placed successfully
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-secondary">Order Number:</span>
                    <span className="font-medium text-gray-900">
                      {receipt.orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-secondary">Customer:</span>
                    <span className="font-medium text-gray-900">
                      {receipt.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-secondary">Email:</span>
                    <span className="font-medium text-gray-900">
                      {receipt.email}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-secondary">Date & Time:</span>
                    <span className="font-medium text-gray-900">
                      {receipt.timestamp}
                    </span>
                  </div>

                  {/* Order Summary */}
                  <div className="pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Subtotal:</span>
                      <span className="text-gray-900">
                        ${receipt.subtotal?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Tax (10%):</span>
                      <span className="text-gray-900">
                        ${receipt.tax?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Shipping:</span>
                      <span className="text-gray-900">
                        ${receipt.shipping?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between py-3 bg-white rounded px-4 mt-4 border border-gray-200">
                    <span className="text-base font-medium text-gray-900">
                      Total Paid:
                    </span>
                    <span className="text-xl font-normal text-gray-900">
                      ${receipt.total?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-primary text-white py-3 rounded text-sm font-medium 
                         hover:bg-blue-700 transition-colors duration-150"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
