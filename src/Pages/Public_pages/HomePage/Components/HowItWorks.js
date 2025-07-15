import React from 'react';

const HowItWorks = () => {
  return (
    <div className='my-8 md:my-18 w-full flex justify-center items-center flex-col bg-[#FAFAFA] py-10 md:py-20 px-4'>
      <div className="flex flex-col justify-between items-center max-w-6xl">
        <h2 className="text-2xl md:text-4xl font-semibold text-center p-2 md:p-4">
          Say Goodbye to Long Queues
        </h2>
        
        <p className='p-2 md:p-4 text-center text-sm md:text-base range-450-768:w-3/4'>
          Say farewell to the complexities of the past and unlock a smoother path
          <br className="hidden md:block" />
          Welcome to a new era of simplicity and efficiency
        </p>
        <div className="w-[30px] h-[8px] rounded-full bg-[#E0299C]"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 align-items-center justify-items-center md:gap-12 my-12 w-full max-w-6xl px-4">
        <div className="flex flex-col items-center">
          <div className="text-xl md:text-2xl font-semibold text-black mb-4 border-4 animate-border-change border-statisticsGrey p-4 flex justify-center items-center w-16 h-16 md:w-20 md:h-20 rounded-full">
            01
          </div>
          <div className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center">
            Create Your User Account
          </div>
          <div className="text-gray-600 text-center text-sm md:text-base px-4 range-450-768:w-3/4">
            Creating an account on our website allows you to use it for the required time. We are always ready to support you anytime.
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-xl md:text-2xl font-semibold text-black mb-4 border-4 animate-border-change animation-delay-3000 border-statisticsGrey p-4 flex justify-center items-center w-16 h-16 md:w-20 md:h-20 rounded-full">
            02
          </div>
          <div className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center">
            Upload Your Documents
          </div>
          <div className="text-gray-600 text-center text-sm md:text-base px-4 range-450-768:w-3/4">
            After creating an account, you can upload your documents with specific printing instructions to meet your needs.
          </div>
        </div>

        <div className=" md:col-span-2 lg:col-span-1 justify-items-center items-center ">
          <div className='md:w-1/2 lg:w-full flex flex-col items-center'>
            <div className="text-xl md:text-2xl font-semibold text-black mb-4  border-4 animate-border-change animation-delay-6000 border-statisticsGrey p-4 flex justify-center items-center w-16 h-16 md:w-20 md:h-20 rounded-full">
              03
            </div>
            <div className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center">
              Review and Place Order
            </div>
            <div className="text-gray-600 text-center text-sm md:text-base px-4 range-450-768:w-3/4">
              Review your uploaded documents and place your printing order. We'll handle the rest and notify you once it's ready.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;