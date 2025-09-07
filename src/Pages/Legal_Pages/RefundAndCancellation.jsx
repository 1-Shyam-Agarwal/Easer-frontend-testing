import React from 'react';
import Footer from '../Public_pages/HomePage/Components/Footer';

const RefundAndCancellationPolicy = () => {
  return (
    <div>
      <div className="bg-gray-100 font-sans p-4 leading-relaxed">
        <header className="text-blue-500 p-2">
          <div className="container mx-auto">
            <h1 className="text-2xl text-center font-medium">
              Refund And Cancellation Policy
            </h1>
          </div>
        </header>

        <main className="container mx-auto my-4 p-6 bg-white shadow-lg rounded-[5px]">
          <p className="text-gray-600 mb-4">
            Effective Date: <strong>20 January ,2025</strong>
          </p>

          <p className="text-gray-700 mb-4">
            At <strong>Easer</strong>, we strive to provide the best printing
            services to our users. This policy outlines the terms and conditions
            for refunds and cancellations to ensure a transparent and smooth
            process.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            1. Eligibility for Refunds
          </h2>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>
              Incorrect Orders that do not match the provided specifications.
            </li>
            <li>Duplicate payments made due to technical issues.</li>
            <li>
              If an order is cancelled by the user or vendor for any reason
              under online payment mode before the printing process has started.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            2. Non-Refundable Situations
          </h2>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>Change of mind after the printing of order has started.</li>
            <li>Incorrect details provided (e.g., printing configuration).</li>
            <li>Delays caused by the customer in picking up the order.</li>
            <li>Events beyond our control (e.g., natural disasters).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            3. Cancellation Policy
          </h2>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>
              {' '}
              An order can be cancelled at any time before the printing process
              begins, but once printing has started, cancellation is not
              allowed.
            </li>
            <li>
              In the case of offline payment mode, the user must reach the
              vendor within the given timeframe. Otherwise, the vendor will
              cancel the order. Since no payment was made in advance, no refund
              will be applicable.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            4. Refund Process
          </h2>
          <p className="text-gray-700 mb-4">
            No application is required for a refund; it will be processed
            automatically within 7-8 business days. If the refund is not
            received, you can directly contact the vendor you placed the order
            with. In case of any discrepancies, you can email us at{' '}
            <strong>easer.helpdesk.india@gmail.com.</strong>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            5. Payment Gateway Fees
          </h2>

          <p className="text-gray-700 mb-4">
            Refunds do not include non-refundable fees charged by third-party
            payment gateways unless the issue is caused by our vendors.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            6. Contact Information
          </h2>
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>
              Email:{' '}
              <a
                href="mailto:easer.helpdesk.india@gmail.com"
                className="text-blue-500 underline"
              >
                easer.helpdesk.india@gmail.com
              </a>
            </li>
            <li>Phone: +91 9311161298</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            7. Changes to this Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to update or modify this policy at any time.
            Please review it regularly.
          </p>

          <p className="text-gray-600 mt-8">
            By using Easer, you agree to this Refund and Cancellation Policy.
          </p>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RefundAndCancellationPolicy;
