import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const subtotal = item.price * item.quantity;

  // FakeStore API uses 'title' instead of 'name'
  const productName = item.title || item.name;

  return (
    <div className="bg-white border border-gray-200 rounded p-4 flex items-center space-x-4 hover:border-gray-300 transition-colors duration-150">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={productName}
          className="w-24 h-24 object-contain rounded"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-base font-medium text-gray-900 mb-1">
          {productName}
        </h3>
        <p className="text-sm text-secondary line-clamp-1">
          {item.description}
        </p>
        <p className="text-sm text-gray-900 font-medium mt-2">
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors duration-150"
          disabled={item.quantity <= 1}
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
              d="M20 12H4"
            />
          </svg>
        </button>

        <span className="w-12 text-center font-medium text-base">
          {item.quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors duration-150"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[80px]">
        <p className="text-sm text-secondary mb-1">Subtotal</p>
        <p className="text-base font-medium text-gray-900">
          ${subtotal.toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="flex-shrink-0 w-8 h-8 rounded hover:bg-red-50 text-secondary hover:text-danger flex items-center justify-center transition-colors duration-150"
        title="Remove item"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
