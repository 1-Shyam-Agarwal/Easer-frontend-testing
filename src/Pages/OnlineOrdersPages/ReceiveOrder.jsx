import React, { useState } from 'react';
import { Package, Shield, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import { receiveUserOrder } from '../../Services/operations/OrderOperations';

const ReceiveOrder = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const token = useSelector((state) => state.auth.token);
  const path = window.location.pathname; 
  const orderId = path.split('/').pop();


  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 4) {
      setError('Please enter complete 4-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      const response = await receiveUserOrder(token , orderId , otpValue);
      // Here you would make the actual API call
      // const response = await receiveOrderAPI({ otp: otpValue });
      
      
      // Reset form
      setOtp(['', '', '', '']);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2 ">
      <div className="w-full max-w-md bg-white rounded-sm shadow-lg border p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Receive Order</h2>
          <p className="text-sm text-gray-600">
            Enter the 4-digit OTP provided by to you to confirm order pickup.
          </p>
        </div>

        {/* OTP Form */}
        <div className="space-y-6">
          {/* OTP Input */}
          {
            token ? <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              <Shield className="w-4 h-4 inline mr-1" />
              Enter OTP
            </label>
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  maxLength={1}
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>
          :
          <div className='text-center font-[20px] uppercase text-red-600 font-bold'> Please login to receive order </div> 
          }
          

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isOtpComplete || isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Confirm
              </>
            )}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Please provide the  Order OTP at the time of pickup. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiveOrder;