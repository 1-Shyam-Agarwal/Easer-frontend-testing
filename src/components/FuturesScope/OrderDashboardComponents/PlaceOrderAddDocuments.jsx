// // import React, { useEffect } from "react";
// // import { useRef } from "react";
// // import { useDispatch } from "react-redux";
// // import {validateFileFormatAndSize} from "../../Services/operations/PrintOrderVendor.jsx"
// // import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
// // import DocumentCard from "../OrderDashboardComponents/DocumnetCard.jsx"
// // import { useState } from "react";
// // GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';


// // const PlaceOrderAddDocuments = (props)=>
// // {

// //   const files = props.files;
// //   const fileConfigs = props.fileConfigs;
 
// //   const formats = ["png", "pdf", "jpg", "jpeg"];
// //   const dispatch = useDispatch();
// //   const addDocumentRef = useRef();
// //   const [loading , setLoading] = useState(false);

// //   useEffect(()=>
// //   {
// //       console.log("files After changes : " , files);
// //       console.log("FilecONFIGS AFTER CHANGES : " , fileConfigs);
// //   },[files , fileConfigs]);


// //   const addDocumentHandler = () => {
// //     addDocumentRef.current.click();
// //   };

// //   // If there is any change in the file input field then this function will store the data to their respect loactions. 
// //   const fileHandler = async(e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const isFormatSizeCorrect = await dispatch(validateFileFormatAndSize(file, formats , props.setFiles , setLoading ,props.setDisable));
// //       e.target.value = "";

// //       if (isFormatSizeCorrect) {
// //         // Wait for the number of pages to be calculated
// //         const numberOfPages = await CalculateNumberOfPages(file);
  
// //         const fileConfig = {
// //           color: "colored",
// //           copies: 1,
// //           orientation : "portrait",
// //           backToBack: false,
// //           numberOfPages: numberOfPages, // Set number of pages after calculation
// //           specialRequest : ""
// //         };
  
// //         props.setFileConfigs((prev) => {
// //           return [...prev, fileConfig];
// //         });

// //       }
// //     }
// //   };

// //   // This function will calculate the number of pages in a document
// //   const CalculateNumberOfPages = (file) => {
// //     return new Promise((resolve, reject) => {
// //       if (file) {
// //         if (file.type === 'application/pdf') {
// //           const fileReader = new FileReader();
// //           fileReader.onload = () => {
// //             const pdfData = new Uint8Array(fileReader.result);
// //             getDocument(pdfData).promise
// //               .then((pdf) => {
// //                 resolve(pdf.numPages); // Resolve the promise with the number of pages
// //               })
// //               .catch((error) => {
// //                 console.error("Error reading PDF", error);
// //                 reject(error); // Reject if there is an error
// //               });
// //           };
  
// //           fileReader.readAsArrayBuffer(file);
// //         } else if (file.type === 'image/jpeg' || file.type === 'image/png') {
// //           resolve(1); // If it's an image, return 1 as the number of pages
// //         } else {
// //           reject("Unsupported file type");
// //         }
// //       }
// //     });
// //   };






// //   // UI 
// //   return(

// //     <div >
// //       {
        
// //             <div>
// //               {/* This div will show the Orders */}
// //               <div>
// //                 {
// //                   fileConfigs.map((fileConfig,index)=>
// //                   {
// //                     return <DocumentCard
// //                             key={index}
// //                             fileName={files[index]?.fileName}
// //                             seqNum={index+1}
// //                             files={files}
// //                             fileConfigs={fileConfigs}
// //                             setFiles = {props.setFiles}
// //                             setFileConfigs = {props.setFileConfigs}
// //                             />
// //                   })
// //                 }  
// //               </div>


// //             {/* this div will show the Add Document  + pay button  */}
// //             <div className="flex justify-center items-center m-[20px]">
// //               <input
// //                 type="file"
// //                 accept=".pdf,.jpg,.jpeg,.png"
// //                 ref={addDocumentRef}
// //                 onChange={fileHandler}
// //                 hidden
// //               />

// //             <button 
// //               onClick={addDocumentHandler} 
// //               className={`px-4 py-2 ml-[10px] ${props.disable ? "bg-gray-200 border-gray-100 cursor-not-allowed": "bg-[#FF7F6B] border-[#F76C5E] hover:bg-[#F76C5E] hover:border-[#FF9A8B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F6B]" } text-white font-semibold border-2  rounded-md shadow-md `}
// //               disabled={props.disable}
// //             >
// //               Add Documents
// //             </button>

// //               {
// //                 files.length ? (

// //                   <button 
// //                   onClick={() => { 
// //                     props.setAddDocumentsWindow(false);
// //                     props.setPaymentWindow(true);
// //                   }}
// //                   disabled={props.disable}
// //                   className={`px-4 py-2 ml-[10px] ${props.disable ? "bg-gray-200 border-gray-100 cursor-not-allowed": "bg-[#FF7F6B] border-[#F76C5E] hover:bg-[#F76C5E] hover:border-[#FF9A8B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F6B]" } text-white font-semibold border-2  rounded-md shadow-md `}
// //                 >
// //                   Pay
// //                 </button>

// //                 ) 
// //                 : 
// //                 (
// //                   <div></div>
// //                 )
// //               }
// //             </div>
// //                     </div>
                
// //               }
// //     </div>
    
// //   );

// // }

// // export default PlaceOrderAddDocuments;

// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { validateFileFormatAndSize } from "../../Services/operations/PrintOrderVendor.jsx";
// import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
// import DocumentCard from "../OrderDashboardComponents/DocumnetCard.jsx";
// import { Upload } from "lucide-react";
// import { socketContext } from '../../ContextApi/SocketContext.js';
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
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {socket , setSocket} = useContext(socketContext);
//   const addDocumentRef = useRef();
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
//       const isFormatSizeCorrect = await dispatch(validateFileFormatAndSize(file, formats, setFiles, setLoading, setDisable,token,dispatch , navigate , socket , setSocket));

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




























































































































































