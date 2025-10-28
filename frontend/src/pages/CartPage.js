import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import CheckoutModal from "../components/CheckoutModal";

const CartPage = () => {
  const { cart, getCartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const total = getCartTotal();
  const tax = total * 0.1; // 10% tax
  const shipping = total > 0 ? 5.99 : 0;
  const grandTotal = total + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-normal text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-base text-secondary mb-8">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-150"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-normal text-gray-900 mb-2">
          Shopping Cart
        </h1>
        <p className="text-base text-secondary">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded p-5 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm text-secondary">
                <span>Subtotal</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-secondary">
                <span>Tax (10%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-secondary">
                <span>Shipping</span>
                <span className="text-gray-900">${shipping.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">
                  Total
                </span>
                <span className="text-xl font-normal text-gray-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-primary text-white py-3 rounded text-sm font-medium
                       hover:bg-blue-700 transition-colors duration-150
                       flex items-center justify-center space-x-2"
            >
              <span>Proceed to checkout</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            <Link
              to="/"
              className="block text-center text-primary hover:text-blue-700 text-sm font-medium mt-4 transition-colors duration-150"
            >
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default CartPage;
