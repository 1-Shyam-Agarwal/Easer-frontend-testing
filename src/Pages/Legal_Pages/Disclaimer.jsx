import React from 'react';
import Footer from '../Public_pages/HomePage/Components/Footer';

const Disclaimer = () => {
  return (
    <div>
        <div className="bg-gray-100 font-sans p-4 leading-relaxed">

            <header className="text-blue-500 p-2">
            <div className="container mx-auto">
                <h1 className="text-2xl text-center font-medium">Disclaimer</h1>
            </div>
            </header>

        <main className="container mx-auto my-4 p-6 bg-white shadow-lg rounded-[5px]">
        
            <p className="text-sm text-gray-600 mb-8">Effective Date: <strong>20 January,2024</strong></p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. General Information</h2>
                <p className="text-base text-gray-800">
                The information provided on the Easer platform (www.easer.co.in) is for general informational purposes only. While we strive to keep the content accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
                </p>
                <p className="text-base text-gray-800">
                Any reliance you place on such information is therefore strictly at your own risk. In no event will Easer be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage arising from loss of data or profits arising out of, or in connection with, the use of this website.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. External Links</h2>
                <p className="text-base text-gray-800">
                Through this website, you may able to link to other websites that are not under the control of Easer. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                </p>
                <p className="text-base text-gray-800">
                Easer is not responsible for the content or reliability of any external websites linked to or from our platform. We do not accept any responsibility for the content of websites linked to from our platform.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Third-Party Services</h2>
                <p className="text-base text-gray-800">
                Easer may offer services and products provided by third parties, including Cashfree's payment gateway, printing vendors, and Cloudinary as a cloud-based storage service for handling document uploads and storage. Easer does not control or monitor these third-party services and disclaims all responsibility for their actions, including delays, errors, or problems related to their services.
                </p>
                <p className="text-base text-gray-800">
                Any interactions you have with third parties via Easer are solely between you and the third party. We encourage you to review the terms and conditions, privacy policies, and disclaimers of any third-party services you use.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Accuracy of Information</h2>
                <p className="text-base text-gray-800">
                While we aim to provide accurate and up-to-date information about products, services, and order details, errors may occasionally occur. We do not guarantee that all information on the platform is accurate, complete, or free of errors. Easer reserves the right to correct any mistakes and update the content on our platform at any time without prior notice.
                </p>
                <p className="text-base text-gray-800">
                We are not responsible for any inaccuracies or errors in the information provided on the website, including pricing, descriptions, and availability of products or services.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. No Warranty</h2>
                <p className="text-base text-gray-800">
                Easer makes no representations or warranties, either express or implied, regarding the operation of this website, the accuracy of the information, or the services provided. The services are provided "as is," and we disclaim any and all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p className="text-base text-gray-800">
                Easer does not guarantee that the platform will be free from errors, viruses, or harmful components. You agree to use the platform at your own risk.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
                <p className="text-base text-gray-800">
                To the fullest extent permitted by law, Easer, its directors, employees, partners, agents, or suppliers shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the platform or services, even if we have been advised of the possibility of such damages.
                </p>
                <p className="text-base text-gray-800">
                Easer’s and their vendor's liability shall not exceed the total amount paid by you for the services or products involved in the action giving rise to the claim.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Indemnity</h2>
                <p className="text-base text-gray-800">
                You agree to indemnify, defend, and hold harmless Easer, its affiliates, officers, directors, employees, agents, and vendors from any claims, losses, damages, liabilities, or expenses, including legal fees, arising out of your use or misuse of the platform, your violation of these terms, or your infringement of any rights of another party.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">8. Changes to the Disclaimer</h2>
                <p className="text-base text-gray-800">
                Easer reserves the right to modify or update this disclaimer at any time without prior notice. All changes will be effective immediately upon posting to this page. We encourage you to check this page regularly for any updates.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
                <p className="text-base text-gray-800">
                This disclaimer is governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with this disclaimer shall be subject to the exclusive jurisdiction of the courts located in Delhi.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">10. Contact Information</h2>
                <p className="text-base text-gray-800">
                If you have any questions about this Disclaimer or any other part of our platform, please feel free to contact us at:
                </p>
                <ul className="list-none pl-0 text-base text-gray-800">
                    <li>Email: <a href="mailto:easer.helpdesk.india@gmail.com" className='text-blue-500 underline'>easer.helpdesk.india@gmail.com</a></li>
                    <li>Phone: +91 9311161298</li>
                </ul>
            </section>
            </main>
        </div>
        <Footer />
    </div>
  );
};

export default Disclaimer;
