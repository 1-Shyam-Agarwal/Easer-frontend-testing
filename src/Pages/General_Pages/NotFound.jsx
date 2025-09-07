import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../Assets/Lotties/404-notfound.json';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white text-gray-800 px-4 lg:px-16">
      {/* Text Section */}
      <div className="flex flex-col items-center  text-center lg:text-left max-w-md lg:max-w-lg mb-8 lg:mb-0 lg:mr-8">
        <p className="text-2xl sm:text-3xl md:text-4xl font-normal">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Go Back
        </button>
      </div>

      {/* Lottie Animation Section */}
      <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[600px] xl:h-[600px]">
        <Lottie
          animationData={notFoundAnimation}
          loop={true}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
