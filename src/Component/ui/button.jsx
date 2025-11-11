// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition ${className}`}
    >
      {children}
    </button>
  );
};
