// import React from 'react'
// import { useState } from 'react';

// const CancelConfirmationModal = (props) => {

//   const[confirmationText ,setConfirmationText] = useState("");

//   function confirmationTextUpdationHandler(event)
//   {
//       setConfirmationText(event.target?.value);
//   }
  
//   return (
//     <div className={`fixed inset-0 flex items-start justify-center bg-black/30 backdrop-blur-sm z-[60] p-4 `}>
//             <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto max-390:text-[13px] max-390:p-4 flex flex-col justify-center items-center">
//                     <h4 className="text-xl font-semibold text-white mb-4 text-center">{props.heading}</h4>
//                     <p className="text-gray-300 text-center mb-6 max-390:mb-4">
//                       {props.description}
//                     </p>

//                     <div className='flex flex-col items-center'>
//                         <p className="mb-[7px] text-gray-300">{props.secondDescription} <span className='text-[8px]'>(optional)</span></p>
//                         <textarea rows={`${props.numberOfRows}`} 
//                                   cols="30" 
//                                   placeholder='Please Write...' 
//                                   className='p-[16px] rounded-[5px]' 
//                                   onChange={confirmationTextUpdationHandler}
//                                   value={confirmationText}/>

//                     </div>
//                     <div className="w-full flex justify-center gap-4 mt-[10px]">
//                       <button
//                         className="bg-green-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
//                         onClick={()=>{

//                             if(props?.setDisableAgreeButton){
//                               props.setDisableAgreeButton(true)
//                             };
//                             props.agreeController(confirmationText);
//                         }}
//                         disabled={props?.disableAgreeButton ? true : false}
//                       >
//                         {props.agreeText}
//                       </button>
//                       <button
//                         onClick={() => {
//                             props.disagreeController();
//                         }}
//                         className="bg-red-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
//                       >
//                         {props.disagreeText}
//                       </button>
//                     </div>
//             </div>
//     </div>
    
//   )
// }

// export default CancelConfirmationModal