// import React from 'react'

// const ConfirmationModal = (props) => {
//   return (
//     <div className={`fixed w-[100%] h-[100vh] top-0 left-0 flex items-start justify-center bg-black/30 z-[900] backdrop-blur-sm  p-4`}>
//             <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
//                     <h4 className="text-xl font-semibold text-white mb-4 text-center">Final Confirmation</h4>
//                     <p className="text-gray-300 text-center mb-6">
//                       {props?.paymentMode==="online"? 
//                             `You cannot edit the document or cancel the order once processing begins.` 
//                             :
//                             `You cannot edit the document later, and the order will be automatically cancelled 10 minutes after your turn if you don't arrive on time`
//                       }
//                       <br/>
//                       <br/>
//                       Are you sure you want to continue with this payment mode?
//                     </p>
//                     <div className="w-full flex justify-center gap-4">
//                       <button
//                         className="bg-green-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
//                         onClick={()=>
//                         {
//                           props.OrderValidationAndCreationHandler(props?.paymentMode);
//                         }
//                         }
//                       >
//                         Yes
//                       </button>
//                       <button
//                         onClick={() => {
//                           props.setDisplayConfirmationWindow(false);
//                         }}
//                         className="bg-red-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
//                       >
//                         Go Back
//                       </button>
//                     </div>
//             </div>
//     </div>
    
//   )
// }

// export default ConfirmationModal

