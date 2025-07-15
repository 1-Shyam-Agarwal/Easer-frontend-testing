import React from "react";
import Footer from "./HomePage/Components/Footer";
import { Navigate, useNavigate } from "react-router-dom";

const vendorPlans = [
  {
    name: "Free Trial",
    price: "₹0 (1.5 Months) *",
    description: "You just have to pay payment gateway charges",
    features: [
      "Unlimited Order Placement",
      "Analytical Insights",
      "7-Day Document Storage",
      "Order History (Last 7 Days).",
      "QR codes for quick access ",
      "Technical Support"
    ],
    cta: "Choose Plan",
    highlight: false,
  },
  {
    name: "1-Month Plan",
    price: "₹399 / month *",
    description: "(excluding payment gateway charges)",
    features: [
      "Unlimited Order Placement",
      "Analytical Insights",
      "7-Day Document Storage",
      "Order History (Last 7 Days).",
      "QR codes for quick access ",
      "Technical Support"
    ],
    cta: "Choose Plan",
    highlight: false,
  },
  {
    name: "6-Month Plan",
    price: "₹300 / month* ",
    description: "(excluding payment gateway charges)",
    features: [
      "Unlimited Order Placement",
      "Analytical Insights",
      "7-Day Document Storage",
      "Order History (Last 7 Days).",
      "QR codes for quick access ",
      "Technical Support"
    ],
    cta: "Choose Plan",
    highlight: true,
  },
  {
    name: "12-Month Plan",
    price: "₹225 / month *",
    description: "(excluding payment gateway charges)",
    features: [
      "Unlimited Order Placement",
      "Analytical Insights",
      "7-Day Document Storage",
      "Order History (Last 7 Days).",
      "QR codes for quick access ",
      "Technical Support"
    ],
    cta: "Choose Plan",
    highlight: false,
  },
];

const VendorPricingPage = () => {

  const navigate = useNavigate();
  const handleChoosePlan = (planName) => {
    navigate(`/signup/vendor/${planName}`);
  };

  return (
    <div>
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-[16px]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-normal text-gray-900">Vendor Pricing Plans</h2>
          <p className="mt-2 text-md text-gray-600">
            Choose a plan that works best for your business. Start with a free trial!
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {vendorPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-[4px] border p-6 shadow-md flex justify-between flex-col transition hover:scale-105 ${
                plan.highlight ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
              }`}
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-xl font-bold text-indigo-700">{plan.price}</p>
                <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-800">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>✔️</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => handleChoosePlan(plan.name)}
                className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-[4px] hover:bg-indigo-700 transition font-medium"
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default VendorPricingPage;
