// import React, { useContext } from 'react';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import OrderDeliverConfirmationWindow from './OrderDeliverConfirmationWindow';
// import { receiveUserOrder } from '../../Services/operations/OrderOperations';
// import { TiArrowSortedUp , TiArrowSortedDown } from 'react-icons/ti';
// import { Link } from 'react-router-dom';
// import { useRef } from 'react';
// import { socketContext } from '../../ContextApi/SocketContext';
// import { useEffect } from 'react';

// const UnreceivedOrderCard = (props) => {
//   const [moreDetails, setMoreDetails] = useState(false);
//   const [orderDelivered , setOrderDelivered] = useState(false);
//   const [fineEnforced , setFineEnforced] = useState(0);
//   const timeOfReceiving = useRef(0);
//   const token = useSelector((state)=>(state.auth.token));
//   const {socket} = useContext(socketContext);
//   const [disableAgreeButton , setDisableAgreeButton] = useState(false);

//   let timeOfCompletionObject = Date.parse(props?.timeOfCompletion);

//   const dispatch = useDispatch();

//   function formattedTime(date) {
//     date = new Date(date);
//     return `${String(date?.getHours())?.padStart(2, '0')}:${String(date?.getMinutes())?.padStart(2, '0')}`;
//   }

//   function orderDeliveryHandler()
//   {
//         setOrderDelivered(true);
//         timeOfReceiving.current=Date.now() // Returns the current timestamp in milliseconds
//         if((timeOfCompletionObject + props?.fineEnforcementTimeInMinutes*60000) - (timeOfReceiving?.current)>=0)
//           {
//               setFineEnforced(0);
//           }
//           else
//           {
//             setFineEnforced((Math.trunc(((timeOfReceiving?.current)-(timeOfCompletionObject + props?.fineEnforcementTimeInMinutes*60000)) / 60000))*props?.fineRatePerMinute);
//           }
//   }

//   async function agreeController(token ,orderId , exactFine , fineTaken , additionalCharges , timeOfReceiving)
//   {
//       setDisableAgreeButton(false);
//       setOrderDelivered(false);
//       await dispatch(receiveUserOrder(token ,orderId , exactFine , fineTaken , additionalCharges , timeOfReceiving));
//       if(socket && props?.userRoomCode)
//       {
//          socket.emit("update-your-unreceived-orders" , {roomCode :props?.userRoomCode , orderId : props?.orderId})
//       }

//   }

//   function disagreeController()
//   {
//         setOrderDelivered(false);
//   }

//   const Data = [
//     props?.s_no,
//     props?.role === "vendor" ? `${props?.firstName} ${props?.lastName}` : props?.shopName,
//     formattedTime(props?.timeOfCompletion),
//     props?.paymentStatus ,
//     props?.role==="vendor" ?"" : props?.price,
//   ];

//   return(
//     <div
//           className={`
//             max-w-full
//             bg-white
//             overflow-hidden
//             border-b-gray-200
//             border-[1px]
//             group
//           `}
//         >
//             {/* Header Row */}
//             <div className="relative">
//               <div className=" grid grid-cols-5
//               gap-4
//               items-center
//               p-[13px]
//               max-540:p-[10px]
//               max-360:p-[7px]
//               hover:bg-gray-50
//               transition-colors duration-200
//               border border-gray-100
//               group"
//             >
//               {Data?.map((data, idx) => (
//               (
//                 idx===3?
//                 <div className="flex justify-center" key={idx}>
//                     <span className={`
//                       px-3 py-1.5
//                       text-xs font-medium
//                       rounded-full
//                       capitalize
//                       max-540:scale-[0.9]
//                       max-540:px-2 max-540:py-1
//                       max-360:scale-[0.65]
//                       tracking-wider
//                       flex items-center gap-1.5
//                       transition-all duration-200
//                       ${data === "pending"
//                         ? "text-red-700 bg-red-100 group-hover:bg-red-200"
//                         : "text-emerald-700 bg-emerald-100 group-hover:bg-emerald-200"
//                       }
//                     `}>
//                       {data}
//                     </span>
//                   </div>
//                  :
//                  idx===4 ?
//                  (
//                       <div
//                         key={idx}
//                         className="flex justify-center"
//                       >
//                           {props?.role==="user"?

//                           <span
//                               className="text-center
//                               px-2 py-1.5
//                               text-xs
//                               font-normal
//                               text-black
//                               group-hover:text-gray-900
//                               max-540:scale-[0.9]
//                               max-360:scale-[0.65]
//                               capitalize
//                               tracking-wider
//                               transition-colors duration-200"
//                           >
//                             &#8377; {data}
//                           </span>
//                           :
//                           (
//                             <button
//                                 className="
//                                             text-white
//                                             rounded-full
//                                             border
//                                             border-blue-200
//                                             bg-blue-600
//                                             hover:bg-blue-800
//                                             hover:border-blue-400
//                                             transition-colors
//                                             text-center
//                                             px-2 py-1.5
//                                             text-xs
//                                             font-normal
//                                             duration-200
//                                             max-540:scale-[0.9]
//                                             max-360:scale-[0.65]
//                                             tracking-wider"
//                                 disabled={orderDelivered}
//                                 onClick={orderDeliveryHandler}
//                             >
//                                 Order received?
//                             </button>
//                           )}
//                       </div>
//                  )
//                  :
//                  (
//                     idx ===1?
//                     (
//                       <div
//                       key={idx}
//                       className="text-center
//                         px-2 py-1.5
//                         text-xs
//                         font-normal
//                         text-black
//                         max-540:scale-[0.9]
//                         max-360:scale-[0.75]
//                         group-hover:text-gray-900
//                         capitalize
//                         truncate
//                         tracking-wider
//                         relative
//                         transition-colors duration-200"
//                       >
//                         {data}
//                         <img  title={data} className='absolute inset-0 opacity-0'/>
//                       </div>

//                     )
//                     :
//                     (
//                       <div
//                       key={idx}
//                       className="text-center
//                         px-2 py-1.5
//                         text-xs
//                         font-normal
//                         text-black
//                         max-540:scale-[0.9]
//                         max-360:scale-[0.75]
//                         group-hover:text-gray-900
//                         capitalize
//                         tracking-wider
//                         relative
//                         transition-colors duration-200"
//                       >
//                         {data}
//                       </div>
//                     )

//                  )
//               )))}
//             </div>

//             <div className='h-[10px] max-360:h-[7px] bg-gray-200 flex justify-center items-center' onClick={()=>{setMoreDetails(!moreDetails)}}>
//                       {
//                           moreDetails ? <TiArrowSortedUp className='text-xs'/> : <TiArrowSortedDown className='text-xs'/>
//                       }
//             </div>

//           {/* Details Section */}
//           <div className={`overflow-hidden transition-all duration-300 ${moreDetails ? 'max-h-[3000px]' : 'max-h-0'}`}>
//             <div className="bg-gray-100 p-[8px] space-y-[2px]">

//               {/* User/Vendor Details */}
//               {props?.role === "user" && (
//                 <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                   <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Vendor Details</h3>
//                   <div className="grid  max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                     <div className="font-medium max-480:text-[12px] truncate">Shop Name:&nbsp;
//                         <span className="font-normal capitalize relative">{props?.shopName}
//                           <img  title={props?.shopName} className='absolute inset-0 opacity-0'/>
//                         </span>
//                     </div>
//                     <div className="font-medium max-480:text-[12px] truncate">Location:&nbsp;
//                       <span className="font-normal capitalize relative">
//                         {props?.shopLocation}
//                         <img  title={props?.shopLocation} className='absolute inset-0 opacity-0'/>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {props?.role === "vendor" && (
//                 <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                   <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Customer Details</h3>
//                   <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 md:grid-cols-3 text-sm max-480:gap-1">
//                     <div className='font-medium max-480:text-[12px] truncate'>Name: <span className="font-normal capitalize">{`${props?.firstName} ${props?.lastName}`}</span></div>
//                     <div className='font-medium max-480:text-[12px] truncate'>Email:&nbsp;
//                       <span className="font-normal relative">
//                         {props?.email}
//                         <img  title={props?.email} className='absolute inset-0 opacity-0'/>
//                       </span>
//                       </div>
//                     <div className='font-medium max-480:text-[12px] truncate'>Mobile Number: <span className="font-normal">{props?.mobileNumber}</span></div>
//                   </div>
//                 </div>
//               )}

//               {/* Times */}
//               <div className="bg-white p-4 shadow-sm max-480:p-2">
//                 <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Time Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm max-480:gap-[3px]">
//                   <div className="font-medium max-480:text-[12px] truncate">Order Time: <span className="font-normal">{formattedTime(props?.orderedAt)}</span></div>
//                   {
//                       props?.timeOfTurn===undefined  || props?.timeOfTurn==="NA" ?
//                       (
//                         ""
//                       )
//                       :
//                       (
//                         <div className="font-medium max-480:text-[12px] truncate">Turn Time: <span className="font-normal">{formattedTime(props?.timeOfTurn)}</span></div>
//                       )
//                   }

//                   {
//                       props?.timeOfProcessing ===undefined || props?.timeOfProcessing === "NA"?
//                       (
//                         ""
//                       )
//                       :
//                       (
//                         <div className="font-medium max-480:text-[12px] truncate">Processing Time: <span className="font-normal">{formattedTime(props?.timeOfProcessing)}</span></div>
//                       )
//                   }

//                   <div className="font-medium max-480:text-[12px] truncate">Completion Time: <span className="font-normal">{formattedTime(props?.timeOfCompletion)}</span></div>
//                 </div>
//               </div>

//               {
//                  props?.paymentMode === "online"?
//                  (
//                     <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                       <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Transaction Details</h3>
//                       <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                         <div className="font-medium max-480:text-[12px] truncate">Payment Id : <span className="font-normal capitalize">{props?.paymentId}</span></div>
//                         <div className="font-medium max-480:text-[12px] truncate">Bank Reference Number : <span className="font-normal  capitalize">{props?.bankReferenceNumber}</span></div>
//                       </div>
//                     </div>
//                  )
//                  :
//                  (
//                     <div></div>
//                  )
//               }

//               {(
//                 <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                   <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Payment Details</h3>
//                   <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                     <div className="font-medium max-480:text-[12px] truncate">Order Price: <span className="font-normal capitalize">&#8377;{props?.price}</span></div>
//                     <div className="font-medium max-480:text-[12px] truncate">Payment Mode: <span className="font-normal  capitalize">{props?.paymentMode}</span></div>
//                   </div>
//                 </div>
//               )}

//               {/* Order Files */}
//             <div className=' p-4 bg-white'>
//               <h3 className="text-[13px] font-normal text-gray-400 mb-[8px]">Order Files</h3>
//               <div className="grid grid-cols-6 max-640:gap-2 gap-4 max-640:text-[10px] bg-green-100 text-black rounded-[5px] max-640:p-2 p-2 text-sm font-medium">
//                   <div className="text-left flex items-center justify-center">Docs. Name</div>
//                   <div className="text-center flex items-center justify-center ">Pages</div>
//                   <div className="text-center flex items-center justify-center ">Color</div>
//                   <div className="text-center flex items-center justify-center ">Layout</div>
//                   <div className="text-center flex items-center justify-center ">B-T-B</div>
//                   <div className="text-right flex items-center justify-center " >Copies</div>
//               </div>

//               <div className="divide-y divide-gray-200">
//                 {props?.documents?.[0]?.documents?.map((order, index) => (
//                   <div
//                     key={index}
//                     className={`grid grid-cols-6 max-640:text-[10px] max-640:gap-2 gap-4 p-2 rounded-[5px] bg-gray-50 px-2 text-sm
//                       transition-all duration-200 ease-in-out  group rounded-[5px]`}
//                   >
//                     {/* Filename with Tooltip */}
//                     <div className="text-left text-gray-700">
//                       <Link to={order?.secure_url} className="flex items-center justify-center relative" target="_blank" rel="noopener noreferrer">
//                         <span className="truncate text-blue-400 underline">{order?.fileName}<img src="djnkjsdnj" title={order?.fileName} className='absolute top-0 left-0 opacity-0'/></span>
//                       </Link>
//                     </div>

//                     {/* Other Cells with Hover Effects */}
//                     <div className="text-right text-gray-700 font-normal flex justify-center items-center">
//                       {props?.documents?.[0]?.fileConfigurations?.[index]?.numberOfPages}
//                     </div>

//                     <div className="text-center text-gray-700 flex justify-center items-center">
//                       <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center`}>
//                         {props?.documents?.[0]?.fileConfigurations?.[index]?.color!=="colored" ? "B&W" : "Color"}
//                       </span>
//                     </div>
//                     <div className="text-center text-gray-700 capitalize group flex justify-center items-center">
//                       {props?.documents?.[0]?.fileConfigurations?.[index]?.orientation}
//                     </div>
//                     <div className="text-center text-gray-700 flex justify-center items-center">
//                       <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center`}>
//                         {props?.documents?.[0]?.fileConfigurations?.[index]?.backToBack ? "Yes" : "No"}
//                       </span>
//                     </div>
//                     <div className="text-center text-gray-700 flex justify-center items-center">
//                       {props?.documents?.[0]?.fileConfigurations?.[index].copies}
//                     </div>

//                   </div>
//                 ))}
//               </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {
//       orderDelivered && (
//           <OrderDeliverConfirmationWindow
//               paymentMode = {props?.paymentMode}
//               heading = "Final Confirmation"
//               description = "Are you sure you want to continue?"
//               subHeading1 = {`Please specify additional charges/discount if any (Specify discount with negative sign )`}
//               subHeading2 = "Fine ( You can also waive the fine for the customer.)"
//               orderId = {props?.orderId}
//               agreeController = {agreeController}
//               disagreeController = {disagreeController}
//               token={token}
//               agreeText = "Yes"
//               disagreeText="Go back"
//               fineEnforced={fineEnforced}
//               fineEnforcementTimeInMinutes={props?.fineEnforcementTimeInMinutes}
//               fineRatePerMinute={props?.fineRatePerMinute}
//               timeOfReceiving={timeOfReceiving?.current}
//               disableAgreeButton={disableAgreeButton}
//               setDisableAgreeButton={setDisableAgreeButton}
//           />
//       )
//     }
//       </div>
//   );

// };

// export default UnreceivedOrderCard;
