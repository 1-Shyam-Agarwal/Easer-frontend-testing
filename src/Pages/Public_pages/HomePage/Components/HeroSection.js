import React from 'react';
import { Link } from 'react-router-dom';
import heroSectionImage from '../../../../Images/herosection.png';
import dots from '../../../../Images/dots.png';
import zigzags from '../../../../Images/zigzags.png';
import plus from '../../../../Images/plus.png';
import circle from '../../../../Images/circle.png';
import cube from '../../../../Images/cube.png';

const HeroSection = () => {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-8 md:px-8">
        <div className="flex max-870:flex-col flex-row items-center gap-8 md:gap-12">
          {/* Left Content */}
          <div className="max-870:w-full w-1/2 max-870:text-center text-left">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-medium mb-8">
              <span className="text-blue-600">Revolutionizing</span> the Printing Process.
            </h1>
            
            <p className="text-gray-600 text-lg mb-8">
              Submit your print orders directly through our platform 
              and eliminate the hassle of waiting in long lines.
              Experience a seamless process with instant notifications 
              and fast pickups at your campus store.
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
            <div className="w-[330px] max-480:w-[250px] range-768-915:w-[290px]   aspect-square rounded-full bg-orange-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            
            <img 
              src={heroSectionImage} 
              alt="Hero illustration"
              className="relative z-10 w-full max-w-[500px] mx-auto"
            />
            
            
            <img src={dots} alt="" className="absolute top-8 right-4 w-16 animate-bounce hidden md:block" />
            <img src={zigzags} alt="" className="absolute bottom-4 right-1/4 w-16 hidden md:block" />
            <img src={cube} alt="" className="absolute top-5 left-12 w-12 animate-scaleUpDown hidden md:block" />
            <img src={plus} alt="" className="absolute top-3/4 left-[180px] w-8 animate-slowspin hidden md:block" />
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default HeroSection;