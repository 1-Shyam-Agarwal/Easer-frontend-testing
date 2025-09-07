// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { validateFileFormatAndSize } from "../../Services/operations/PrintOrderVendor.jsx";
// import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
// import DocumentCard from "../../PlaceAndTrackOrder/Components/DocsCard.jsx";
// import { Upload } from "lucide-react";

// import { useContext } from "react";
// import { useNavigate } from 'react-router-dom';

// GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// const PlaceOrderAddDocuments = (props) => {
//   const {
//     files,
//     fileConfigs,
//     setFiles,
//     setFileConfigs,
//     setAddDocumentsWindow,
//     setPaymentWindow,
//     disable,
//     setDisable
//   } = props;

//   const formats = ["pdf"];
//   const token = useSelector((state) => (state.auth.token))
//   const addDocumentRef = useRef();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   const addDocumentHandler = () => {
//     addDocumentRef.current.click();
//   };

//   const CalculateNumberOfPages = (file) => {
//     return new Promise((resolve, reject) => {
//       if (file) {
//         if (file.type === 'application/pdf') {
//           const fileReader = new FileReader();
//           fileReader.onload = () => {
//             const pdfData = new Uint8Array(fileReader.result);
//             getDocument(pdfData).promise
//               .then((pdf) => {
//                 resolve(pdf.numPages);
//               })
//               .catch((error) => {
//                 console.error("Error reading PDF", error);
//                 reject(error);
//               });
//           };
//           fileReader.readAsArrayBuffer(file);
//         } else if (file.type === 'image/jpeg' || file.type === 'image/png') {
//           resolve(1);
//         } else {
//           reject("Unsupported file type");
//         }
//       }
//     });
//   };

//   const fileHandler = async(file) => {
//     if (file) {
//     //   const isFormatSizeCorrect = await dispatch(validateFileFormatAndSize(file, formats, setFiles, setLoading, setDisable,token,dispatch , navigate ));

//     let isFormatSizeCorrect;
//       if (isFormatSizeCorrect) {
//         const numberOfPages = await CalculateNumberOfPages(file);
//         const fileConfig = {
//           color: "blackandwhite",
//           copies: 1,
//           orientation: "portrait",
//           backToBack: false,
//           numberOfPages: numberOfPages,
//           specialRequest: ""
//         };
//         setFileConfigs(prev => [...prev, fileConfig]);
//       }
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = async(e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     await fileHandler(file);
//   };

//   const handleInputChange = async(e) => {
//     const file = e.target.files[0];
//     e.target.value = "";
//     await fileHandler(file);
//   };

//   return (
//     <div className="flex flex-col min-h-[50vh]">
//       {/* Document List Section */}
//       <div className="flex-1">
//         {fileConfigs?.length > 0 ? (
//           <div className="grid gap-4">
//             {fileConfigs?.map((fileConfig, index) => (
//               <DocumentCard
//                 key={index}
//                 seqNum={index + 1}
//                 files={files}
//                 fileConfigs={fileConfigs}
//                 setFiles={setFiles}
//                 setFileConfigs={setFileConfigs}
//               />
//             ))}
//           </div>
//         ) : (
//           <div
//             className={`w-full h-64 border-2 border-dashed rounded-lg
//               ${isDragging ? 'border-[#FF7F6B] bg-[#FF7F6B]/10' : 'border-gray-300'}
//               ${disable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
//               transition-all duration-300 ease-in-out`}
//             onClick={!disable ? addDocumentHandler : undefined}
//             onDragOver={!disable ? handleDragOver : undefined}
//             onDragLeave={!disable ? handleDragLeave : undefined}
//             onDrop={!disable ? handleDrop : undefined}
//           >
//             <div className="flex flex-col items-center justify-center h-full p-6 text-center">
//               <Upload className="w-12 h-12 mb-4 text-gray-400" />
//               <p className="mb-2 text-lg font-medium text-gray-900">
//                 Drag and drop your documents here
//               </p>
//               <p className="text-sm text-gray-500">
//                 or click to browse
//               </p>
//               <p className="text-sm text-gray-500 font-medium">
//                 (Each File should be less than or equal to 9Mb and file format should be Pdf Only)
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Actions Section */}
//       <div className="flex max-480:flex-col flex-row justify-center items-center max-480:gap-3 gap-4 mt-6">
//         <input
//           type="file"
//           accept=".pdf"
//           multiple
//           ref={addDocumentRef}
//           onChange={handleInputChange}
//           className="hidden"
//         />

//         <button
//           onClick={addDocumentHandler}
//           disabled={disable}
//           className={`w-full sm:w-auto sm:px-6 sm:py-3 px-4 py-2 rounded-[3px] sm:font-normal  text-white
//             ${disable
//               ? "bg-gray-200 cursor-not-allowed"
//               : "bg-[#1C39BB] opacity-[0.9] hover:bg-[#1C39BB] hover:opacity-[1] active:bg-[#142D92] focus:ring-2 focus:ring-[#142D92]/50"
//             } transition-all duration-300 ease-in-out`}
//         >
//           Add Documents
//         </button>

//         {files?.length > 0 && (
//           <button
//             onClick={() => {
//               setAddDocumentsWindow(false);
//               setPaymentWindow(true);
//             }}
//             disabled={disable}
//             className={`w-full sm:w-auto sm:px-6 sm:py-3 px-4 py-2 rounded-[3px] font-normal text-white
//               ${disable
//                 ? "bg-gray-200 cursor-not-allowed"
//                 : "bg-[#1C39BB] opacity-[0.9] hover:bg-[#1C39BB] hover:opacity-[1] active:bg-[#142D92] focus:ring-2 focus:ring-[#142D92]/50"
//               } transition-all duration-300 ease-in-out`}
//           >
//             Proceed to Payment
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlaceOrderAddDocuments;

// import React, { useEffect, useState } from 'react';
// import { RxCross1 } from "react-icons/rx";
// import PlaceOrderAddDocuments from "./AddDocumentModel.jsx";
// // import PaymentModel from './PaymentModel.jsx';
// import { useNavigate } from 'react-router-dom';
// // import SuccessfulPayment from './SuccessfulPayment.jsx';

// const PlaceOrderModel = ({displayPlaceOrderModel , setDisplayPlaceOrderModel}) => {
//   const [displayPaymentWindow, setPaymentWindow] = useState(false);
//   const [displayAddDocumentsWindow, setAddDocumentsWindow] = useState(true);
//   const [displayCross, setDisplayCross] = useState(true);
//   const [isClosing, setIsClosing] = useState(false);
//   const [disable, setDisable] = useState(false);

//   const [files, setFiles] = useState([]);
//   const [fileConfigs, setFileConfigs] = useState([]);

//   const PlaceOrderModelCloseHandler = () => {
//     if (disable) return;
//     setIsClosing(true);
//     setTimeout(() => {
//       setDisplayPlaceOrderModel(false);
//       setIsClosing(false);
//     }, 0);
//   };

//   // Handle escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape' && displayPlaceOrderModel && !disable) {
//         PlaceOrderModelCloseHandler();
//       }
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [displayPlaceOrderModel, disable]);

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (displayPlaceOrderModel) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [displayPlaceOrderModel]);

//   if (!displayPlaceOrderModel) return null;

//   return (
//     <div className="fixed inset-0 z-[800] overflow-y-auto">
//       {/* Backdrop */}
//       <div
//         className={`fixed inset-0 bg-black/20 backdrop-blur-[3px] transition-opacity duration-300
//           ${isClosing ? 'opacity-0' : 'opacity-100'}`}
//         aria-hidden="true"
//       ></div>

//       {/* Modal Container - Separate click handler for container */}
//       <div
//         className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
//       >
//         {/* Modal Content - Stop propagation to prevent closing when clicking inside */}
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className={`relative w-full max-w-4xl bg-white rounded-[3px] shadow-smd
//             transition-all duration-300 transform
//             ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
//             max-h-[90vh] overflow-auto`}
//         >
//           {/* Header */}
//           <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">
//               {displayAddDocumentsWindow ? 'Add Documents' :
//                displayPaymentWindow ? 'Payment' : ''}
//             </h2>
//             {displayCross && displayPlaceOrderModel && !disable && (
//               <button
//                 onClick={PlaceOrderModelCloseHandler}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 aria-label="Close modal"
//               >
//                 <RxCross1 className="text-xl text-gray-600" />
//               </button>
//             )}
//           </div>

//           {/* Content */}
//            <div className=" max-480:p-2 p-4">
//             displayAddDocumentsWindow ? (
//               <PlaceOrderAddDocuments
//                 files={files}
//                 fileConfigs={fileConfigs}
//                 setFiles={setFiles}
//                 setFileConfigs={setFileConfigs}
//                 setAddDocumentsWindow={setAddDocumentsWindow}
//                 setPaymentWindow={setPaymentWindow}
//                 setDisable={setDisable}
//                 disable={disable}
//               />
//             )
//             {/* : displayPaymentWindow ? (
//               <PaymentModel
//                 setAddDocumentsWindow={setAddDocumentsWindow}
//                 setPaymentWindow={setPaymentWindow}
//                 fileConfigs={fileConfigs}
//                 files={files}
//                 setDisplayCross={setDisplayCross}
//               />
//             ) : (
//               <SuccessfulPayment
//                 setAddDocumentsWindow={setAddDocumentsWindow}
//                 setPaymentWindow={setPaymentWindow}
//                 setFiles={setFiles}
//                 setFileConfigs={setFileConfigs}
//                 setDisplayCross={setDisplayCross}
//               />
//             )} */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrderModel;

import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../../Config/firebase.js';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { priceCalculator } from '../../../../../Services/operations/PriceCalculation.jsx';
import DocsCard from './DocsCard.jsx';
import { useSelector } from 'react-redux';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const AddDocsModal = ({
  filteredVendorsData,
  filesWithConfigs,
  setFilesWithConfigs,
  setAddDocumentsModelVisibility,
  setPaymentSummaryModelVisibility,
  setInvoice,
}) => {
  const selectRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE_MB = 30;
  const MAX_TOTAL_FILES = 25;

  useEffect(() => {
    console.log('fielWithConfigs :', filesWithConfigs);
  }, [filesWithConfigs]);

  const processFiles = async (files) => {
    const validFiles = Array.from(files);

    if (!validFiles?.length) return;

    // Check if adding these files exceeds total file count
    if (filesWithConfigs?.length + validFiles?.length > MAX_TOTAL_FILES) {
      toast.error(`Cannot upload more than ${MAX_TOTAL_FILES} files.`);
      return;
    }

    const filteredFiles = validFiles?.filter((file) => {
      const sizeMB = file?.size / (1024 * 1024);
      if (sizeMB > MAX_FILE_SIZE_MB) {
        toast.error(`${file?.name} exceeds ${MAX_FILE_SIZE_MB}Mb limit.`);
        return false;
      }
      return true;
    });

    if (!filteredFiles?.length) return;

    // Extract page count for each file
    const newFiles = await Promise.all(
      filteredFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await getDocument({ data: arrayBuffer }).promise;
        const numPages = pdf.numPages;

        return {
          file,
          name: file?.name,
          progress: 0,
          file_id: uuidv4(),
          fileSize: file?.file?.size,
          file_ref: `documents/${uuidv4()}${Date.now()}-${file.name}`,
          uploading: true,
          url: null,
          pageCount: numPages, // Add page count here
        };
      })
    );

    // Add new files to top
    setFilesWithConfigs((prev) => [...prev, ...newFiles]);

    newFiles?.forEach((fileData) => {
      const { file, file_id, file_ref } = fileData;
      const storageRef = ref(storage, file_ref);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setFilesWithConfigs((prev) =>
            prev?.map((f) => (f?.file_id === file_id ? { ...f, progress } : f))
          );
        },
        (error) => {
          toast.error(`Upload failed for ${file?.name}`);
          setFilesWithConfigs((prev) =>
            prev?.filter((file) => file?.file_id !== file_id)
          );
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFilesWithConfigs((prev) =>
              prev.map((f) =>
                f?.file_id === file_id
                  ? {
                      ...f,
                      uploading: false,
                      url: downloadURL,
                      fileConfigs: {
                        color: 'blackandwhite',
                        copies: 1,
                        orientation: 'portrait',
                        backToBack: false,
                      },
                    }
                  : f
              )
            );
          });
        }
      );
    });
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles && uploadedFiles?.length > 0) {
      processFiles(uploadedFiles);
    }
    // Clear the input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      // Only set dragActive to false if we're leaving the drop zone entirely
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setDragActive(false);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer?.files?.length > 0) {
      processFiles(e.dataTransfer?.files);
      // Clear the dataTransfer
      e.dataTransfer.clearData();
    }
  };

  const handleDeleteFile = (file_id) => {
    // LIFO deletion: Remove file while maintaining LIFO order
    setFilesWithConfigs((prev) =>
      prev?.filter((file) => file?.file_id !== file_id)
    );
  };

  const formatVendorDisplay = (vendor) => {
    const name = vendor?.vendorAdditionalDetails?.shopName?.toUpperCase() || '';
    const landmark =
      vendor?.vendorAdditionalDetails?.shopLandMark?.toLowerCase() || '';
    return `${name} (${landmark})`;
  };

  const handleVendorValue = () => selectRef.current?.value;

  const priceCalculationAndInvoiceGeneration = () => {
    //priceCalculator(fileConfigs , setInvoice , setLoading , vendorId ,token)
    priceCalculator(
      filesWithConfigs,
      setInvoice,
      setLoading,
      handleVendorValue(),
      token,
      setAddDocumentsModelVisibility,
      setPaymentSummaryModelVisibility
    );
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <span className="loader"></span>
        </div>
      ) : (
        <div
          className="bg-white w-full h-full"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {/* Select Vendor */}
          <div className="my-3 sm:my-4">
            <label className="block mb-1 text-sm text-gray-600">
              Select Shop
            </label>
            <select
              ref={selectRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filteredVendorsData?.map((vendor) => (
                <option key={vendor?.userId} value={vendor?.userId}>
                  {formatVendorDisplay(vendor)}
                </option>
              ))}
            </select>
          </div>

          {/* Drag & Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-md px-3 py-5 text-center text-sm transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <p className="text-gray-500 mb-1">Drag & drop files here</p>
            <button
              className="text-blue-600 hover:underline text-sm font-medium"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              or click to browse
              <br />
              We only accept PDfs in Remote printing
            </button>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf"
              className="hidden"
            />
          </div>

          {/* Send Button */}
          <div className="mt-4 text-right">
            <button
              onClick={priceCalculationAndInvoiceGeneration}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium shadow-sm transition"
            >
              Proceed to Pay
            </button>
          </div>

          {/* Upload Preview */}
          {filesWithConfigs?.length > 0 && (
            <div className="mt-5 mb-4 grid grid-cols-1 gap-2 sm:gap-2">
              {filesWithConfigs?.map((file) => (
                <DocsCard
                  key={file?.file_id}
                  file={file}
                  handleDeleteFile={handleDeleteFile}
                  setFilesWithConfigs={setFilesWithConfigs}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddDocsModal;
