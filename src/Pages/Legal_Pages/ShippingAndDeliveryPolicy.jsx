import React from "react";
import Footer from "../Public_pages/HomePage/Components/Footer";

const ShippingAndDeliveryPolicy = () => {
  return (

    <div>
      <div className="bg-gray-100 font-sans p-4 leading-relaxed">
        <header className="text-blue-500 p-2">
          <div className="container mx-auto">
            <h1 className="text-2xl text-center font-medium">Shipping And Delivery Policy</h1>
          </div>
        </header>

        <main className="container mx-auto my-4 p-6 bg-white shadow-lg rounded-[5px]">
        <p className="text-gray-600 mb-4">
          Effective Date: <strong>20 January ,2025</strong>
        </p>

        <p className="text-gray-700 mb-4">
                Easer does not provide shipping or delivery services. Once an order is printed, the user will receive a notification 
                in case of online payment mode indicating that their order is ready for pickup. The user is responsible for collecting 
                their order within the specified time frame set by the vendor, referred to as <span className="font-semibold">"Fine Enforcement Time."</span>
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">
          Order Collection Process
        </h2>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>
            Once an order is processed and ready, you will be notified via email
            or SMS or what's app in case of online payment mode.
          </li>
          <li>
          Once it is your turn, you will be notified via email, SMS, or WhatsApp if you have chosen the offline payment mode. You must reach the vendor within the given timeframe; otherwise, the vendor will automatically cancel your order.
          </li>
          <li>
            Orders can be collected during the vendor shop’s working hours, as
            specified on the shop's detail page
          </li>
          <li>
            Please bring the order Id mentioned on the your order for
            verification purposes when collecting your order.
          </li>
        </ul>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2 mt-6">Order Pickup and Fine Policy</h3>
          
          <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The pickup process and conditions are determined by the vendor from whom the user placed the order.</li>
              <li>If a vendor has established a fine policy, users who have selected <span className="font-semibold">online payment mode</span> may be subject to fines if they fail to collect their order within the <span className="font-semibold">Fine Enforcement Time</span>.</li>
              <li>Users who have selected <span className="font-semibold">offline payment mode</span> will not be subject to any fines in any case.</li>
              <li>A vendor does not have the right to impose fines in case of <span className="font-semibold">offline payment mode</span> under any circumstances.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 mt-6">User Responsibilities</h3>
          
          <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The user must ensure timely pickup of their order as per the vendor’s policy.</li>
              <li>Any disputes regarding fines or late pickups must be resolved between the user and the vendor directly.</li>
              <li><span className="font-semibold">Easer</span> is not responsible for any penalties, fees, or disputes arising from a vendor’s fine policy.</li>
          </ul>
        </section>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Important Notes
        </h2>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>
            Ensure that the details provided during the order process (e.g.,
            printing specifications, shop selection) are accurate to avoid
            delays.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 mb-4">
          For questions or assistance, please contact us:
        </p>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>Email: <a href="mailto:easer.helpdesk.india@gmail.com" className='text-blue-500 underline'>easer.helpdesk.india@gmail.com</a></li>
          <li>Phone: +91 9311161298</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Changes to this Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to update or modify this policy at any time.
          Please review it regularly.
        </p>

        <p className="text-gray-600 mt-8">
          By using Easer, you acknowledge and agree to this Shipping and
          Delivery Policy.
        </p>
      
        </main>
      </div>
      <Footer />
    </div>
    
  );
};

export default ShippingAndDeliveryPolicy;
