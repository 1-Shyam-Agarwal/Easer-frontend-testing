import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-1000 bg-gray-100 text-gray-800 ">
      <h1 className="text-6xl font-bold text-blue-600 max-390:scale-[0.90]">404</h1>
      <p className="text-2xl mt-4 text-center max-390:scale-[0.90]">Oops! Page Not Found</p>
      <p className="text-gray-600 mt-2 text-center max-450:scale-[0.90]">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 max-360:scale-[0.90] focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
