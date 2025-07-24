// import React, { useEffect, useState } from 'react';
// import { RxCross1 } from "react-icons/rx";
// import { setShowOrderModel } from '../../Slices/PlaceOrderModelSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import PlaceOrderAddDocuments from "./PlaceOrderAddDocuments.jsx";
// import PaymentModel from './PaymentModel.jsx';
// import { useNavigate } from 'react-router-dom';
// import SuccessfulPayment from './SuccessfulPayment.jsx';

// const PlaceOrderModel = () => {
//   const [displayPaymentWindow, setPaymentWindow] = useState(false);
//   const [displayAddDocumentsWindow, setAddDocumentsWindow] = useState(true);
//   const [displayCross, setDisplayCross] = useState(true);
//   const showOrderModal = useSelector((state) => state.placeOrder.showOrderModel);
//   const [isClosing, setIsClosing] = useState(false);
//   const [disable, setDisable] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [files, setFiles] = useState([]);
//   const [fileConfigs, setFileConfigs] = useState([]);

//   const PlaceOrderModelCloseHandler = () => {
//     if (disable) return;
//     setIsClosing(true);
//     setTimeout(() => {
//       dispatch(setShowOrderModel(false));
//       setIsClosing(false);
//     }, 300);
//   };

//   // Handle escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape' && showOrderModal && !disable) {
//         PlaceOrderModelCloseHandler();
//       }
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [showOrderModal, disable]); 

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (showOrderModal) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showOrderModal]);

//   if (!showOrderModal) return null;

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
//             {displayCross && showOrderModal && !disable && (
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
//           <div className=" max-480:p-2 p-4">
//             {displayAddDocumentsWindow ? (
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
//             ) : displayPaymentWindow ? (
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
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrderModel;