// import React from 'react';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TiArrowSortedDown , TiArrowSortedUp } from 'react-icons/ti';
// import ConfirmationModal from '../Core/Auth/GeneralConfirmationWindow';
// // import { updateRefundStatus } from '../../Services/operations/resetDeatils';

// const CancelledOrdersCard = (props) => {
//   const [moreDetails, setMoreDetails] = useState(false);
//   const [confirmationWindow,setConfirmationWindow] = useState(false);
//   const token = useSelector((state)=>(state.auth.token));
//   const dispatch = useDispatch();

//   let date = props?.times?.timeOfCancellation;
//   date = new Date(date);

//   const formattedDate = `${String(date?.getDate())?.padStart(2, '0')}/${String(date?.getMonth() + 1)?.padStart(2, '0')}/${date?.getFullYear()}`;

//   function formattedTime(date) {
//     date = new Date(date);
//     return `${String(date?.getHours())?.padStart(2, '0')}:${String(date?.getMinutes())?.padStart(2, '0')}`;
//   }
//   function formattedDateFromGivenData(date) {
//     date = new Date(date);
//     return `${String(date?.getDate())?.padStart(2, '0')}/${String(date?.getMonth() + 1)?.padStart(2, '0')}/${date?.getFullYear()}`;
//   }

//   function refundHandler()
//   {
//       setConfirmationWindow(true);
//   }

//   function agreeController()
//   {
//       dispatch(updateRefundStatus(token , props?.orderID));
//       setConfirmationWindow(false);
//   }

//   function disagreeController()
//   {
//       setConfirmationWindow(false);
//   }

//   const userData = [
//     props?.s_no,
//     formattedDate,
//     props?.role==="vendor"? `${props?.user?.firstName} ${props?.user?.lastName}`: props?.vendor?.shopName,
//     props?.paymentMode,
//     (props?.paymentMode === "offline" ? "N/A" : (props?.refundStatus ? "Refunded" : "Pending")),
//     props?.cancelledBy===props?.role?"You" : (props?.cancelledBy),
//   ];

//   return (
//     <div
//       className={`
//         max-w-full
//         bg-white
//         overflow-hidden
//         border-b-gray-50
//         border-b-[3px]
//         group
//       `}
//     >
//         {/* Header Row */}
//         <div>
//           <div className=" grid grid-cols-6
//           gap-4
//           items-center
//           p-[13px]
//           max-540:p-[8px]
//           max-360:p-[7px]
//           hover:bg-gray-50
//           transition-colors duration-200
//           border border-gray-100
//           group"
//         >
//           {userData?.map((data, idx) => (
//           (
//             idx===3?
//             <div className="flex justify-center" key={idx}>
//                 <span className={`
//                   px-3 py-1.5
//                   text-xs font-medium
//                   rounded-full
//                   capitalize
//                   max-540:scale-[0.9]
//                   max-540:px-2 max-540:py-1
//                   max-480:scale-[0.80]
//                   max-360:scale-[0.65]
//                   tracking-wider
//                   flex items-center gap-1.5
//                   justify-center
//                   transition-all duration-200
//                   ${data === "offline"
//                     ? "text-yellow-700 bg-yellow-100 group-hover:bg-yellow-200"
//                     : "text-emerald-700 bg-emerald-100 group-hover:bg-emerald-200"
//                   }
//                 `}>
//                   {data}
//                 </span>
//               </div>
//             :
//             idx===4?
//               <div className="flex justify-center" key={idx}>
//                 <span
//                   className={`
//                     px-3 py-1.5
//                     text-xs font-medium
//                     rounded-full
//                     capitalize
//                     tracking-wider
//                     flex items-center gap-1.5
//                     justify-center
//                     max-540:scale-[0.9]
//                     max-540:px-2 max-540:py-1
//                     max-480:scale-[0.80]
//                     max-360:scale-[0.65]
//                     transition-all duration-200
//                     ${
//                       props?.paymentMode === "offline"
//                         ? "text-violet-700 bg-violet-100 group-hover:bg-violet-200"
//                         : (props?.refundStatus === false ?
//                             "text-red-700 bg-red-100 group-hover:bg-red-200"
//                             :"text-green-700 bg-green-100 group-hover:bg-green-200"
//                           )
//                     }`}
//                 >
//                   {data}
//                 </span>

//               </div>
//               :
//               (
//                 idx ===2?
//                 (
//                   <div
//                     key={idx}
//                     className="text-center
//                       px-2 py-1.5
//                       text-xs
//                       font-normal
//                       text-black
//                       max-540:scale-[0.9]
//                       max-480:scale-[0.80]
//                       group-hover:text-gray-900
//                       capitalize
//                       tracking-wider
//                       flex
//                       relative
//                       justify-center
//                       items-center
//                       max-540:text-[10px]
//                       transition-colors duration-200"
//                   >
//                     <span className='truncate'>{data}</span>
//                     <img  title={data} className='absolute inset-0 opacity-0'/>
//                   </div>

//                 )
//                 :
//                 (
//                   <div
//                       key={idx}
//                       className="text-center
//                         px-2 py-1.5
//                         text-xs
//                         font-normal
//                         text-black
//                         max-540:scale-[0.9]
//                         max-480:scale-[0.80]
//                         group-hover:text-gray-900
//                         capitalize
//                         tracking-wider
//                         flex
//                         justify-center
//                         items-center
//                         max-540:text-[10px]
//                         transition-colors duration-200"
//                     >
//                       {data}
//                     </div>
//                 )
//               )

//           )))}
//         </div>

//         <div className='h-[10px] max-360:h-[7px] bg-gray-200 flex justify-center items-center' onClick={()=>{setMoreDetails(!moreDetails)}}>
//                   {
//                       moreDetails ? <TiArrowSortedUp className='text-xs'/> : <TiArrowSortedDown className='text-xs'/>
//                   }
//         </div>

//       {/* Details Section */}
//       <div className={`overflow-hidden transition-all duration-300 ${moreDetails ? 'max-h-[3000px]' : 'max-h-0'}`}>
//         <div className="bg-gray-100 p-[8px] space-y-[2px]">
//           {/* RefundButton */}
//           <div>
//             {
//               props?.role === "vendor" && props?.paymentMode === "online" && props?.refundStatus===false && (
//                 <div className="bg-white p-4 rounded-[3px] max-480:p-2">
//                   <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Refund Details</h3>
//                   <p className="text-sm text-gray-600">
//                     <span className="font-normal text-gray-700 max-480:text-[12px]">Refund Money to this Mobile Number:</span>
//                     <span className="text-indigo-600 ml-2 max-480:text-[12px]">{props?.user?.mobileNumber}</span>
//                   </p>
//                   <div className="flex flex-col sm:flex-row items-center gap-2 justify-between mt-2 max-480:gap-1">
//                     <span className="text-gray-700 font-medium max-480:text-[12px]">
//                       Refund Amount: <span className="text-green-600">&#8377; {props?.orderPrice}</span>
//                     </span>
//                     <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 max-480:text-[12px] max-480:px-2 max-480:py-1 rounded-[5px] transition duration-300"
//                             onClick={refundHandler}>
//                       Process Refund
//                     </button>
//                   </div>
//                 </div>
//               )
//             }
//           </div>

//           {/* Reason */}
//           <div className="bg-white p-4 shadow-sm max-480:p-2">
//             <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Cancellation Reason</h3>
//             <div className="text-sm ml-[4px] max-480:text-[12px] max-480:ml-[2px]">{props?.reason}</div>
//           </div>

//           {/* User/Vendor Details */}
//           {props?.role === "user" && (
//             <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//               <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Vendor Details</h3>
//               <div className="grid  max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                 <div className="font-medium max-480:text-[12px] truncate">Shop Name:&nbsp;
//                     <span className="font-normal capitalize relative">{props?.vendor?.shopName}
//                       <img  title={props?.vendor?.shopName} className='absolute inset-0 opacity-0'/>
//                     </span>
//                 </div>
//                 <div className="font-medium max-480:text-[12px] truncate">Location:&nbsp;
//                   <span className="font-normal capitalize relative">
//                     {props?.vendor?.shopLandMark}
//                     <img  title={props?.vendor?.shopLandMark} className='absolute inset-0 opacity-0'/>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {props?.role === "vendor" && (
//             <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//               <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Customer Details</h3>
//               <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 md:grid-cols-3 text-sm max-480:gap-1">
//                 <div className='font-medium max-480:text-[12px] truncate'>Name: <span className="font-normal capitalize">{`${props?.user?.firstName} ${props?.user?.lastName}`}</span></div>
//                 <div className='font-medium max-480:text-[12px] truncate'>Email:&nbsp;
//                   <span className="font-normal relative">
//                     {props?.user?.email}
//                     <img  title={props?.user?.email} className='absolute inset-0 opacity-0'/>
//                   </span>
//                   </div>
//                 <div className='font-medium max-480:text-[12px] truncate'>Mobile Number: <span className="font-normal">{props?.user?.mobileNumber}</span></div>
//               </div>
//             </div>
//           )}

//           {/* Times */}
//           <div className="bg-white p-4 shadow-sm max-480:p-2">
//             <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Time Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm max-480:gap-[3px]">
//               <div className="font-medium max-480:text-[12px] truncate">Order Time: <span className="font-normal">{formattedTime(props?.times?.timeOfOrder)}</span></div>
//               {
//                   props?.times?.timeOfTurn ?
//                   (
//                     ""
//                   )
//                   :
//                   (
//                     <div className="font-medium max-480:text-[12px] truncate">Turn Time: <span className="font-normal">{formattedTime(props?.times?.timeOfTurn)}</span></div>
//                   )
//               }

//               {
//                   !props?.times?.timeOfProcessing?
//                   (
//                     ""
//                   )
//                   :
//                   (
//                     <div className="font-medium max-480:text-[12px] truncate">Processing Time: <span className="font-normal">{formattedTime(props?.times?.timeOfProcessing)}</span></div>
//                   )
//               }

//               <div className="font-medium max-480:text-[12px] truncate">Cancellation Time: <span className="font-normal">{formattedTime(props?.times?.timeOfCancellation)}</span></div>
//               {
//                   !props?.refundTime ?
//                   (
//                     props?.paymentMode === "online"?
//                     <div className="font-medium max-480:text-[12px] md:col-span-2">Refund Date & time : <span className="font-normal text-red-500">{props?.role ==="user" ? "The refund will be processed within 4-5 business days. If you do not receive it within this period, please contact the vendor for assistance." : "Kindly process the refund within 4-5 business days." }</span></div>
//                     :
//                     <div></div>
//                   )
//                   :
//                   (
//                     <div className="font-medium max-480:text-[12px] truncate">Refund Date & time : <span className="font-normal">{formattedTime(props?.refundTime)} ({formattedDateFromGivenData(props?.refundTime)})</span></div>
//                   )
//               }
//             </div>
//           </div>

//           {/* Transaction Details */}
//           {
//              props?.paymentMode === "online" ?
//              (
//               <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                 <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Transaction Details</h3>
//                 <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                   <div className="font-medium max-480:text-[12px] truncate">Payment Id : <span className="font-normal capitalize">{props?.paymentId}</span></div>
//                   <div className="font-medium max-480:text-[12px] truncate">Bank Reference Number : <span className="font-normal  capitalize">{props?.bankReferenceNumber}</span></div>
//                 </div>
//               </div>
//              )
//              :
//              (
//                 <div></div>
//              )
//           }

//           {(
//             <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//               <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Payment Details</h3>
//               <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                 <div className="font-medium max-480:text-[12px] truncate">Order Price: <span className="font-normal capitalize">&#8377;{props?.orderPrice}</span></div>
//                 <div className="font-medium max-480:text-[12px] truncate">Payment Mode: <span className="font-normal  capitalize">{props?.paymentMode}</span></div>
//               </div>
//             </div>
//           )}

//           {/* Order Files */}
//         <div className=' p-4 bg-white'>
//           <h3 className="text-[13px] font-normal text-gray-400 mb-[8px]">Order Files</h3>
//           <div className="grid grid-cols-6 max-640:gap-2 gap-4 max-640:text-[10px] bg-green-100 text-black rounded-[5px] max-640:p-2 p-2 text-sm font-medium">
//               <div className="text-left flex items-center justify-center">Docs. Name</div>
//               <div className="text-center flex items-center justify-center ">Pages</div>
//               <div className="text-center flex items-center justify-center ">Color</div>
//               <div className="text-center flex items-center justify-center ">Layout</div>
//               <div className="text-center flex items-center justify-center ">B-T-B</div>
//               <div className="text-right flex items-center justify-center " >Copies</div>
//           </div>

//           <div className="divide-y divide-gray-200">
//               {props?.orderFiles?.map((order, index) => (
//                 <div
//                   key={index}
//                   className={`grid grid-cols-6 max-640:text-[10px] max-640:gap-2 gap-4 p-2 rounded-[5px] bg-gray-50 px-2 text-sm
//                     transition-all duration-200 ease-in-out  group rounded-[5px]`}
//                 >
//                   {/* Filename with Tooltip */}
//                   <div className="text-left text-gray-700">
//                     <div className="flex items-center justify-center relative">
//                       <span className="truncate">{order?.fileName}<img src="djnkjsdnj" title={order?.fileName} className='absolute top-0 left-0 opacity-0'/></span>
//                     </div>
//                   </div>

//                   {/* Other Cells with Hover Effects */}
//                   <div className="text-right text-gray-700 font-normal flex justify-center items-center">
//                     {order?.numberOfPages}
//                   </div>

//                   <div className="text-center text-gray-700 flex justify-center items-center">
//                     <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center`}>
//                       {order?.color!=="colored" ? "B&W" : "Color"}
//                     </span>
//                   </div>
//                   <div className="text-center text-gray-700 capitalize group flex justify-center items-center">
//                     {order?.orientation}
//                   </div>
//                   <div className="text-center text-gray-700 flex justify-center items-center">
//                     <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center`}>
//                       {order?.backToBack ? "Yes" : "No"}
//                     </span>
//                   </div>
//                   <div className="text-center text-gray-700 flex justify-center items-center">
//                     {order?.copies}
//                   </div>

//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//       {
//        confirmationWindow &&
//        <ConfirmationModal
//                  agreeText = "Yes"
//                  disagreeText="Go Back"
//                  heading="Final Confirmation"
//                  description={`Are you sure you have refunded the money ? `}
//                  agreeController={agreeController}
//                  disagreeController={disagreeController} />
//       }
//     </div>
//   </div>
//   );
// };

// export default CancelledOrdersCard;
