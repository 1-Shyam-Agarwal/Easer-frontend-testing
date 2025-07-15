import React from 'react';
import { FaBoxOpen } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden border border-gray-200">
      <div className="relative bg-gray-100 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />

        {/* Stock Badge */}
        <div className="absolute top-3 left-3 bg-[#14213d] text-white text-xs px-3 py-1 rounded-full shadow">
          Stock: {product.count}
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between h-[200px]">
        <div>
          <h2 className="text-md font-semibold text-gray-800 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-[#14213d]">₹{product.points}</span>
          <FaBoxOpen className="text-[#fca311] text-lg" />
        </div>

        <button className="mt-4 bg-[#fca311] text-white rounded-xl py-2 font-medium hover:bg-[#e88f00] transition w-full shadow-md">
          Redeem Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
