import React from 'react';
import { useState, useEffect } from 'react';
import AddDocsModal from './AddDocs/AddDocumentModel.jsx';
import { RxCross1 } from 'react-icons/rx';
import PaymentSummary from './PaymentSummary.jsx';

const Checkout = ({ setCheckoutModelVisibility, filteredVendorsData,setDisplayCheckoutModel }) => {
  const [filesWithConfigs, setFilesWithConfigs] = useState([]);
  const [displayAddDocumentsWindow, setDisplayAddDocumentsWindow] =
    useState(true);
  const [displayPDFWarning , setDisplayPDFWarning] = useState(false);
  const [displayPayemntSummaryModel, setDisplayPaymentSummaryModel] =
    useState(false);
  const [displayCross, setDisplayCross] = useState(true);
  const [invoice, setInvoice] = useState({});

  function setPaymentSummaryModelVisibility(value) {
    setDisplayPaymentSummaryModel(value);
  }

  function setAddDocumentsModelVisibility(value) {
    setDisplayAddDocumentsWindow(value);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="w-full max-w-5xl h-full max-h-[95vh] sm:h-[80vh] sm:max-h-[80vh] bg-white rounded-none sm:rounded px-4 sm:px-6 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-4 sm:px-6 py-3 border-b flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800">
            {displayAddDocumentsWindow
              ? 'Add Documents'
              : displayPayemntSummaryModel
                ? 'Payment'
                : ''}
          </h2>
          {displayCross && (
            <button
              onClick={() => {
                setCheckoutModelVisibility(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <RxCross1 className="text-lg sm:text-xl text-gray-600" />
            </button>
          )}
        </div>

        {displayAddDocumentsWindow && (
          <AddDocsModal
            filesWithConfigs={filesWithConfigs}
            setFilesWithConfigs={setFilesWithConfigs}
            filteredVendorsData={filteredVendorsData}
            setAddDocumentsModelVisibility={setAddDocumentsModelVisibility}
            setPaymentSummaryModelVisibility={setPaymentSummaryModelVisibility}
            setInvoice={setInvoice}
            setDisplayPDFWarning={setDisplayPDFWarning}
          />
        )}

        {displayPayemntSummaryModel && (
          <PaymentSummary
            setAddDocumentsModelVisibility={setAddDocumentsModelVisibility}
            setPaymentSummaryModelVisibility={setPaymentSummaryModelVisibility}
            invoice={invoice}
            filesWithConfigs={filesWithConfigs}
            setDisplayCheckoutModel={setDisplayCheckoutModel}
          />
        )}

        {
          displayPDFWarning &&
          <div className='fixed inset-0 bg-black/70 text-white z-50 flex items-center justify-center'>
            <div className='bg-white text-gray-800 rounded-[5px] shadow-2xl p-8 max-w-md mx-4 transform transition-all duration-300 border border-gray-200'>
              <div className='text-center'>
                {/* <div className='bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                  </svg>
                </div> */}

                <h2 className='text-xl font-semibold text-gray-900 mb-3'>
                  Important
                </h2>

                <p class="text-sm text-gray-700 mb-6 leading-relaxed">
                  Only PDF files are accepted in remote printing.
                </p>
                <button class='bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-[5px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
                  onClick={() => { setDisplayPDFWarning(false) }}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Checkout;