import React from 'react';
import { useState, useEffect } from 'react';
import AddDocsModal from './AddDocs/AddDocumentModel.jsx';
import { RxCross1 } from 'react-icons/rx';
import PaymentSummary from './PaymentSummary.jsx';

const Checkout = ({ setCheckoutModelVisibility, filteredVendorsData }) => {
  const [filesWithConfigs, setFilesWithConfigs] = useState([]);
  const [displayAddDocumentsWindow, setDisplayAddDocumentsWindow] =
    useState(true);
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
      <div className="w-[70%] h-[80%] bg-white rounded px-6 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-3 border-b flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-800">
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
              <RxCross1 className="text-xl text-gray-600" />
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
          />
        )}

        {displayPayemntSummaryModel && (
          <PaymentSummary
            setAddDocumentsModelVisibility={setAddDocumentsModelVisibility}
            setPaymentSummaryModelVisibility={setPaymentSummaryModelVisibility}
            invoice={invoice}
            filesWithConfigs={filesWithConfigs}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
