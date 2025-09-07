import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './HomePage/Components/Footer';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What services do you offer?',
          answer:
            'We offer a variety of printing services, including document printing, color printing, and custom printing solutions for students and institutions.',
        },
        {
          question: 'How can I place an order?',
          answer:
            'First, you need to sign up on our website. Then, select a shop from the list of registered shops. Click the ' +
            ' sign, upload your documents, and specify the printing configurations. Finally, make the payment to place your order',
        },
        {
          question: 'Do I need to pay anything to create an account?',
          answer:
            'If you are a vendor, then yes, you need to pay. However, if you are a user, you don’t need to pay anything.',
        },
      ],
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'What file formats do you accept?',
          answer: 'We only accept PDF format .',
        },
        {
          question: 'What is the turnaround time for orders?',
          answer:
            'Turnaround time varies depending on the volume of orders. For urgent requests, please contact the vendor from whom you placed the order.',
        },
      ],
    },
    {
      category: 'Pricing',
      questions: [
        {
          question:
            'Do different vendors within an institute have the same price schema, or does each vendor have a different price schema?',
          answer:
            'Different vendors within an institute will have their own price schema.',
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept various payment methods, including credit/debit cards, PayPal, and cash at the physical location.',
        },
        {
          question:
            'How can I view the price schema of different shops in my college on Easer?',
          answer:
            'Log in to your account, navigate to ( College Shops ) from the sidebar, and click the ( View Details ) button of the shop whose price schema you want to see.',
        },
      ],
    },
    {
      category: 'Orders',
      questions: [
        {
          question: 'How can I track my order?',
          answer:
            'Once your order is placed, you will track your order status in your dashboard.',
        },
        {
          question: 'How many documents I can upload in a single order?',
          answer:
            'You can upload any number of documents, but each document must be 9MB or smaller',
        },
        {
          question: 'Can I cancel my order?',
          answer:
            'Yes, you can cancel your order before it reaches the printing stage. You can do this from your ( Ongoing Orders ) dashboard or the ( Order Queue ) dashboard of the shop where you placed the order.',
        },
      ],
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs
    ?.map((category) => ({
      ...category,
      questions: category?.questions?.filter(
        (faq) =>
          faq?.question?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          faq?.answer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      ),
    }))
    .filter((category) => category?.questions?.length > 0);

  return (
    <div className="cursor-default">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-normal text-gray-900 mb-4 animate-fade-in">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find answers to common questions about our printing services
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-[5px] border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs?.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-xl font-normal text-gray-800 mb-4">
                {category?.category}
              </h2>
              <div className="space-y-4">
                {category?.questions?.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={questionIndex}
                      className={`bg-white rounded-[5px] shadow-sm border border-gray-200 transition duration-200 ${
                        isOpen ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => toggleAnswer(index)}
                        className="w-full text-left px-6 py-4 flex justify-between items-center gap-4"
                      >
                        <span className="text-lg text-gray-700 font-normal">
                          {faq?.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`px-6 overflow-hidden transition-all duration-200 ${
                          isOpen ? 'pb-4' : 'max-h-0'
                        }`}
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq?.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help section */}
        <div className="max-w-4xl mx-auto mt-12 text-center px-4">
          <div className="bg-blue-50 rounded-[5px] p-8">
            <h2 className="text-xl font-normal text-gray-900 mb-2">
              Still need help?
            </h2>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? We're here to help.
            </p>
            <Link
              className="bg-blue-600 text-white px-6 py-2 rounded-[5px] hover:bg-blue-700 transition duration-200"
              to="/contactus"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;
