import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

function SuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  function navigateBack() {
    navigate(-1);
  }

  useEffect(() => {
    const timer = setTimeout(navigateBack, 5000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopstate = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 transition-all duration-300">
        <div className="relative mb-6">
          <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 relative">
            {/* Circular progress background */}
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                className="text-gray-200"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                r="42"
                cx="50"
                cy="50"
              />
              <circle
                className="text-green-500 animate-[circle_1s_ease-out_forwards]"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                r="42"
                cx="50"
                cy="50"
                style={{
                  strokeDasharray: '264, 264',
                  strokeDashoffset: 264,
                }}
              />
            </svg>

            {/* Checkmark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M20 50L40 70L80 30"
                  className="text-green-500 animate-[check_0.6s_ease-out_0.8s_forwards]"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                  }}
                />
              </svg>
            </div>
          </div>

          <div className="absolute -top-2 -right-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold animate-[fadeIn_0.5s_ease-out]">
              {countdown}
            </div>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl  md:text-3xl font-normal text-gray-900 mb-3 animate-[slideUp_0.5s_ease-out]">
          Order Successfully Placed!
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mb-6 animate-[slideUp_0.5s_ease-out_0.1s_both]">
          Thank you for your purchase. We'll send you notification when your
          order is ready.
        </p>

        <div className="mb-8 animate-[slideUp_0.5s_ease-out_0.2s_both]">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-linear"
              style={{
                width: `${(countdown / 5) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Redirecting you back in {countdown} seconds...
          </p>
        </div>

        <style jsx>{`
          @keyframes circle {
            from {
              stroke-dashoffset: 264;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes check {
            from {
              stroke-dashoffset: 100;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default SuccessPage;
