import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSpecificMailDetails } from '../../../Services/operations/OutboxOps.js';
import { useSelector } from 'react-redux';
import { IoMdArrowBack } from 'react-icons/io';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

import {
  FileSpreadsheet,
  Presentation,
  FileImage,
  File,
  Download,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaFilePdf } from 'react-icons/fa';
import { FaFileWord } from 'react-icons/fa';

const MailDetail = () => {
  const authToken = useSelector((state) => state.auth.token);
  const [mail, setMailDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const mailId = location.pathname?.split('/')?.pop();

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const downloadAllAttachments = async () => {
    if (!mail?.documents || mail?.documents?.length === 0) {
      alert('No attachments to download.');
      return;
    }

    const zip = new JSZip();
    console.log('file : ', mail?.documents, mail);
    const toastId = toast.loading('Downloading...');
    for (const file of mail?.documents) {
      try {
        const response = await fetch(file?.fileUrl); // Fetch the file from the URL
        const blob = await response.blob(); // Convert the response into a Blob
        zip.file(file?.fileName, blob);
        // Add the blob into the zip with the specified name
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(`Error fetching ${file?.fileName}:`); // Log if fetching fails
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const folderName = `${mail?.sender?.firstName}-${mail?.sender?.lastName}-${mail?.documents?.length}-${Math.floor(
      1000 + Math.random() * 9000
    )} `;
    saveAs(content, folderName);
    toast.dismiss(toastId);
  };

  //
  const getFileType = (fileName) => {
    const ext = fileName?.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext))
      return 'image';
    if (ext === 'pdf') return 'pdf';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return 'excel';
    if (['ppt', 'pptx'].includes(ext)) return 'ppt';
    if (['doc', 'docx'].includes(ext)) return 'word';
    return 'other';
  };

  const isDownloadable = (type) =>
    type === 'excel' || type === 'ppt' || type === 'word' || type === 'other';

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="w-5 h-5 text-red-500" />;
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case 'ppt':
        return <Presentation className="w-5 h-5 text-orange-500" />;
      case 'image':
        return <FileImage className="w-5 h-5 text-yellow-500" />;
      case 'word':
        return <FaFileWord className="w-5 h-5 text-blue-600" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  useEffect(() => {
    fetchSpecificMailDetails(mailId, authToken, setMailDetails, setLoading);
  }, []);

  //
  return (
    <div className="w-full h-full p-1  sm-2 rounded-sm bg-white shadow-md overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-full min-h-full bg-gray-100 p-2 rounded-md">
          {/* Header */}
          <div className="border-b p-4 pb-4 mb-4 bg-gray-200 rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* Mail Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <button
                  onClick={() => navigate(-1)}
                  className="text-gray-500 hover:text-black text-xl mr-[1rem] font-bold sm:text-2xl"
                  aria-label="Go back"
                >
                  <IoMdArrowBack size={25} />
                </button>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                  Mail Details
                </h2>
              </div>
              <p className="text-[13px] sm:text-[11px] text-gray-500 break-words">
                Mail ID: {mail?.mail_id}
              </p>
              <p className="text-[13px] sm:text-[11px] text-gray-500">
                Sent on: {formatDate(mail?.timeStamp)}
              </p>
            </div>

            {/* From */}
            <div className="text-[13px] text-gray-500 flex-1 sm:ml-[20px]">
              <p className="font-medium text-black">From</p>
              <p className="truncate">
                <span className="capitalize">
                  {mail?.sender?.firstName} {mail?.sender?.lastName}
                </span>
                , {mail?.sender?.mobileNumber}
              </p>
              <p className="truncate">{mail?.sender?.email}</p>
            </div>

            {/* To */}
            <div className="text-[13px] text-gray-500 flex-1">
              <p className="font-medium text-black">To</p>
              <p className="capitalize truncate">
                {mail?.receiver?.vendorAdditionalDetails?.shopName}
              </p>
              <p className="truncate">
                {mail?.receiver?.vendorAdditionalDetails?.shopLandMark}
              </p>
            </div>
          </div>

          {/* Attachments */}
          <div className=" px-1 sm:px-2 h-[76%]">
            <div className="flex flex-row justify-between items-center mb-4 px-2">
              {/* Left side: Attachment count */}
              <div className="text-sm sm:text-base font-semibold text-gray-800">
                <span>{mail?.documents?.length}</span> Attachment
                {mail?.documents?.length > 1 ? 's' : ''}
              </div>

              {/* Right side: Download All */}
              <button
                onClick={downloadAllAttachments}
                className="flex items-center  font-semibold gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-800 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m0 0l-6-6m6 6l6-6"
                  />
                </svg>
                Download All
              </button>
            </div>

            <ul className="mt-[1rem] space-y-2">
              {mail?.documents?.map((doc) => {
                const type = getFileType(doc?.fileName);
                return (
                  <li
                    key={doc?._id}
                    className="flex  flex-row gap-4 justify-between items-center  bg-white border border-gray-200 shadow-sm rounded-sm px-4 py-3 sm:py-3 hover:shadow-md transition duration-300"
                  >
                    <div className="flex items-center gap-3 truncate mb-2 sm:mb-0">
                      {getFileIcon(type)}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 truncate">
                        <span className="text-sm font-semibold text-gray-800 truncate">
                          {doc?.fileName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(Number(doc?.fileSize))}
                        </span>
                      </div>
                    </div>

                    {isDownloadable(type) ? (
                      <a
                        href={doc?.fileUrl}
                        download
                        className="flex items-center gap-1 text-[13px] sm:text-sm font-medium text-green-600 hover:text-green-800 hover:underline transition"
                      >
                        <Download className="w-h h-h sm:w-4 sm:h-4" />
                        Download
                      </a>
                    ) : (
                      <a
                        href={doc?.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] sm:text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
                      >
                        View
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailDetail;
