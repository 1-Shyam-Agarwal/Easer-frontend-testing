import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../Services/operations/Auth';
import toast from 'react-hot-toast';


const UpdatePasswordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();


    if(password?.includes(" ") || confirmPassword?.includes(" "))
    {
       toast.error("Password and confirm password should not contain any spaces.");
       return;
    }

    if(password?.length < 8 || confirmPassword?.length < 8)
    {
        toast.error("Password and confirm password must be atleast 8 characters long.");
        return;
    }
    
    if(password !== confirmPassword)
    {
        toast.error("Passwords does not match.");
        return;
    }

    const token = location.pathname?.split('/')?.at(-1);
    updatePassword(password, confirmPassword, setLoading, token , navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {loading ? 
        (
          <div className="min-h-screen flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )
        : 
        (
          <div>
            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Choose New Password
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Almost done. Enter your new password and you're all set.
            </p>

            {/* Form */}
            <form onSubmit={submitHandler} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor='password'>
                  New Password <sup className="text-red-500">*</sup>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter New Password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    required
                    id="password"
                    pattern= "^.{8,}$"
                    title="Password must have atleast 8 characters."
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor='confirmPassword'>
                  Confirm Password <sup className="text-red-500">*</sup>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    value={confirmPassword}
                    id="confirmPassword"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-700">
                        Password must be atleast 8 characters long.
                      </p>
              </div>

              {/* Password Guidelines */}
              {/* <div className="text-sm text-gray-600">
                <ul className="list-disc ml-4 space-y-1">
                  <li>At least one lowercase character</li>
                  <li>At least one uppercase character</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                  <li>8 character minimum, 20 character maximum</li>
                </ul>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Reset Password
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link to="/login" className="text-blue-600 hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
