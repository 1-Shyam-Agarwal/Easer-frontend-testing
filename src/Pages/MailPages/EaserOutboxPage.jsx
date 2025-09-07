import React from 'react';
import ComposeModal from './components/ComposeModal';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFilteredVendorsWithMinimumDetails } from '../../Services/operations/GetInformaitonOperations/VendorRelatedOps';
import { fetchCustomerMails } from '../../Services/operations/OutboxOps';
import infoToast from '../../components/Core/Auth/InfoToast';
import { createOutboxMail } from '../../Services/operations/OutboxOps';
import CustomerMailCards from './components/CustomerMailCards';
import MailSearchBar from './components/MailSearchBar';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchFilteredMailsByFileName } from '../../Services/operations/OutboxOps';
import { FaPlus } from 'react-icons/fa6';
import { PollingCustomerMails } from '../../Services/operations/OutboxOps';

const EaserOutboxPage = () => {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [filteredVendorsData, setFilteredVendorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMails, setTotalMails] = useState(0); //1 is set so that no mail found will not be shown unnecessarily
  const [totalPages, setTotalPages] = useState(0);
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  // State to hold the mails fetched from the backend
  const [mails, setMails] = useState([]);

  useEffect(() => {
    // Fetching vendors with minimum details
    getFilteredVendorsWithMinimumDetails(
      setLoading,
      setFilteredVendorsData,
      token
    );
  }, [token]);

  useEffect(() => {
    // Fetching mails for the customer

    let interval;
    if (!keyword) {
      fetchCustomerMails(
        token,
        currentPage,
        setMails,
        setLoading,
        setCurrentPage,
        setTotalMails,
        setTotalPages
      );
      setCurrentFilteredPage(1);

      interval = setInterval(() => {
        PollingCustomerMails(
          token,
          currentPage,
          setMails,
          setCurrentPage,
          setTotalMails,
          setTotalPages
        ); // poll every 5 seconds
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [currentPage, token, keyword]);

  useEffect(() => {
    if (keyword) {
      handleSearchByFilename(keyword);
      setCurrentPage(1);
    }
  }, [keyword, token, currentFilteredPage]);

  const [composeModelVisibility, setComposeModelVisibility] = useState(false);

  function toggleComposeModelVisibility() {
    setComposeModelVisibility(!composeModelVisibility);
  }

  function sendMail(uploadedDocs, vendor, setLoading) {
    let mailDocs = [];

    for (let file of uploadedDocs) {
      if (!file?.url) {
        infoToast('Please wait until all the documents are fully uploaded.');
        return;
      }

      let doc = {
        fileName: file?.name,
        fileUrl: file?.url,
        fileRef: file?.file_ref,
        fileType: file?.file?.type,
        fileSize: file?.file?.size,
      };

      mailDocs.push(doc);
    }

    createOutboxMail(
      mailDocs,
      vendor,
      token,
      setLoading,
      toggleComposeModelVisibility
    );
  }

  function handleSearchByFilename(searchTerm) {
    // Function to handle search logic
    if (searchTerm && searchTerm?.trim()) {
      // If search term is empty, reset the mails to the original state
      fetchFilteredMailsByFileName(
        token,
        currentFilteredPage,
        searchTerm,
        setMails,
        setLoading,
        setCurrentFilteredPage,
        setTotalMails,
        setTotalPages
      );
    }
  }

  return (
    <div className="p-2 pb-4 sm:p-4 h-full overflow-y-auto bg-gray-100">
      <div className="flex justify-between mb-[2px] gap-4 items-center">
        <MailSearchBar
          handleSearchByFilename={handleSearchByFilename}
          searchElement="by document"
          setKeyword={setKeyword}
          keyword={keyword}
        />
        <button
          onClick={toggleComposeModelVisibility}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition duration-200 
             fixed bottom-8 right-8 sm:static sm:bottom-auto sm:right-auto z-40"
        >
          <span>
            <FaPlus />
          </span>
          <span className="flex items-center">Create</span>
        </button>
      </div>

      {loading ? (
        <div>
          <div className="flex justify-center items-center h-[50vh]">
            <span className="loader"></span>
          </div>
        </div>
      ) : totalMails === 0 ? (
        <div className="text-center mt-16 text-gray-600 text-sm font-normal">
          No mails found
        </div>
      ) : (
        <div>
          {/* Pagination Controls */}
          <div className="flex flex-row justify-between mb-1 items-center mt-4 px-2 py-[2px] md:px-4 md:py-[4px] bg-gray-100">
            {/* Total Mails Info */}
            <div className="text-[0.85rem] md:text-[12px] text-gray-600">
              Showing page{' '}
              <span className="font-medium text-gray-800">
                {keyword ? currentFilteredPage : currentPage}
              </span>{' '}
              of <span className="font-medium text-gray-800">{totalPages}</span>{' '}
              — Total{' '}
              <span className="font-semibold text-gray-900">{totalMails}</span>{' '}
              mails
            </div>

            {/* Buttons */}
            <div className="flex sm:gap-2 items-center p-2">
              <button
                onClick={() => {
                  if (keyword) {
                    setCurrentFilteredPage((p) => Math.max(p - 1, 1));
                    return;
                  }
                  setCurrentPage((p) => Math.max(p - 1, 1));
                  setCurrentFilteredPage(1);
                }}
                disabled={
                  keyword ? currentFilteredPage === 1 : currentPage === 1
                }
                className="rounded-md pr-8 sm:pr-2 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                <IoIosArrowBack />
              </button>

              <button
                onClick={() => {
                  if (keyword) {
                    setCurrentFilteredPage((p) => Math.min(p + 1, totalPages));
                    return;
                  }
                  setCurrentPage((p) => Math.min(p + 1, totalPages));
                }}
                disabled={
                  keyword
                    ? currentFilteredPage === totalPages
                    : currentPage === totalPages
                }
                className="rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>

          <div>
            {window.innerWidth <= 640 ? (
              <div></div>
            ) : (
              <div className="flex items-center justify-between px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                {/* Receiver */}
                <div className="flex items-center gap-2 w-1/4 min-w-[150px]">
                  Receiver
                </div>

                {/* Documents */}
                <div className="w-1/3">Documents</div>

                {/* Time */}
                <div className="w-1/6 text-right">Time</div>

                {/* Options (icon space) */}
                <div className="w-5"></div>
              </div>
            )}

            {mails?.length == 0 ? (
              <div>No mails</div>
            ) : (
              <div className=" rounded-md overflow-hidden">
                <div className="bg-white ">
                  <CustomerMailCards mails={mails} />
                  {/* {

                  false && <div className='flex w-[50%]'></div>
                } */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* // Compose Modal */}
      {composeModelVisibility && (
        <ComposeModal
          toggleComposeModelVisibility={toggleComposeModelVisibility}
          filteredVendorsData={filteredVendorsData}
          sendMail={sendMail}
        />
      )}
    </div>
  );
};

export default EaserOutboxPage;
