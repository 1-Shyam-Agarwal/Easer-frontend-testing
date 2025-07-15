import React from 'react';
import Footer from '../Public_pages/HomePage/Components/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="bg-gray-100 font-sans p-4 leading-relaxed">
        <header className="text-blue-500 p-2">
          <div className="container mx-auto">
            <h1 className="text-2xl text-center font-medium">Privacy Policy</h1>
          </div>
        </header>

        <main className="container mx-auto my-4 p-6 bg-white shadow-lg rounded-[5px]">
          <p className="text-sm text-gray-600 mb-8">Effective Date: <strong>20 January ,2025</strong></p>
          <section>
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              At Easer, we prioritize your privacy and are dedicated to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services. 
              We are committed to keeping and protecting your information as confidential. However, we may disclose it when required to comply with legal processes or to protect Easer's rights, interests, or property.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Information Collection</h2>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Personal details such as name, email, phone number,college Details for users and vendors.</li>
              <li>Vendor-specific information, including pricing schema, fine schema , shop details, payment gateway details, and waiting preferences.</li>
              <li>Order details, including document printing specifications, files, and payment information.</li>
              <li>Data collected automatically, such as cookies and usage logs (e.g., IP address, browser type, and user interactions).</li>
              <li>Data stored in local storage, such as login tokens or user preferences.</li>
            </ul>
            <p className="mb-4">
              We collect this information through website forms, cookies, and interactions with our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Usage of Data</h2>
            <p className="mb-4">Your data is used for the following purposes:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Processing and fulfilling orders efficiently.</li>
              <li>Providing customer support and resolving technical or order-related issues.</li>
              <li>Improving our website's functionality and services based on user feedback and usage patterns.</li>
            </ul>

            <p className="mb-4">
              We may share your data with trusted third-party services for the following purposes:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Cloudinary serves as a media storage platform for ordered file uploads and other files, such as profile images, and we retains them only until the order is either cancelled or successfully processed.</li>
              <li>Payment gateways are used to securely process your transactions.</li>
              <li>MongoDB is utilized for storing your data and ensuring efficient database management.</li>
            </ul>

            <p className="mb-4">
              For payment processing, individual vendor accounts will use a unique Merchant ID or API Key, and Salt Key to ensure payments are routed to the correct vendor efficiently.
            </p>

          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">User Rights</h2>
            <p className="mb-4">As a user, you have the right to:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Access, review, and request updates to the information we hold about you.</li>
              <li>Request deletion of your personal data from our systems, where applicable.</li>
              <li>Place print orders, review their status, and cancel or modify them before they are processed.</li>
              <li>Contact us with any concerns about your data at&nbsp; 
                <a href="mailto:easer.helpdesk.india@gmail.com" className="text-blue-500 underline">easer.helpdesk.india@gmail.com</a>.
              </li>
              <li>For vendors, you have the right to process orders as they are received, modify them when necessary, or delete orders that are not viable or have been canceled by the user.</li>
              <li>As a vendor, you may request support for any issues related to order fulfillment or payment processing.</li>

            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Vendor Rights</h2>
            <p className="mb-4">As a vendor, you have the right to:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Access, review, and request updates to the information we hold about you.</li>
              <li>Request deletion of your personal data from our systems, where applicable.</li>
              <li>You have the right to process orders as they are received, modify them when necessary, or delete orders that are not viable or have been canceled by the user.</li>
              <li>You may request support for any issues related to order fulfillment or payment processing.</li>
              <li>Contact us with any concerns about your data at&nbsp;
                <a href="mailto:easer.helpdesk.india@gmail.com" className="text-blue-500 underline">easer.helpdesk.india@gmail.com</a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We use advanced security measures, such as encryption, secure servers, and access controls, to protect your data from unauthorized access or disclosure. However, we recommend ensuring your device and account credentials are secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Policy Updates</h2>
            <p className="mb-4">
              This Privacy Policy may be updated periodically to reflect changes in our practices or regulations. We will notify you of significant changes through email or a prominent notice on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at&nbsp;
               <a href="mailto:easer.helpdesk.india@gmail.com" className="text-blue-500 underline">easer.helpdesk.india@gmail.com</a>.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
