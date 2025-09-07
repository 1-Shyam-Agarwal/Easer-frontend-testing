// import React from 'react'
// import { useState ,useEffect} from 'react';
// import toast from 'react-hot-toast';

// const OrderDeliverConfirmationWindow = (props) => {

//   const[additionalAmount , setAdditionalAmount] = useState(0);
//   const[fine , setFine] = useState(props?.fineEnforced);

//   useEffect(()=>
//   {

//   },[])

//   return (
//     <div className={`fixed inset-0 flex items-start justify-center bg-black/30 backdrop-blur-sm z-50 p-4`}>
//             <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto flex max-390:p-2 max-390:py-4 max-390:text-[13px] flex-col justify-center items-center">

//                 {/* Heading */}
//                 <div>
//                     <h4 className="text-xl font-semibold text-white mb-4 text-center max-390:text-[16px]">{props.heading}</h4>
//                     <p className="text-gray-300 text-center mb-6 max-390:text-[13px] max-390:mb-4">
//                       {props.description}
//                     </p>
//                 </div>

//                 {/* AdditionalCost */}
//                 <div className="max-w-sm p-4 max-390:py-2">
//                     <label
//                         htmlFor="additionalAmount"
//                         className="block mb-2 text-sm text-gray-300 max-390:text-[13px]"
//                     >
//                         {props.subHeading1}
//                     </label>
//                     <input
//                         type="number"
//                         id="additionalAmount"
//                         value={additionalAmount}
//                         onChange={(e) => setAdditionalAmount(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                 </div>

//                 {/* fine */}
//                 {
//                     props?.fineRatePerMinute  !==0 && props?.paymentMode ==="online" ?
//                         <div className="max-w-sm p-4">

//                             <label htmlFor='fine'
//                                    className="block mb-2 text-sm text-gray-300 max-390:text-[13px] ">
//                                     {props.subHeading2} <br/><span className='font-semibold'>Actual Fine is : &#8377; {props?.fineEnforced}</span>
//                             </label>

//                             <input type="Number"
//                                 id="fine"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                 onChange={(e)=>
//                                 {
//                                         setFine(e.target.value);
//                                 }}
//                                 value={fine}
//                             />
//                         </div>
//                         :
//                         <div></div>
//                 }

//                     <div className="w-full flex justify-center gap-4 mt-[10px]">
//                       <button
//                         className="bg-green-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-600 transition-all max-390:text-[13px]"
//                         onClick={()=>{

//                             if(additionalAmount==="")
//                             {
//                                 toast.error("Please specify additional charges.");
//                                 return;
//                             }
//                             else if(!(/^-?\d+$/.test(additionalAmount)))
//                             {
//                                 toast.error("Only numbers are allowed in additional amount");
//                                 return;
//                             }

//                             props?.setDisableAgreeButton(true);
//                             if(props?.paymentMode ==="online") props.agreeController(props?.token,props?.orderId , props?.fineEnforced ,fine , additionalAmount , props?.timeOfReceiving);
//                             else props.agreeController(props?.token,props?.orderId , 0,0 , additionalAmount , props?.timeOfReceiving);
//                         }}
//                         disabled={props?.disableAgreeButton ? true : false}
//                       >
//                         {props.agreeText}
//                       </button>
//                       <button
//                         onClick={() => {
//                             props.disagreeController();
//                         }}
//                         className="bg-red-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-red-600 transition-all max-390:text-[13px]"
//                       >
//                         {props.disagreeText}
//                       </button>
//                     </div>
//             </div>
//     </div>

//   )
// }

// export default OrderDeliverConfirmationWindow
