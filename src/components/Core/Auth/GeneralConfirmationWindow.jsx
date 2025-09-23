import React from 'react';

const ConfirmationModal = (props) => {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/40 backdrop-blur-lg z-50 p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <h4 className="text-xl font-semibold text-white mb-4 text-center">
          {props?.heading}
        </h4>
        <p className="text-gray-300 text-center mb-6">{props?.description}</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            className="bg-green-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
            onClick={props?.agreeController}
          >
            {props?.agreeText}
          </button>
          <button
            className="bg-red-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
            onClick={props?.disagreeController}
          >
            {props?.disagreeText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
