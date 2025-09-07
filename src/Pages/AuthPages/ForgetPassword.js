import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../../Services/operations/Auth.js';
import { Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (email === '') {
      toast.error('Please Specify the email');
      return;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email))
      getPasswordResetToken(email, setEmailSent, setLoading);
    else toast.error('Invalid Email');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 cursor-default">
      <div className="w-full max-w-md space-y-8 mt-[-40px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-gray-900" />
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl">
                {emailSent ? 'Email Sent' : 'Reset Password'}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {emailSent
                  ? `Check your inbox at ${email}`
                  : "Enter your email and we'll send you instructions to reset your password."}
              </p>
            </div>

            {!emailSent ? (
              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                <form onSubmit={submitHandler} className="p-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-8 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 transition-colors duration-200"
                  >
                    Send Reset Link
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-green-100 rounded-xl p-8 text-center">
                <p className="text-green-800 font-normal">
                  Reset instructions have been sent to your email.
                  <br />
                  Check your spam folder if you don't see it.
                </p>
              </div>
            )}
          </>
        )}

        {!emailSent && (
          <div className="text-center">
            <a
              href="/login"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium gap-2 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
