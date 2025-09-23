import Lottie from 'lottie-react';

const NoOrderDisplay = ({ displayText, LottieAnimation,setDisplayCheckoutModel }) => {
  return (
    <div className="text-center mt-12 text-gray-600 text-sm flex justify-center">
      <div className="flex flex-col-reverse lg:flex-row items-center px-4 sm:px-12 gap-6">
        <div className="translate-x-0 lg:translate-x-[20px] text-center lg:text-left">
          <div className="text-lg sm:text-xl font-montserrat font-medium" onClick={()=>{if(setDisplayCheckoutModel) {setDisplayCheckoutModel(true)}}}>
            {displayText}
          </div>
        </div>

        <Lottie
          animationData={LottieAnimation}
          loop={false}
          className="w-[220px] sm:w-[280px] md:w-[320px] lg:w-[350px] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[350px] mx-auto"
        />
      </div>
    </div>
  );
};

export default NoOrderDisplay;
