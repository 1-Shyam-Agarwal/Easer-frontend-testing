// import React, { useContext, useState } from 'react';
// import { FileText, Printer, Copy, PaperclipIcon } from 'lucide-react';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// // import { deleteFileFromCloudinary } from '../../Services/operations/PrintOrderVendor';
// import { FaTrashCan } from "react-icons/fa6";
// import { MdExpandMore } from "react-icons/md";
// import { MdExpandLess } from "react-icons/md";
// import FilenameTruncator from './FilenameTracker.jsx';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const DocumentCard = (props) => {
//   const { seqNum, files, fileConfigs, setFileConfigs ,setFiles} = props;
//   const [isExpanded, setIsExpanded] = useState(false);
//   const dispatch = useDispatch();
//   const token =useSelector((state)=>(state.auth.token));
//   const navigate = useNavigate();

//   // Ensure default configuration if not provided
//   const ensureDefaultConfig = (config) => ({
//     numberOfPages: config?.numberOfPages || 0,              // DOUBT
//     color: config?.color || 'colored',
//     copies: config?.copies,
//     orientation: config?.orientation || 'portrait',
//     backToBack : config?.backToBack || false,
//     specialRequest:config?.specialRequest||""
//   });

//   // Safely get current configuration
//   const currentConfig = fileConfigs && fileConfigs[seqNum - 1]
//     ? ensureDefaultConfig(fileConfigs[seqNum - 1])
//     : ensureDefaultConfig({});

//   // Safely get current file
//   const currentFile = files && files[seqNum - 1]
//     ? files[seqNum - 1]
//     : { name: 'Unknown File' };

// // Handler for form input changes
// const formDataHandler = (e) => {

//   if(e.target.name === 'backToBack')
//   {
//     if(currentConfig?.numberOfPages === 1)
//     {
//         if(e.target.checked)
//         {
//             toast.error("In case of single page document , you can't select back to back configuration.")
//             return;
//         }
//     }

//   }

//   const { name, type, checked, value } = e.target;

//   // Ensure fileConfigs is an array
//   const updatedConfigs = Array.isArray(fileConfigs)
//     ? [...fileConfigs]
//     : [];

//   // Create a copy of the current configuration
//   const currentFileConfig = {
//     ...updatedConfigs[seqNum - 1],
//   };

//   if(e.target.name === "copies")
//     {
//         if(isNaN(Number(e.target.value)))
//         {
//             currentFileConfig.copies = e.target.value;
//             toast.error("Copies should be a number.");
//         }
//         else
//         {
//             if(Number(e.target.value)<=0)
//             {
//                currentFileConfig.copies = e.target.value;
//                toast.error("Copies should be greater than 0.");
//             }
//             else
//             {
//               currentFileConfig.copies = e.target.value;
//             }
//         }
//     }

//   // Handle different input types
//   switch (name) {

//     case 'color':
//       currentFileConfig.color = value;
//       break;

//     case 'orientation':
//       currentFileConfig.orientation = value;
//       break;

//     case 'backToBack':
//       currentFileConfig.backToBack = checked ? true : false;
//       break;

//     case 'specialRequest':
//       currentFileConfig.specialRequest = value;
//       break;

//     default:
//       break;
//   }

//   // Update the specific file configuration
//   updatedConfigs[seqNum - 1] = currentFileConfig;

//   // Update the state
//   setFileConfigs(updatedConfigs);
// };

//   // Get file type icon
//   const getFileTypeIcon = (fileName) => {
//     const extension = fileName?.split('.')?.pop()?.toLowerCase();
//     const iconProps = { size: window.innerWidth >390 ? 48 : 33, className: "text-gray-500" };

//     switch (extension) {
//       case 'pdf':
//         return <FileText {...iconProps} />;
//       default:
//         return <PaperclipIcon {...iconProps} />;
//     }
//   };

// //   const deleteDocumentHandler = () => {
// //     dispatch(deleteFileFromCloudinary(files?.[seqNum - 1]?.public_id  , setFiles , setFileConfigs , files , fileConfigs ,seqNum,token,dispatch , navigate ));
// //   };

//   return (
//     <div
//       className={`relative bg-white border  rounded-[3px] shadow-sm transition-all duration-300 ease-in-out
//         ${isExpanded ? 'max-h-[800px]' : 'max-h-[180px]'}
//         overflow-hidden`}
//     >
//       {/* Header Section */}
//       <div
//         className="flex items-center p-4 max-390:p-1 cursor-pointer bg-gray-100"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         {/* File Icon */}
//         <div className="mr-4 max-390:mr-2 ">
//           {getFileTypeIcon(currentFile?.fileName)}
//         </div>

//         {/* File Info */}
//         <div className="flex-grow">
//           <div className="flex items-center">
//             <h3 className="text-lg max-390:text-[16px] font-semibold mr-2 max-390:mr-1">
//             <FilenameTruncator fileName={currentFile?.fileName}/>
//             </h3>
//             <span className="text-sm max-390:text-[12px] text-gray-500">
//               ({currentConfig?.numberOfPages} pages)
//             </span>
//           </div>
//           <div className="text-sm max-390:text-[12px] text-gray-500 flex items-center">
//             <Printer size={window.innerWidth >390 ? 16 : 12} className="mr-2 max-390:mr-1" />
//             Printing Configuration
//           </div>
//         </div>

//         {/* Expand/Collapse Indicator  +  Delete Button */}
//         <div className='flex justify-center items-center gap-4 max-480:gap-6 max-340:gap-[18px]'>
//           <div
//             // onClick={deleteDocumentHandler}
//             className=" text-red-500 hover:text-red-700"
//           >
//             {
//               window.innerWidth >480?"Cancel":<FaTrashCan className='text-red-500 max-340:text-[12px]'/>
//             }
//           </div>

//           <div className="ml-auto text-gray-500">
//             {
//               isExpanded ?
//               (window.innerWidth >480?"Collapse":<MdExpandLess className='text-[20px] max-340:text-[30px]'/>)
//               :
//               (window.innerWidth >480?"Expand":<MdExpandMore className='text-[20px] max-340:text-[30px]'/>)
//             }
//           </div>

//         </div>
//       </div>

//       {/* Configuration Section */}
//       <div className={`p-4 ${isExpanded ? 'block' : 'hidden'}`}>
//         <form className=" gap-4 max-340:gap-4 mt-2 grid md:grid-cols-2 ">

//           {/* Copies */}
//           <div className='flex gap-4 justify-center items-center'>
//             <label
//               htmlFor={`copies-${seqNum}`}
//               className=" text-sm font-medium text-gray-700  flex items-center"
//             >
//               <Copy size={16} className="mr-2" /> <span>Copies</span>
//             </label>
//             <input
//               type="text"
//               id={`copies-${seqNum}`}
//               name="copies"
//               value={currentConfig?.copies}
//               className="block w-full rounded-md border-gray-300 border-[1px] shadow-sm
//                focus:border-indigo-300 focus:ring focus:ring-indigo-200
//                 focus:ring-opacity-100 focus:outline-none
//                "
//                required
//             />
//           </div>

//           {/* backToBack */}

//           <div className='flex gap-4 items-center'>
//             <label
//               htmlFor={`backToBack-${seqNum}`}
//               className="block text-sm font-medium text-gray-700 ml-[10px] max-720:ml-[0] flex items-center"
//             >
//               <Copy size={16} className="mr-2" /> <span>Back to Back Printing</span>
//             </label>
//             <input
//               type="checkbox"
//               id={`backToBack-${seqNum}`}
//               name="backToBack"
//               checked={currentConfig?.backToBack === true}
//               onChange={formDataHandler}
//               className='mt-[2px]'
//             />
//           </div>

//           {/* Color Selection */}
//           <div className="md:col-span-2">
//             <span className="block text-sm font-medium text-gray-700 mb-2">Color</span>
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <input
//                   type="radio"
//                   id={`color-${seqNum}`}
//                   value="colored"
//                   checked={currentConfig?.color === "colored"}
//                   name="color"
//                   className="hidden peer"
//                   onChange={formDataHandler}
//                 />
//                 <label
//                   htmlFor={`color-${seqNum}`}
//                   className="flex items-center justify-center w-full h-10
//                     bg-white border-2 rounded-md cursor-pointer
//                     peer-checked:border-indigo-500 peer-checked:bg-indigo-50
//                     hover:bg-gray-50 transition-colors"
//                 >
//                   Color
//                 </label>
//               </div>
//               <div className="flex-1">
//                 <input
//                   type="radio"
//                   id={`blackandwhite-${seqNum}`}
//                   value="blackandwhite"
//                   checked={currentConfig?.color === "blackandwhite"}
//                   name="color"
//                   className="hidden peer"
//                   onChange={formDataHandler}
//                 />
//                 <label
//                   htmlFor={`blackandwhite-${seqNum}`}
//                   className="flex items-center justify-center w-full h-10
//                     bg-white border-2 rounded-md cursor-pointer
//                     peer-checked:border-indigo-500 peer-checked:bg-indigo-50
//                     hover:bg-gray-50 transition-colors"
//                 >
//                 {
//                   window.innerWidth<340 ? "B&W" : "Black and White"
//                 }
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Orientation */}

//           <div className="md:col-span-2">
//             <span className="block text-sm font-medium text-gray-700 mb-2">Orientation</span>
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <input
//                   type="radio"
//                   id={`portrait-${seqNum}`}
//                   value="portrait"
//                   checked={currentConfig?.orientation === "portrait"}
//                   name="orientation"
//                   className="hidden peer"
//                   onChange={formDataHandler}
//                 />
//                 <label
//                   htmlFor={`portrait-${seqNum}`}
//                   className="flex items-center justify-center w-full h-10
//                     bg-white border-2 rounded-md cursor-pointer
//                     peer-checked:border-indigo-500 peer-checked:bg-indigo-50
//                     hover:bg-gray-50 transition-colors"
//                 >
//                   Portrait
//                 </label>
//               </div>
//               <div className="flex-1">
//                 <input
//                   type="radio"
//                   id={`landscape-${seqNum}`}
//                   value="landscape"
//                   checked={currentConfig?.orientation === "landscape"}
//                   name="orientation"
//                   className="hidden peer"
//                   onChange={formDataHandler}
//                 />
//                 <label
//                   htmlFor={`landscape-${seqNum}`}
//                   className="flex items-center justify-center w-full h-10
//                     bg-white border-2 rounded-md cursor-pointer
//                     peer-checked:border-indigo-500 peer-checked:bg-indigo-50
//                     hover:bg-gray-50 transition-colors"
//                 >
//                   Landscape
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* any special instructions */}
//           <div className="md:col-span-2 flex flex-col justify-center items-center" >
//             <label
//               htmlFor='specialrequest'
//               className='block text-sm font-medium text-gray-700 mb-2'>Any Special Request
//             </label>

//             <textarea
//               id="specialrequest"
//               rows="3"
//               cols="30"
//               className="block w-[90%] p-2 rounded-md border-gray-300 border-[1px] shadow-sm
//                focus:border-indigo-300 focus:ring focus:ring-indigo-200
//                 focus:ring-opacity-100 focus:outline-none"
//               onChange={formDataHandler}
//               name="specialRequest"
//               value={currentConfig?.specialRequest}
//               />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DocumentCard;

import { IoIosArrowDown } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { useState, useRef } from 'react';
import { Copy, Palette, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const DocsCard = ({ file, handleDeleteFile, setFilesWithConfigs }) => {
  const [expandFile, setExpandFile] = useState(false);
  const contentRef = useRef(null);

  let fileConfigs = { ...file?.fileConfigs } || {
    color: 'blackandwhite',
    copies: 1,
    orientation: 'portrait',
    backToBack: false,
  };

  const applyConfigHandler = () => {
    setFilesWithConfigs((prev) => {
      return prev.map((f) =>
        f?.file_id !== file?.file_id
          ? { ...f, fileConfigs: { ...fileConfigs } }
          : f
      );
    });
  };

  // Handler for form input changes
  const formDataHandler = (e) => {
    const { type, checked, value } = e.target;
    let { name } = e.target;

    // Handle different input types
    name = name.includes('-') ? name.split('-')[0] : name;
    switch (name) {
      case 'color':
        fileConfigs.color = value;
        break;

      case 'orientation':
        fileConfigs.orientation = value;
        break;

      case 'backToBack':
        fileConfigs.backToBack = checked ? true : false;
        break;

      default:
        break;
    }

    setFilesWithConfigs((prev) => {
      return prev.map((f) =>
        f?.file_id === file?.file_id ? { ...f, fileConfigs: fileConfigs } : f
      );
    });
  };

  return (
    <div
      key={file?.file_id}
      className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Main Card Content */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file?.name}
          </p>
          {file?.url && (
            <a
              href={file?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium shrink-0"
            >
              view
            </a>
          )}
        </div>

        <div className="flex items-center gap-3 text-gray-500">
          {file?.uploading ? (
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              {file?.progress}%
            </div>
          ) : (
            <>
              <button
                onClick={() => setExpandFile(!expandFile)}
                className="p-1 hover:bg-gray-100 mr-2 ml-4 rounded transition-colors"
              >
                <IoIosArrowDown
                  size={14}
                  className={`transform transition-transform duration-200  ${
                    expandFile ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <button
                onClick={() => handleDeleteFile(file?.file_id)}
                disabled={file?.uploading}
                className="p-1 hover:bg-red-50 hover:text-red-600 rounded transition-colors disabled:opacity-50"
              >
                <RxCross2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Compact Configuration Section */}
      <div
        className={`bg-gray-50 border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
          expandFile ? 'opacity-100' : 'opacity-0 border-t-transparent'
        }`}
        style={{
          maxHeight: expandFile
            ? contentRef.current?.scrollHeight + 'px'
            : '0px',
        }}
      >
        <div ref={contentRef} className="p-4 space-y-3">
          {/* Row 1: Copies & Back-to-back */}
          <div className="flex gap-3">
            {/* Row 1: Copies & Back-to-back */}
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2">
                <Copy size={14} className="text-gray-400" />

                <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      if (fileConfigs.copies > 1) {
                        setFilesWithConfigs((prev) =>
                          prev.map((f) =>
                            f?.file_id === file?.file_id
                              ? {
                                  ...f,
                                  fileConfigs: {
                                    ...f.fileConfigs,
                                    copies: Number(f.fileConfigs.copies) - 1,
                                  },
                                }
                              : f
                          )
                        );
                      } else {
                        return;
                      }
                    }}
                    className="px-2 py-1 text-sm hover:bg-gray-100"
                  >
                    -
                  </button>

                  <div
                    name="copies"
                    className="w-16 text-center text-sm border-0 focus:ring-0"
                  >
                    {fileConfigs?.copies}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFilesWithConfigs((prev) =>
                        prev.map((f) =>
                          f?.file_id === file?.file_id
                            ? {
                                ...f,
                                fileConfigs: {
                                  ...f.fileConfigs,
                                  copies: Number(f.fileConfigs.copies) + 1,
                                },
                              }
                            : f
                        )
                      );
                    }}
                    className="px-2 py-1 text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <span className="text-xs text-gray-600">copies</span>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={`backToBack-${file?.file_id}`}
                  checked={fileConfigs.backToBack === true}
                  onChange={formDataHandler}
                  className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
                />
                <span className="text-xs text-gray-700">Double-sided</span>
              </label>
            </div>
          </div>

          {/* Row 2: Color Options */}
          <div className="space-y-[4px]">
            <div className="flex items-center gap-2">
              <Palette size={14} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-700">Color</span>
            </div>
            <div className="flex gap-2">
              <label forHtml="color" className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="colored"
                  checked={fileConfigs.color === 'colored'}
                  name={`color-${file?.file_id}`}
                  onChange={formDataHandler}
                  className="sr-only peer"
                />
                <div className="px-3 py-2 text-xs text-center bg-white border border-gray-300 rounded-sm peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:border-blue-500 transition-all">
                  Color
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="blackandwhite"
                  checked={fileConfigs?.color === 'blackandwhite'}
                  name={`color-${file?.file_id}`}
                  onChange={formDataHandler}
                  className="sr-only peer"
                />
                <div className="px-3 py-2 text-xs text-center bg-white border border-gray-300 rounded-sm peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:border-blue-500 transition-all">
                  B&W
                </div>
              </label>
            </div>
          </div>

          {/* Row 3: Orientation */}
          <div className="space-y-[4px]">
            <div className="flex items-center gap-2">
              <RotateCcw size={14} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-700">
                Orientation
              </span>
            </div>
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="portrait"
                  checked={fileConfigs?.orientation === 'portrait'}
                  name={`orientation-${file?.file_id}`}
                  onChange={formDataHandler}
                  className="sr-only peer"
                />
                <div className="px-3 py-2 text-xs text-center bg-white border border-gray-300 rounded-sm peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:border-blue-500 transition-all">
                  Portrait
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="landscape"
                  checked={fileConfigs.orientation === 'landscape'}
                  name={`orientation-${file?.file_id}`}
                  onChange={formDataHandler}
                  className="sr-only peer"
                />
                <div className="px-3 py-2 text-xs text-center bg-white border border-gray-300 rounded-sm peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:border-blue-500 transition-all">
                  Landscape
                </div>
              </label>
            </div>
          </div>

          {/* Apply to all button */}
          <div className="flex justify-center">
            <button
              className="px-3 py-2 text-sm text-center text-white bg-green-500 border border-gray-300 rounded-md hover:bg-green-600 transition-all"
              onClick={() => {
                applyConfigHandler();
              }}
            >
              {' '}
              Apply config to all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsCard;
