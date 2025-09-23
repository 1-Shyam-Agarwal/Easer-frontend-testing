import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../../Config/firebase.js';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import DocsCard from './DocsCard.jsx';
import { useSelector } from 'react-redux';
import { validateOrderAndGeneratePrice } from '../../../../../Services/operations/OrderOperations.jsx';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const AddDocsModal = ({
  filteredVendorsData,
  filesWithConfigs,
  setFilesWithConfigs,
  setAddDocumentsModelVisibility,
  setPaymentSummaryModelVisibility,
  setInvoice,
  setDisplayPDFWarning
}) => {
  const selectRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE_MB = 30;
  const MAX_TOTAL_FILES = 25;

  useEffect(() => {
    console.log("filesWithConfigs :", filesWithConfigs)
  },[filesWithConfigs])

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
          fileSize: file?.size,
          fileType : file?.type,
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

    for (let file of uploadedFiles) {
      if (file.type !== "application/pdf") {
        setDisplayPDFWarning(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
    }

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

    const uploadedFiles = e.dataTransfer.files;

    for (let file of uploadedFiles) {
      if (file.type !== "application/pdf") {
        setDisplayPDFWarning(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
    }

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
            className={`relative border-2 border-dashed cursor-pointer rounded-md px-3 py-5 text-center text-sm transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}

            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-gray-500 mb-1">Drag & drop files here</p>
           <button
            className="text-blue-600 hover:underline text-sm font-medium py-1"
            type="button"
          >
            or click to browse
            <br />
          </button>
          <div className="text-yellow-500 font-semibold no-underline">We only accept PDFs in Remote printing</div>

            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.xlsx,.pptx,.docx,.txt,.png,.jpg,.jpeg"
              className="hidden"
            />
          </div>

          {/* Send Button */}
          {
              filesWithConfigs?.length > 0 &&
              <div className="mt-4 text-right">
                <button
                  onClick={()=>{validateOrderAndGeneratePrice(token , filesWithConfigs , setAddDocumentsModelVisibility , setPaymentSummaryModelVisibility , setInvoice , setLoading);}}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium shadow-sm transition"
                >
                  Proceed to Pay
                </button>
              </div>
          }
          

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
