import React from 'react';
import toast from 'react-hot-toast';
import { Info } from 'lucide-react';

const infoToast = (message, duration = 3000) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t?.visible ? 'animate-enter' : 'animate-leave'
        } relative max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-center gap-3 p-4 border-l-4 border-yellow-500 overflow-hidden`}
      >
        {/* Info Icon Container */}
        <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
          <Info className="h-5 w-5 text-yellow-600" />
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>

        {/* Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-yellow-500"
          style={{
            animation: `progress-shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    ),
    {
      duration: duration,
      position: 'top-right',
    }
  );
};

// Add the required keyframes using a styled component
const style = document.createElement('style');
style.textContent = `
  @keyframes progress-shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;
document.head.appendChild(style);

export default infoToast;
