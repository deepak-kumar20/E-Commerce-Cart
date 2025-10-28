import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  // FakeStore API uses 'title' instead of 'name'
  const productName = product.title || product.name;

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={productName}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-1">
          {productName}
        </h3>
        <p className="text-sm text-secondary mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-normal text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-5 py-2 rounded text-sm font-medium 
                     hover:bg-blue-700 transition-colors duration-150
                     flex items-center space-x-1"
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
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
