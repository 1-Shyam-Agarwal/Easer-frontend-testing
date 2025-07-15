
import React from 'react';
import ProductGrid from "./Components/ProductGrid.jsx";

const Store = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🛒 Student Rewards Store
      </h1>
      <ProductGrid />
    </div>
  );
};

export default Store;
