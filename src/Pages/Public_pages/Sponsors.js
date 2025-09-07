import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import Footer from './HomePage/Components/Footer';

const sponsors = [
  {
    name: 'ABC Enterprises',
    role: 'Platinum Sponsor',
    description: 'Looking for Sponsorship',
    color: '#E5E4E2',
  },
  {
    name: 'PQR Solutions',
    role: 'Gold Sponsor',
    description: 'Looking for Sponsorship',
    color: '#FFD700',
  },
  {
    name: 'XYZ Systems',
    role: 'Silver Sponsor',
    description: 'Looking for Sponsorship',
    color: '#C0C0C0',
  },
];

const Sponsors = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-16 px-4 cursor-default">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-normal text-gray-900 mb-4">
              Our Valued Partners
            </h1>
            <div className="h-[4px] w-20 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center items-center md:gap-6 lg:gap-12 ">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className={`group lg:p-12 md:p-8  p-8 rounded-lg shadow-xl  range-450-767:w-3/4 md:w-auto w-full bg-white transition-all duration-300 bg-blue/50md:${index === 0 ? 'ml-4' : index === 2 ? 'mr-4' : ''} backdrop-blur-sm`}
              >
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center bg-gray-200 justify-center">
                    <FaBuilding className="text-[20px]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center">
                    {sponsor?.name}
                  </h3>
                  <p
                    style={{ color: sponsor?.color }}
                    className="text-sm font-medium text-center mt-1"
                  >
                    {sponsor?.role}
                  </p>
                </div>
                <p className="text-gray-600 text-center text-sm">
                  {sponsor?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sponsors;
