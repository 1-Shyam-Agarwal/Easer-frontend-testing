import React from 'react';

const statisticsPanel = () => {
  return (
    <div className="flex justify-center  py-4">
      <div className="flex justify-between max-w-11/12 items-center max-768:flex-col">
        <div className="flex flex-col p-2 justify-center left-2 items-center min-w-250 max-768:min-w-[200px] border-4 max-768:p-2 border-solid border-statisticsGrey rounded-lg">
          <div className="text-[45px] text-[#FF5C00] max-768:text-[30px]">
            10000K+{' '}
          </div>
          <div className="text-[20px]">Successful Orders</div>
        </div>

        <div className="text-4xl text-[#AEA8A8] font-semibold p-4 max-768:p-2 max-768:text-3xl">
          &
        </div>

        <div className="flex flex-col p-2 justify-center items-center min-w-250 max-768:min-w-[200px] border-4 max-768:p-2 border-solid border-statisticsGrey rounded-lg">
          <div className="text-[45px] max-768:text-[30px] text-[#0057FF]">
            500000
          </div>
          <div className="text-[20px]">Registered Shop</div>
        </div>

        <div className="text-4xl text-[#AEA8A8] font-semibold p-4 max-768:p-2 max-768:text-3xl">
          &
        </div>

        <div className="flex flex-col p-2 justify-center items-center min-w-250 right-2 max-768:min-w-[200px] max-768:p-2 border-4 border-solid border-statisticsGrey rounded-lg">
          <div className="text-[45px] max-768:text-[30px] text-[#1DCD00]">
            28
          </div>
          <div className="text-[20px]">State Covered</div>
        </div>
      </div>
    </div>
  );
};

export default statisticsPanel;
