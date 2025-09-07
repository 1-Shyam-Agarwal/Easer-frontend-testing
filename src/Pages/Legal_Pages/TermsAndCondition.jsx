import React from 'react';
import Footer from '../Public_pages/HomePage/Components/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="bg-gray-100 font-sans p-4 leading-relaxed">
        <header className="text-blue-500 p-2">
          <div className="container mx-auto">
            <h1 className="text-2xl text-center font-medium">
              Terms and Conditions
            </h1>
          </div>
        </header>

        <main className="container mx-auto my-4 p-6 bg-white shadow-lg rounded-[5px]">
          <p className="text-sm text-gray-600 mb-8">
            Effective Date: <strong>20 January ,2025</strong>
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p className="text-base text-gray-800">
              Welcome to Easer! By accessing or using our website
              (www.easer.co.in) and any associated services, you agree to be
              bound by these Terms and Conditions. These terms govern your use
              of Easer, and by accessing or using the platform, you consent to
              these terms. If you do not agree with any part of these terms,
              please refrain from using our services.
            </p>
            <p className="text-base text-gray-800">
              Easer reserves the right to modify these terms at any time. You
              are encouraged to check this page periodically for updates. The
              effective date of these terms will be indicated above.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. Definitions</h2>
            <ul className="list-disc pl-5 text-base text-gray-800">
              <li>
                <strong>User</strong>: Any individual or organization that uses
                the services provided by Easer to place printing orders.
              </li>
              <li>
                <strong>Vendor</strong>: A registered business or individual
                offering printing services via Easer's platform.
              </li>
              <li>
                <strong>Services</strong>: Refers to all functionalities
                provided by Easer, including document upload, print
                configuration, and payment processing.
              </li>
              <li>
                <strong>Order</strong>: A request made by a user for print
                services, including the upload of documents and specification of
                print preferences.
              </li>
              <li>
                <strong>Platform</strong>: Refers to the Easer website , which
                are used to interact with the services.
              </li>
              <li>
                <strong>Privacy Policy</strong>: A document that explains how
                Easer collects, uses, and protects your personal data.
              </li>
              <li>
                <strong>Fine Enforcement Time</strong>: The specific time frame
                set by the vendor within which the user must collect their
                order. If the order is not picked up within this time, a fine
                may be applied (only in the case of online payment mode).
              </li>
              <li>
                <strong>Fine Policy</strong>: The rules established by the
                vendor regarding fines for late order pickups. This policy
                applies only to users who have chosen online payment mode.
              </li>
              <li>
                <strong>Online Payment Mode</strong>: A payment method where the
                user pays in advance using digital payment options like UPI,
                credit/debit cards, net banking, or other online methods.
              </li>
              <li>
                <strong>Offline Payment Mode</strong>: A payment method where
                the user pays in cash or any other form of direct payment to the
                vendor at the time of order pickup.
              </li>
              <li>
                <strong>Penalty/Fine</strong>: An additional charge that a
                vendor may impose on a user if they fail to pick up their order
                within the Fine Enforcement Time. Fines apply only to online
                payments, and vendors cannot impose fines on users who select
                offline payment mode.
              </li>
              <li>
                <strong>Dispute</strong>: A disagreement between the user and
                the vendor regarding order pickup, fines, or penalties. Such
                disputes must be resolved directly between both parties, as
                Easer is not responsible for handling them.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              3. Acceptance of Terms
            </h2>
            <p className="text-base text-gray-800">
              By accessing and using Easer, you affirm that you are legally
              capable of entering into binding agreements. If you are under the
              age of 18, you must have parental or guardian consent to use our
              services.
            </p>
            <p className="text-base text-gray-800">
              You agree to comply with all applicable laws and regulations while
              using our services, and you acknowledge that any illegal or
              unauthorized use may result in termination of your access to
              Easer.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              4. Account Registration and Responsibilities
            </h2>
            <p className="text-base text-gray-800">
              In order to use the services, you must create an account on the
              platform. When you create an account, you agree to provide
              accurate, complete, and up-to-date information. You are
              responsible for maintaining the confidentiality of your account
              credentials and for any activities under your account.
            </p>
            <p className="text-base text-gray-800">
              You agree not to use the platform for fraudulent activities,
              including submitting false or misleading information, uploading
              harmful content, or violating intellectual property rights.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              5. Services Provided
            </h2>
            <p className="text-base text-gray-800">
              Easer provides a variety of services, including but not limited
              to:
            </p>
            <ul className="list-disc pl-5 text-base text-gray-800">
              <li>
                Document upload and printing customization (e.g., paper type,
                print quality, color, etc.) while making order.
              </li>
              <li>Payment of print orders.</li>
              <li>
                Vendor registration and management for providing printing
                services.
              </li>
              <li>
                Customer support for resolving any issues related to orders.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. Payment Terms</h2>
            <p className="text-base text-gray-800">
              Payments for orders placed on the platform must be completed in
              full before any work begins in case of online mode. Easer accepts
              various payment methods including credit/debit cards and other
              digital payment methods. Payment processing will be handled
              securely through third-party gateways, and all transactions are
              subject to the terms of the payment provider.
            </p>
            <p className="text-base text-gray-800">
              All pricing and taxes applicable to the user's order will be
              displayed at checkout. Easer's vendor reserves the right to change
              pricing at any time without prior notice, though prices for
              existing orders will be honored once the user has confirmed
              payment.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              7. Refund and Cancellation Policy
            </h2>
            <p className="text-base text-gray-800">
              Refunds may be requested under the following conditions:
            </p>
            <ul className="list-disc pl-5 text-base text-gray-800">
              <li>
                If the printed material is damaged or defective due to Easer's
                vendor fault.
              </li>
              <li>
                If the wrong specifications are used in the printing process
                (e.g., wrong size, color, etc.) that were not specified by the
                user.
              </li>
            </ul>
            <p className="text-base text-gray-800">
              Order can be cancelled if the printing process of your order has
              not yet started. Once printing has begun, cancellation will no
              longer be possible, and the user will be charged accordingly.
            </p>
            <p className="text-base text-gray-800">
              The refund will be issued either through the original payment
              method or via any other payment method used or easily available to
              the vendor, such as UPI, cash, or any other option. The refund
              will be processed within 7-8 business days and more.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              8. Shipping and Delivery
            </h2>

            <p className="text-base text-gray-700 leading-relaxed">
              Easer does not provide shipping or delivery services. Once an
              order is printed, the user will receive a notification in case of
              online payment mode indicating that their order is ready for
              pickup. The user is responsible for collecting their order within
              the specified time frame set by the vendor, referred to as{' '}
              <span className="font-semibold">"Fine Enforcement Time."</span>
            </p>

            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-2 mt-4">
                Order Pickup and Fine Policy
              </h3>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  The pickup process and conditions are determined by the vendor
                  from whom the user placed the order.
                </li>
                <li>
                  If a vendor has established a fine policy, users who have
                  selected{' '}
                  <span className="font-semibold">online payment mode</span> may
                  be subject to fines if they fail to collect their order within
                  the{' '}
                  <span className="font-semibold">Fine Enforcement Time</span>.
                </li>
                <li>
                  Users who have selected{' '}
                  <span className="font-semibold">offline payment mode</span>{' '}
                  will not be subject to any fines in any case.
                </li>
                <li>
                  A vendor does not have the right to impose fines in case of{' '}
                  <span className="font-semibold">offline payment mode</span>{' '}
                  under any circumstances.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">
                User Responsibilities
              </h3>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  The user must ensure timely pickup of their order as per the
                  vendor’s policy.
                </li>
                <li>
                  Any disputes regarding fines or late pickups must be resolved
                  between the user and the vendor directly.
                </li>
                <li>
                  <span className="font-semibold">Easer</span> is not
                  responsible for any penalties, fees, or disputes arising from
                  a vendor’s fine policy.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">9. User Content</h2>
            <p className="text-base text-gray-800">
              Users may upload content to Easer for printing purposes but only
              in pdf format, including but not limited to pdfs containing
              images, documents, logos. You retain all intellectual property
              rights to the content you upload, but you grant Easer & their
              Vendors a non-exclusive, royalty-free license to use the content
              solely for the purpose of fulfilling the print order.
            </p>
            <p className="text-base text-gray-800">
              Easer reserves the right to refuse or remove any content that
              violates its content policies or that it deems inappropriate or
              unlawful.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              10. Privacy and Data Protection
            </h2>
            <p className="text-base text-gray-800">
              Easer values your privacy and is committed to protecting your
              personal information. Our Privacy Policy outlines the details of
              how we collect, store, and use your personal data.
            </p>
            <p className="text-base text-gray-800">
              By using Easer, you consent to the collection and use of your
              personal data as described in our Privacy Policy. We do not share
              your personal data with third parties without your consent, except
              as necessary to fulfill your order or as required by law.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              11. Limitation of Liability
            </h2>
            <p className="text-base text-gray-800">
              Easer is not liable for any damages, losses, or expenses arising
              from the use of our platform, including but not limited to direct,
              indirect, incidental, or consequential damages.
            </p>
            <p className="text-base text-gray-800">
              In no event shall Easer's & Vendor's liability exceed the total
              amount paid by the user for the specific order giving rise to the
              claim.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              12. Termination and Suspension
            </h2>
            <p className="text-base text-gray-800">
              Easer reserves the right to suspend or terminate any account if
              the user violates these Terms and Conditions or engages in
              unlawful activities. Any remaining obligations under these terms
              will survive termination.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              13. Governing Law and Dispute Resolution
            </h2>
            <p className="text-base text-gray-800">
              These Terms and Conditions are governed by the laws of India. Any
              disputes arising out of or relating to these terms will be
              resolved through arbitration or mediation.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              14. Contact Information
            </h2>
            <p className="text-base text-gray-800">
              For any questions or concerns, you can contact us at:
            </p>
            <ul className="list-none pl-0 text-base text-gray-800">
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
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
