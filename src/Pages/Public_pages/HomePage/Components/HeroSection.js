import React from 'react';
import { Link } from 'react-router-dom';
import heroSectionImage from '../../../../Assets/Images/herosection.webp';
import dots from '../../../../Assets/Images/dots.webp';
import plus from '../../../../Assets/Images/plus.webp';
import cube from '../../../../Assets/Images/cube.webp';
import HeroSectionLottie from '../../../../Assets/Lotties/Online Learning.json';
import Lottie from 'lottie-react';

const HeroSection = () => {
  return (
    <div className="w-full sm:mt-8 py-12 md:py-20 cursor-default">
      <div className="max-w-6xl mx-auto px-8 md:px-8">
        <div className="flex max-870:flex-col flex-row items-center gap-8 md:gap-12">
          {/* Left Content */}
          <div className="max-870:w-full w-1/2 max-870:text-center text-left">
            <h1 className="text-2xl md:text-3xl font-normal mb-8">
              <div className="text-4xl md:text-[42px] mb-[4px] text-orange-400 font-medium font-montserrat">
                Focus on what matters
              </div>{' '}
              We'll Get Your Prints Done
            </h1>

            <p className="text-gray-600 text-lg mb-8 text-justify">
              Submit your print orders directly through our platform and
              eliminate the hassle of waiting in long lines. Experience a
              seamless process with instant notifications and fast pickups at
              your campus store.
            </p>

            <div className="flex max-870:justify-center justify-start">
              <Link
                to="/signup/user"
                className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800 transition-colors"
              >
                Explore More
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 relative max-340:mt-[30px] max-480:mt-[5px]">
            <Lottie animationData={HeroSectionLottie} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
