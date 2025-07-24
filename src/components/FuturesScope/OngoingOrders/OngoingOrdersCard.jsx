// import React from 'react'
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { desetOrderCancellationIndicators, setOrderCancellationIndicators } from '../../Services/operations/OrderCancellation.jsx';
// import { cancellationOfOrder } from '../../Services/operations/OrderCancellation.jsx';
// import CancelConfirmationModal from '../OrderDashboardComponents/CancelConfirmationModel.jsx';
// import { TiArrowSortedDown } from "react-icons/ti";
// import { TiArrowSortedUp } from "react-icons/ti";
// import { Link, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { socketContext } from '../../ContextApi/SocketContext.js';

// const OnGoingOrderCard = (props) => {

//   const[ CancelConfirmationWindow, setCancelConfirmationWindow] = useState(false);
//   const[moreDetails , setMoreDetails] = useState(false);
//   const token = useSelector(state=>(state.auth.token));
//   const dispatch = useDispatch();
//   const {socket,setSocket} = useContext(socketContext);
//   const navigate = useNavigate();
//   const waitingTime=props?.waitingTime? props?.waitingTime : 0 ;
//   const [disableAgreeButton , setDisableAgreeButton] = useState(false);


//   function timeFromDate(dateInMS)
//   {

//       dateInMS = typeof dateInMS === "string" ? Date.parse(dateInMS) : dateInMS;
//       const date = new Date(dateInMS + waitingTime*60*1000 ); // Convert timestamp to a Date object
//       const hours = date?.getHours();
//       const minutes = date?.getMinutes();

//       // Format time in HH:MM:SS format
//       return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}`;
//   }

//   const userData = [
//     props.S_No,
//     props?.shopName,
//     props?.paymentStatus,
//     props?.price,
//     props?.orderStatus,
//   ];

//   async function setOrderCancellationIndicatorsByUser()
//     {
//         const response = await dispatch(setOrderCancellationIndicators(token,props?.orderId,dispatch,navigate , socket ,setSocket));
//         if(response)
//         {
//           setCancelConfirmationWindow(true);
//           if(props?.vendorId && socket)
//           {
//               socket.emit("update-order-cancellation-indicator-to-true",{orderId : props?.orderId , roomCode : props?.vendorId}) ;
//           }
//         }
//     }
  
//     async function agreeController(reason)
//     {
//         const response = await dispatch(cancellationOfOrder(token,props?.orderId , reason,dispatch,navigate , socket ,setSocket));
//         if(response)
//         {
//           setCancelConfirmationWindow(false);
//           setDisableAgreeButton(false);
//           if(props?.vendorId && socket)
//           {
//               socket.emit("order-cancellation-is-confirmed",{orderId : props?.orderId , roomCode : props?.vendorId}) ;
//           }
//         }
        
//     }
  
//     async function disagreeController()
//     {
//       const response = await dispatch(desetOrderCancellationIndicators(token,props?.orderId,dispatch,navigate , socket ,setSocket))
//       if(response)
//       {
//         setCancelConfirmationWindow(false);
//         if(props?.vendorId && socket)
//         {
//             socket.emit("update-order-cancellation-indicator-to-false",{orderId : props?.orderId , roomCode : props?.vendorId}) ;
//         }
//       }
//     }

 


//   return (
//     <div 
//       className={`
//         max-w-full 
//         bg-white
//         overflow-hidden 
//         border-b-gray-200
//         border-[1px]
//         group 
//       `}
//     >
//       {/* Header Row */}
//       <div className="relative">
//           <div className=" grid grid-cols-5
//           gap-4 
//           items-center 
//           p-[13px]
//           max-540:p-[10px]
//           max-360:p-[7px]
//           hover:bg-gray-50
//           transition-colors duration-200
//           border border-gray-100
//           group"
//         >
//           {userData.map((data, idx) => (
//           (
//             idx===2?
//             <div className="flex justify-center" key={idx}>
//                 <span className={`
//                   px-3 py-1.5
//                   text-xs font-medium
//                   rounded-full
//                   capitalize
//                   max-540:scale-[0.9]
//                   max-540:px-2 max-540:py-1
//                   max-360:scale-[0.65]
//                   tracking-wider
//                   flex items-center gap-1.5
//                   transition-all duration-200
//                   ${data === "pending" 
//                     ? "text-red-700 bg-red-100 group-hover:bg-red-200" 
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
//                     max-540:scale-[0.9]
//                     max-360:scale-[0.65]
//                     capitalize
//                     relative
//                     tracking-wider
//                     flex items-center gap-1.5
//                     transition-all duration-200
//                     ${
//                       props?.orderStatus === "waiting"
//                         ? "text-violet-700 bg-violet-100 group-hover:bg-violet-200"
//                         : (
//                             props?.orderStatus === "waiting for customer" ?
//                             "text-red-700 bg-red-100 group-hover:bg-red-200"
//                             :
//                             (
//                               props?.orderStatus === "printing" ?
//                               "text-green-700 bg-green-100 group-hover:bg-green-200"
//                               :
//                               "text-yellow-700 bg-yellow-100 group-hover:bg-yellow-200"
//                             )
//                           )
//                     }`}
//                 >
//                   {data === "waiting for customer" ? "WFC" : data}
//                   <img  title={data} className='absolute inset-0 opacity-0'/>
//                 </span>

//               </div>
//               : idx ===3 ?
//               (
//                 <div
//                   key={idx}
//                   className="text-center
//                     px-2 py-1.5
//                     text-xs
//                     font-normal
//                     text-black
//                     max-540:scale-[0.9]
//                     max-360:scale-[0.75]
//                     group-hover:text-gray-900
//                     capitalize
//                     tracking-wider
//                     transition-colors duration-200"
//                 >
//                   &#8377; {props?.price}</div>
//               )
//               :
//               (
//                 idx === 1 ? 
//                 (
//                   <div
//                     key={idx}
//                     className="text-center
//                       px-2 py-1.5
//                       text-xs
//                       font-normal
//                       text-black
//                       max-540:scale-[0.9]
//                       max-360:scale-[0.75]
//                       truncate
//                       relative
//                       group-hover:text-gray-900
//                       capitalize
//                       tracking-wider
//                       transition-colors duration-200"
//                   >
//                     {data}
//                     <img  title={data} className='absolute inset-0 opacity-0'/>
//                   </div>

//                 )
//                 :
//                 (
//                   <div
//                     key={idx}
//                     className="text-center
//                       px-2 py-1.5
//                       text-xs
//                       font-normal
//                       text-black
//                       max-540:scale-[0.9]
//                       max-360:scale-[0.75]
//                       group-hover:text-gray-900
//                       capitalize
//                       tracking-wider
//                       transition-colors duration-200"
//                   >
//                     {data}
//                   </div>
//                 )
//               )
              
//           )))}
//         </div>
        
//        <div className='h-[10px] max-360:h-[7px] bg-gray-200 flex justify-center items-center' onClick={()=>{setMoreDetails(!moreDetails)}}>
//           {
//               moreDetails ? <TiArrowSortedUp className='text-xs'/> : <TiArrowSortedDown className='text-xs'/>
//           }
//        </div>
        
//       </div>

//         {/* Details Section */}
//       <div className={`overflow-hidden transition-all duration-300 ${moreDetails ? 'max-h-[3000px]' : 'max-h-0'}`}>
//         <div className="bg-gray-100 p-[8px] space-y-[2px]">

//           {/* User/Vendor Details */}
//           {props?.role === "user" && (
//             <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//               <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Vendor Details</h3>
//               <div className="grid  max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                 <div className="font-medium max-480:text-[12px] truncate">Shop Name:&nbsp;  
//                     <span className="font-normal capitalize relative">{props?.shopName}
//                       <img  title={props?.shopName} className='absolute inset-0 opacity-0'/>
//                     </span>
//                 </div>
//                 <div className="font-medium max-480:text-[12px] truncate">Location:&nbsp; 
//                   <span className="font-normal capitalize relative">
//                     {props?.shopLandMark}
//                     <img  title={props?.shopLandMark} className='absolute inset-0 opacity-0'/>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}


//           {/* Times */}
//           <div className="bg-white p-4 shadow-sm max-480:p-2">
//             <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Time Details</h3>
//             <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//               <div className="font-medium max-480:text-[12px] truncate">Order Time: <span className="font-normal">{timeFromDate(props?.orderedAt)}</span></div>
//             </div>
//           </div>

//           {(
//             <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//               <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Payment Details</h3>
//               <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                 <div className="font-medium max-480:text-[12px] truncate">Order Price: <span className="font-normal capitalize">&#8377;{props?.price}</span></div>
//                 <div className="font-medium max-480:text-[12px] truncate">Payment Mode: <span className="font-normal  capitalize">{props?.paymentMode}</span></div>
//               </div>
//             </div>
//           )}

//           {
//               props?.paymentMode === "online"?
//               (
//                 <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                   <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Transaction Details</h3>
//                   <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                     <div className="font-medium max-480:text-[12px] truncate">Payment Id : <span className="font-normal capitalize">{props?.paymentId}</span></div>
//                     <div className="font-medium max-480:text-[12px] truncate">Bank Reference Number : <span className="font-normal  capitalize">{props?.bankReferenceNumber}</span></div>
//                   </div>
//                 </div>
//               )
//               :
//               (
//                   <div></div>
//               )
//           }

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
//               {props?.documents?.documents?.map((order, index) => (
//                 <div
//                   key={index}
//                   className={`grid grid-cols-6 max-640:text-[10px] max-640:gap-2 gap-4 p-2 rounded-[5px] bg-gray-50 px-2 text-sm 
//                     transition-all duration-200 ease-in-out  group rounded-[5px]`}
//                 >
//                   {/* Filename with Tooltip */}
//                   <div className="text-left text-gray-700">
//                     <Link to={order?.secure_url} className="flex items-center justify-center relative" target="_blank" rel="noopener noreferrer">
//                       <span className="truncate text-blue-400 underline">{order?.fileName}<img src="djnkjsdnj" title={order?.fileName} className='absolute top-0 left-0 opacity-0'/></span>
//                     </Link>
//                   </div>

//                   {/* Other Cells with Hover Effects */}
//                   <div className="text-right text-gray-700 font-normal flex justify-center items-center">
//                     {props?.documents?.fileConfigurations?.[index]?.numberOfPages}
//                   </div>
                 
//                   <div className="text-center text-gray-700 flex justify-center items-center">
//                     <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center`}>
//                       {props?.documents?.fileConfigurations?.[index]?.color!=="colored" ? "B&W" : "Color"}
//                     </span>
//                   </div>
//                   <div className="text-center text-gray-700 capitalize group flex justify-center items-center">
//                     {props?.documents?.fileConfigurations?.[index]?.orientation}
//                   </div>
//                   <div className="text-center text-gray-700 flex justify-center items-center">
//                     <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center`}>
//                       {props?.documents?.fileConfigurations?.[index]?.backToBack ? "Yes" : "No"}
//                     </span>
//                   </div>
//                   <div className="text-center text-gray-700 flex justify-center items-center">
//                     {props?.documents?.fileConfigurations?.[index]?.copies}
//                   </div>
                  
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* Action Buttons - Only show if it's user's order */}
//       {(props?.orderStatus !== "printing") && (props?.vendorOrderCancellation === false)&&(
//         <div className={`${props?.notifyCustomerIndicator===true ? "max-h-[300px]":"h-[60px]"} ease-in-out flex justify-center items-center bg-gray-100`}>
//           <div className=" py-[10px] max-480:py-[3px] flex flex-col justify-center items-center gap-2 overflow-hidden">
//             {
//               (props?.notifyCustomerIndicator===true) && (
//                 <div className='px-4 text-sm text-gray-600 text-center max-480:leading-[18px] max-480:text-[12px]'>
//                     Vendor is waiting for you. Please come anytime before <b>{timeFromDate(props?.timeOfTurn)}</b>, as your order will be automatically cancelled after this time.
//                 </div>
//               )
//             }
//             <button className="px-4 py-2 mb-[8px] bg-red-500 max-480:scale-[0.90] text-sm text-white rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
//                     onClick={setOrderCancellationIndicatorsByUser}
//             >
//               Cancel Order
//             </button>
//           </div>
//         </div>
//       )}
//       {
//         (props?.orderStatus === "printing") && (

//           <div className="max-h-[100px] bg-gray-100 flex justify-center items-center ease-in-out">
//             <div className=" max-480:py-1  py-3 pb-4 max-480:pb-3  px-4 text-sm text-gray-600 text-center max-480:leading-[18px] max-480:text-[12px]">
//               You can't cancel the order now as the vendor has started printing it.
//             </div>
//           </div>

//         )
//       }
//       {
//         (props?.vendorOrderCancellation === true) && (props?.orderStatus !== "printing") && (
//           <div className="max-h-[200px] bg-gray-100 flex justify-center items-center ease-in-out">
//             <div className="max-480:py-1  py-3 pb-4 max-480:pb-3  px-4 text-sm text-gray-600 text-center max-480:leading-[18px] max-480:text-[12px]">
//             You cannot cancel the order right now as the vendor might be processing its cancellation. Please try again later.
//             </div>
//           </div>
//         )
//       }

//       </div>
      

    
//       {
//         CancelConfirmationWindow && 
//         <CancelConfirmationModal 
//                   agreeText = "Yes" 
//                   disagreeText="Go Back"
//                   heading="Final Confirmation"
//                   description="Are you sure you want to cancel this order? "
//                   secondDescription="Please specify the reason here"
//                   numberOfRows="3"
//                   agreeController={agreeController}
//                   disagreeController={disagreeController} 
//                   disableAgreeButton={disableAgreeButton}
//                   setDisableAgreeButton={setDisableAgreeButton}
//         />
//       }
//     </div>
//   );
// };

// export default OnGoingOrderCard;
