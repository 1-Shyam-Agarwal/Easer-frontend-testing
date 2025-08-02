import React, { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx"

const ComposeModal = ({ toggleComposeModelVisibility, filteredVendorsData, sendMail }) => {
  const selectRef = useRef(null);
  const fileInputRef = useRef(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading , setLoading] = useState(false);

  const handleClose = () => toggleComposeModelVisibility();

  const MAX_FILE_SIZE_MB = 30;
const MAX_TOTAL_FILES = 25;

const processFiles = (files) => {
  const validFiles = Array.from(files);

  if (!validFiles?.length) return;

  // Check if adding these files exceeds total file count
  if (uploadingFiles?.length + validFiles?.length > MAX_TOTAL_FILES) {
    toast.error(`Cannot upload more than ${MAX_TOTAL_FILES} files.`);
    return;
  }

  const filteredFiles = validFiles?.filter(file => {
    const sizeMB = file?.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      toast.error(`${file?.name} exceeds ${MAX_FILE_SIZE_MB}Mb limit.`);
      return false;
    }
    return true;
  });

  if (!filteredFiles?.length) return;

  const newFiles = filteredFiles?.map((file) => ({
    file,
    name: file?.name,
    progress: 0,
    file_id: uuidv4(),
    file_ref: `documents/${uuidv4()}${Date.now()}-${file?.name}`,
    uploading: true,
    url: null,
  }));

  // Add new files to top
  setUploadingFiles((prev) => [...newFiles, ...prev]);

  newFiles?.forEach((fileData) => {
    const { file, file_id, file_ref } = fileData;
    const storageRef = ref(storage, file_ref);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadingFiles((prev) =>
          prev?.map((f) => (f?.file_id === file_id ? { ...f, progress } : f))
        );
      },
      (error) => {
        toast.error(`Upload failed for ${file?.name}`);
        setUploadingFiles((prev) => prev?.filter((file) => file?.file_id !== file_id));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f?.file_id === file_id ? { ...f, uploading: false, url: downloadURL } : f
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
    setUploadingFiles((prev) => prev?.filter((file) => file?.file_id !== file_id));
  };

  const formatVendorDisplay = (vendor) => {
    const name = vendor?.vendorAdditionalDetails?.shopName?.toUpperCase() || '';
    const landmark = vendor?.vendorAdditionalDetails?.shopLandMark?.toLowerCase() || '';
    return `${name} (${landmark})`;
  };

  const handleVendorValue = () => selectRef.current?.value;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4">
      {
        loading ? 
           <div className='flex justify-center items-center h-[50vh]'>
              <span className="loader"></span>
            </div>
        :
        (
            <div
        className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-lg p-4 sm:p-6 border border-gray-200"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 sm:pb-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Compose Message</h2>
          <button
            className="text-gray-400 hover:text-red-500 text-xl sm:text-2xl font-bold transition"
            onClick={handleClose}
          >
            <RxCross2/>
          </button>
        </div>

        {/* Select Vendor */}
        <div className="my-3 sm:my-4">
          <label className="block mb-1 text-sm text-gray-600">Select Shop</label>
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
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
            className="hidden"
          />
        </div>

        {/* Send Button */}
        <div className="mt-4 text-right">
          <button
            type="submit"
            onClick={() => sendMail(uploadingFiles, handleVendorValue() , setLoading)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium shadow-sm transition"
          >
            Send
          </button>
        </div>

        {/* Upload Preview */}
        {uploadingFiles?.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:gap-4">
            {uploadingFiles?.map((file, index) => (
              <div
                key={file?.file_id}
                className="bg-gray-50 border border-gray-200 rounded-sm p-3 py-2 shadow-sm flex justify-between items-center"
              >
                <div className="flex justify-between items-center gap-4">
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[80%]">
                    {file?.name}
                  </p>
                  {file?.url && (
                    <a
                      href={file?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      view 
                    </a>
                  )}
                </div>

                <div className="mt-1 text-xs text-gray-600">
                  {file?.uploading ? (
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
                      Uploading... {file?.progress}%
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <button
                        className={`${
                          file.uploading
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-400 hover:text-red-500'
                        } text-xl flex items-center font-bold transition`}
                        onClick={() => handleDeleteFile(file?.file_id)}
                        disabled={file?.uploading}   
                      >
                        <RxCross2/>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        )
      }
      
    </div>
  );
}

export default ComposeModal;