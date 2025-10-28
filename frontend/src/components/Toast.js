import React from "react";
import { useCart } from "../context/CartContext";

const Toast = () => {
  const { toast } = useCart();

  if (!toast.show) return null;

  const bgColor =
    {
      success: "bg-accent",
      error: "bg-danger",
      info: "bg-primary",
    }[toast.type] || "bg-accent";

  const icon = {
    success: (
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
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    error: (
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
    ),
    info: (
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
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  }[toast.type];

  return (
    <div className="fixed top-20 right-4 z-50 animate-slideIn">
      <div
        className={`${bgColor} text-white px-5 py-3 rounded shadow-lg flex items-center space-x-3 min-w-[280px]`}
      >
        <div className="flex-shrink-0">{icon}</div>
        <p className="font-normal text-sm">{toast.message}</p>
      </div>
    </div>
  );
};

export default Toast;
