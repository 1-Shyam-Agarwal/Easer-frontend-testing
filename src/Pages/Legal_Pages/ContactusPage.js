import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../Data/CountryCode.js';
import Footer from '../Public_pages/HomePage/Components/Footer.js';
import { handleContactDetails } from '../../Services/operations/GeneralOperations.js';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        message: '',
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitHandler = async (data) => {
    handleContactDetails(setLoading, data);
  };

  return (
    <div className="cursor-default">
      <div className="min-h-screen bg-[#fafafa] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-normal text-gray-900 mb-4">
              Get in Touch
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have a question or want to work together? Drop us a message below
              and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-[5px] shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Contact Information */}
              <div className="lg:col-span-4 bg-blue-50 p-8 lg:p-12">
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Our Office
                          </h4>
                          <p className="text-gray-600 mt-1 max-1040:text-[14px]">
                            Not Available Currently
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Email</h4>
                          <p className="text-gray-600 mt-1 max-1040:text-[14px]">
                            easer.helpdesk.india@gmail.com
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Phone</h4>
                          <p className="text-gray-600 mt-1 max-1040:text-[14px]">
                             For any query , You can contact your vendor.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-8 max-340:p-4 max-480:p-6 p-8 lg:p-12 bg-white">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="relative w-20 h-20">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="space-y-8 "
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                          htmlFor="firstName"
                        >
                          First Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          {...register('firstName', {
                            required: 'First name is required',
                            pattern: {
                              value: /^.{1,100}$/,
                              message:
                                'First name should be of length between 1 to 100.',
                            },
                          })}
                          className={`w-full px-4 py-3 rounded-[8px] border ${
                            errors?.firstName
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 ${
                            errors?.firstName
                              ? 'focus:ring-red-200'
                              : 'focus:ring-blue-200'
                          } transition-colors`}
                          placeholder="First Name"
                        />
                        {errors?.firstName && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors?.firstName?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          {...register('lastName', {
                            pattern: {
                              value: /^.{0,100}$/,
                              message:
                                'Should not be more than 100 characters.',
                            },
                          })}
                          className={`w-full px-4 py-3 rounded-[8px] border ${
                            errors?.lastName
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 ${
                            errors?.lastName
                              ? 'focus:ring-red-200'
                              : 'focus:ring-blue-200'
                          } transition-colors`}
                          placeholder="Last Name"
                        />
                        {errors?.lastName && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors?.lastName?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="emailAddress"
                      >
                        Email Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="emailAddress"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className={`w-full px-4 py-3 rounded-[8px] border ${
                          errors?.email
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-200 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 ${
                          errors?.email
                            ? 'focus:ring-red-200'
                            : 'focus:ring-blue-200'
                        } transition-colors`}
                        placeholder="Email Address"
                      />
                      {errors?.email && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors?.email?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="phoneNumber"
                      >
                        Mobile Number<span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4 ">
                        <select
                          {...register('countryCode')}
                          className="w-32 max-480:w-24 max-340:w-22 px-4 py-3 rounded-[8px] border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                        >
                          {CountryCode?.map((element, idx) => (
                            <option key={idx} value={element?.code}>
                              {element?.code} - {element?.country}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          id="phoneNumber"
                          {...register('mobileNumber', {
                            required: 'Mobile number is required',
                            pattern: {
                              value: /^[1-9]\d{7,14}$/,
                              message: 'Invalid mobile Number',
                            },
                          })}
                          className={`flex-1 px-4 py-3 rounded-[8px] border w-full ${
                            errors?.mobileNumber
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 ${
                            errors?.mobileNumber
                              ? 'focus:ring-red-200'
                              : 'focus:ring-blue-200'
                          } transition-colors`}
                          placeholder="Ph. Number"
                        />
                      </div>
                      {errors?.mobileNumber && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors?.mobileNumber?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="message"
                      >
                        Message<span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register('message', {
                          required: 'Message is required',
                        })}
                        rows={5}
                        id="message"
                        className={`w-full px-4 py-3 rounded-[8px] border ${
                          errors?.message
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-200 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 ${
                          errors?.message
                            ? 'focus:ring-red-200'
                            : 'focus:ring-blue-200'
                        } transition-colors resize-none`}
                        placeholder="How can we help you?"
                      />
                      {errors?.message && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors?.message?.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-500 text-white px-8 py-4 rounded-[8px] font-medium
                      hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200
                      transform transition-all duration-150 hover:scale-[0.99]
                      disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
