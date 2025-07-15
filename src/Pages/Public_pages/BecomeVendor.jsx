import React from "react";
import { Printer, Mail, Phone, AlertCircle, ChevronRight } from "lucide-react";
import Footer from "./HomePage/Components/Footer.js";

const BecomeVendor = () => {
  return (
    <div>
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
                  <h1 className="text-3xl font-normal text-black mb-2">
                  Become a Vendor on Easer
                </h1>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                  Join our platform to connect with students and provide essential printing services.
                </p>
              </div>
        <div className="bg-gray-100 font-sans leading-relaxed">
          <div className="container mx-auto my-4 max-480:p-2 p-6 bg-white shadow-lg rounded-[2px]">
            <div>
              {/* Steps Grid */}
              <div className="grid gap-8 mb-12">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className="relative flex flex-col sm:flex-row items-start gap-4 p-6 bg-white rounded-[2px] border border-gray-200 hover:border-blue-100 hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-normal text-gray-900 mb-2">
                        {step.title}
                      </h2>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      {step.details && (
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="bg-yellow-50 p-6 rounded-lg mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Tips for Successful Registration
                  </h2>
                </div>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Need Assistance?
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a href="mailto:easer.helpdesk.india@gmail.com" className="text-blue-600 hover:underline">
                    easer.helpdesk.india@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">+91-9311161298</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <p className="text-sm text-gray-500 text-center mt-8 p-4">
                By registering as a vendor, you agree to our{" "}
                <a href="/terms-and-conditions" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

// Data Arrays
const steps = [
  {
    title: "Visit Our Website",
    description: "Navigate to our website and locate the Pricing button in the middle part of the navigation bar.",
  },
  {
    title: "Choose a plan",
    description: "Select a plan that suits your business the most.",
  },
  {
    title: "Fill Out the Registration Form",
    description: "Provide all necessary information accurately:",
    details: [
      "Personal Information: Your name, email, contact number and college ",
      "Vendor Details: Shop details, pricing schema, fine schema and waiting time",
      "Mobile Number: For updates",
      "x-client-id and x-client-secret: Write it carefully otherwise you will not receive your payment.",
    ],
  },
  {
    title: "Verify Your Email",
    description: "Enter the OTP (One-Time Password) sent to your registered email for verification.",
  },
  {
    title: "Account Approval",
    description: "Please wait for our team to review and approve your application. During this process, we may contact you, so stay tuned. You will receive a confirmation email once your account is activated.",
  },
];

const tips = [
  "Double-check your mobile number to ensure you don't miss important updates ",
  "Verify the x-client-id and x-client-secret carefully to avoid payment processing issues.",
  "Provide accurate shop details to get quick approval from us and it also helps students to locate your shop easily.",
];

export default BecomeVendor;