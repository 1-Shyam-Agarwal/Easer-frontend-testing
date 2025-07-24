// import React, { useContext, useState } from 'react';
// import { FileText, Printer, Copy, PaperclipIcon } from 'lucide-react';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteFileFromCloudinary } from '../../Services/operations/PrintOrderVendor';
// import { FaTrashCan } from "react-icons/fa6";
// import { MdExpandMore } from "react-icons/md";
// import { MdExpandLess } from "react-icons/md";
// import FilenameTruncator from './FilenameTracker';
// import { useSelector } from 'react-redux';
// import { socketContext } from '../../ContextApi/SocketContext';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const DocumentCard = (props) => {
//   const { seqNum, files, fileConfigs, setFileConfigs ,setFiles} = props;
//   const [isExpanded, setIsExpanded] = useState(false);
//   const dispatch = useDispatch();
//   const token =useSelector((state)=>(state.auth.token));
//   const {socket , setSocket} = useContext(socketContext);
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
  
//   // Handler for form input changes
//   const formDataHandler = (e) => {
    
//     if(e.target.name === 'backToBack')
//     {
//       if(currentConfig?.numberOfPages === 1)
//       {
//          console.log("e.target.checked : " , e.target.checked);
//           if(e.target.checked)
//           {
//               toast.error("In case of single page document , you can't select back to back configuration.")
//               return;
//           }
//       }

//     }

    
//     const { name, type, checked, value } = e.target;
    
//     // Ensure fileConfigs is an array
//     const updatedConfigs = Array.isArray(fileConfigs) 
//       ? [...fileConfigs] 
//       : [];

//     // Create a copy of the current configuration
//     const currentFileConfig = { 
//       ...updatedConfigs[seqNum - 1],
//     };

//     if(e.target.name === "copies")
//       {
//           if(isNaN(Number(e.target.value)))
//           {
//               currentFileConfig.copies = e.target.value;
//               toast.error("Copies should be a number.");
//           }
//           else
//           {
//               if(Number(e.target.value)<=0)
//               {
//                  currentFileConfig.copies = e.target.value;
//                  toast.error("Copies should be greater than 0.");
//               }
//               else
//               {
//                 currentFileConfig.copies = e.target.value;
//               }
//           }
//       }

//     // Handle different input types
//     switch (name) {
      
//       case 'color':
//         currentFileConfig.color = value;
//         break;
      
//       case 'orientation':
//         currentFileConfig.orientation = value;
//         break;
      
//       case 'backToBack':
//         currentFileConfig.backToBack = checked ? true : false;
//         break;
      
//       case 'specialRequest':
//         currentFileConfig.specialRequest = value;
//         break;
      
//       default:
//         break;
//     }

//     // Update the specific file configuration
//     updatedConfigs[seqNum - 1] = currentFileConfig;
    
//     // Update the state
//     setFileConfigs(updatedConfigs);
//   };


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

//   const deleteDocumentHandler = () => {
//     dispatch(deleteFileFromCloudinary(files?.[seqNum - 1]?.public_id  , setFiles , setFileConfigs , files , fileConfigs ,seqNum,token,dispatch , navigate , socket , setSocket));
//   };

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
//             onClick={deleteDocumentHandler}
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
//           {/* <div className="md:col-span-2 flex flex-col justify-center items-center" >
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
//           </div> */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DocumentCard;

