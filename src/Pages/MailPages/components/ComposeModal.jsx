import React, { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';


const ComposeModal = ({ toggleComposeModelVisibility  , filteredVendorsData ,sendMail}) => {

  // creating ref for select field
  const selectRef = useRef(null);

  //In this useState , we store the uploaded files
  const [uploadingFiles, setUploadingFiles] = useState([]);

  //This ref is pointing to the file input field so that we can clear it after each upload.
  const fileInputRef = useRef(null);

  //This is used to close the compose modal
  function handleClose() {
    toggleComposeModelVisibility();
  }

  //This is the main function which handles file upload 
  function handleFileUpload(e) {
    

    //Converts the fileList into the proper js array
    const files = Array.from(e.target.files);

    // Clear input after upload
    if (fileInputRef.current) fileInputRef.current.value = '';

    //Checks whether the fiels array is empty or not.
    if (!files.length) {
        alert("No file selected. Please choose at least one file to upload.");
        return;
    }

    // Add selected files to state with initial progress

    const initialFiles = files.map((file) => ({
      file,
      name : file.name,
      progress: 0,
      file_id : uuidv4(),
      file_ref : `documents/${Date.now()}-${file.name}-${uuidv4()}`,
      uploading: true,
      url: null,
    }));

    setUploadingFiles((prev) => [...prev, ...initialFiles]);

    // Upload each file
    initialFiles.forEach((fileData) => {

      const { file, file_id , file_ref } = fileData;

      //Creating path for the docuemnt
      const storageRef = ref(storage , file_ref);

      //Initiating the upload process
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {

          // Calculating the progress
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        
          // Update progress for the file
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.file_id === file_id ? { ...f, progress } : f
            )
          );
        },

        (error) => {

          toast.error(`Upload failed for ${file.name}`);
          console.log(error);
          setUploadingFiles((prev)=>
          (
                prev.filter(
                    (file)=>
                    {
                        return file.file_id!= file_id
                    }
                )
          ));
        },

        () => {

          //Fetching the downloadable link from the firebase storage
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            // Update file url after successful upload
            setUploadingFiles((prev) =>
              prev.map((f) =>
                f.file_id === file_id
                  ? { ...f, uploading: false, url: downloadURL }
                  : f
              )
            );
          });
        }
      );
    });
  }

  //This fucntion is used to delete a particular uploaded fiel
  function handleDeleteFile(file_id)
  {
        setUploadingFiles((prev)=>
        (
            prev.filter(
                (file)=>
                {
                    return file.file_id!= file_id
                }
            )
        ));

  }

  //This funciton is basically used for formatiing the shopname and shopLandmark
  function formatVendorDisplay(vendor) {
    const name = vendor?.vendorAdditionalDetails?.shopName?.toUpperCase() || "";
    const landmark = vendor?.vendorAdditionalDetails?.shopLandMark?.toLowerCase() || "";
    return `${name} (${landmark})`;
  }

  //This will return selected vendor
  const handleVendorValue = () => {
    const selectedValue = selectRef.current?.value;
    return selectedValue;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Compose Message</h2>
          <button
            className="text-gray-500 hover:text-red-600 text-2xl font-bold focus:outline-none"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>

        {/* Select college Shop */}
        <div className="w-full max-w-md mx-auto my-4">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            ref={selectRef}
          >
            {filteredVendorsData?.map((vendor) => (
              <option
                key={vendor?.userId}
                value={vendor?.userId}
                className="text-sm text-gray-700"
              >
                {formatVendorDisplay(vendor)}
              </option>
            ))}
          </select>
        </div>


        {/* File Input */}
        <div className="flex justify-center items-center m-4">
          <input
            type="file"
            multiple
            ref={fileInputRef}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="text-sm text-gray-700"
          />

          <button type="submit"
              onClick={()=>{sendMail(uploadingFiles , handleVendorValue() )}}>
              send
          </button>
        </div>

        {/* Uploading Cards */}
        {uploadingFiles.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {uploadingFiles.map((file, index) => (

              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm flex flex-col gap-1"
              >
                    {/* This p represents the name of the file */}
                    <div className='flex justify-between items-center'>
                        <p className="text-sm text-gray-800 truncate">{file.name}</p>
                        <button
                            className={` ${file.uploading ? "text-gray-400 cursor-not-allowed":"text-gray-500 hover:text-red-600"} text-2xl font-bold focus:outline-none`}
                            onClick={()=>{handleDeleteFile(file.file_id)}}
                            disabled={file.uploading}
                        >
                            &times;
                        </button>
                    </div>
                    

                    {file.uploading ? 

                        // If file is in uplaoding phase , then we show uploading along with percentage
                        <div className="flex items-center gap-2 text-[10px] text-gray-600">
                            <div className="w-2 h-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            Uploading... {file.progress}%
                        </div>

                        : 

                        //If file is uploaded successfully then show public url 
                        <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 text-[10px] hover:underline"
                        >
                            View Uploaded File
                        </a>
                    }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComposeModal;
