// import React, { useState } from 'react'
// import { TiArrowSortedUp ,TiArrowSortedDown } from 'react-icons/ti';
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { setNotifyCustomerIndicator } from '../../Services/operations/OrderOperations';
// import { sendMessageToUser } from '../../Services/operations/OrderOperations';
// import { setProcessOrderIndicatorByVendor } from '../../Services/operations/OrderOperations';
// import { completeUserOrder } from '../../Services/operations/OrderOperations';
// import { setOrderCancellationIndicators } from '../../Services/operations/OrderCancellation';
// import { cancellationOfOrder } from '../../Services/operations/OrderCancellation';
// import { desetOrderCancellationIndicators } from '../../Services/operations/OrderCancellation';
// import CancelConfirmationModal from '../OrderDashboardComponents/CancelConfirmationModel';
// import { useContext } from 'react';
// import { socketContext } from '../../ContextApi/SocketContext';

// const OfflineOngoingOrdersCard = (props) => {

//   const[moreDetails , setMoreDetails] = useState(false);
//   const [notifyCustomer, setNotifyCustomer] = useState(props?.notifyCustomerIndicator || false);
//   const [processOrder, setProcessOrder] = useState(props?.processCustomerIndicator || false);
//   const [completeOrder, setCompleteOrder] = useState(false);
//   const [isDisable , setIsDisable] = useState(false);
//   const [isCompleteButtonDisable , setIsCompleteButtonDisable] = useState(false);
//   const [cancelConfirmationWindow,setCancelConfirmationWindow] = useState(false);
//   const {socket,setSocket} = useContext(socketContext);
//   const roomCode = useSelector(state=>state.auth.roomCode);
//   const navigate = useNavigate();
//   const token = useSelector(state=>state.auth.token);
//   const [disableAgreeButton , setDisableAgreeButton] = useState(false);

//   const dispatch = useDispatch();

//   let date = props?.times?.timeOfCancellation;
//   date = new Date(date);

//   const formattedDate = `${String(date?.getDate())?.padStart(2, '0')}/${String(date?.getMonth() + 1)?.padStart(2, '0')}/${date?.getFullYear()}`;

//   function formattedTime(date) {
//     date = new Date(date);
//     return `${String(date?.getHours())?.padStart(2, '0')}:${String(date?.getMinutes())?.padStart(2, '0')}`;
//   }

//   const notifyCustomerHandler = async() => {

//     const toastId = toast.loading("Sending notification...");
//     setIsDisable(true);
//     const response = await dispatch(setNotifyCustomerIndicator(token,props?.orderId , "true"));

//     if(response)
//     {
//         const message = "Dear Customer,\nPlease come to the Printing Shop. Your turn has arrived.";
//         const response2 = await dispatch(sendMessageToUser(token,props?.orderId ,message));
//         if(response2)
//         {
//           setNotifyCustomer(true);
//           toast.success("Message sent successfully")
//           if(roomCode && socket)
//           {
//               socket.emit("notify-specific-customer",{orderId : props?.orderId , roomCode : roomCode,userRoomCode:props?.userId , data : response}) ;
//           }
          
//         }
//         else{
//           await dispatch(setNotifyCustomerIndicator(token,props?.orderId , "false"));
//           toast.error("Please try again.")
//         }

//     }

//     setIsDisable(false);
//     toast.dismiss(toastId);
    
//   };

//   const processOrderHandler = async() => {
//     setIsDisable(true);
//     const response = await dispatch(setProcessOrderIndicatorByVendor(token,props?.orderId));
//     if(response)
//     {
//       setProcessOrder(true);
//       if(roomCode && socket)
//       {
//           socket.emit("update-process-status-for-specific-customer",{orderId : props?.orderId , roomCode : roomCode ,userRoomCode:props?.userId}) ;
//       }
//     }
//     setIsDisable(false);
//   };

//   const completeOrderHandler = async() => {

//   setIsCompleteButtonDisable(true);
//   const message = "Your Order is Ready Please come and take it"
//   const response = await dispatch(completeUserOrder(token ,props?.orderId , message));
//   if(response)
//   {
//     setCompleteOrder(true);
//     if(roomCode && socket)
//     {
//         socket.emit("order is completed",{orderId : props?.orderId , roomCode : roomCode , userRoomCode:props?.userId}) ;
//     }
//   }
//   setIsCompleteButtonDisable(false);
// };

// async function setOrderCancellationIndicatorsByUser()
//   {
//       const response = await dispatch(setOrderCancellationIndicators(token,props?.orderId , dispatch , navigate , socket , setSocket));
//       if(response)
//       {
//         setCancelConfirmationWindow(true);
//         if(socket && props?.userId)
//         {
//           socket.emit("specific-user-update-your-cancellation-status-to-true",{orderId : props?.orderId , roomCode : props?.userId})
//         }
//       }

      
      
//   }

//   async function agreeController(reason)
//   {
//       const response = await dispatch(cancellationOfOrder(token,props?.orderId , reason, dispatch , navigate , socket , setSocket));
//       if(response)
//       {
//         setCancelConfirmationWindow(false);
//         setDisableAgreeButton(false);
//         if(roomCode && socket)
//         {
//             socket.emit("order-cancellation-is-confirmed",{orderId : props?.orderId , roomCode : roomCode}) ;
//         }
//       }
      
//   }

//   async function disagreeController()
//   {
//     const response = await dispatch(desetOrderCancellationIndicators(token,props?.orderId, dispatch , navigate , socket , setSocket))
//     if(response)
//     {
//       setCancelConfirmationWindow(false);
//       if(socket && props?.userId)
//       {
//         socket.emit("specific-user-update-your-cancellation-status-to-false",{orderId : props?.orderId , roomCode : props?.userId})
//       }
//     }
//   }

//   const userData=[
//     props?.s_no,
//     `${props?.firstName} ${props?.lastName}`,
//     props?.paymentStatus,
//     props?.price,
//     ""
//   ];

//   return (
//     <div 
//     className={`
//       max-w-full 
//       bg-white
//       overflow-hidden 
//       border-b-gray-200
//       border-[1px]
//       group 
//     `}
//   >
//         {/* Header Row */}
//         <div className="relative">
//             <div className={`grid grid-cols-5
//             gap-4 
//             items-center 
//             p-[13px]
//             max-540:p-[10px]
//             max-360:p-[7px]
//             transition-colors duration-200
//             border border-gray-100
//              ${((props?.notifyCustomerIndicator || notifyCustomer)&&(props?.processOrderIndicator===false  &&  processOrder===false)) ? "bg-gray-400":"hover:bg-gray-50"}
//             group`}
//         >
//             {userData?.map((data, idx) => (
//             (
//             idx===2?
//             <div className="flex justify-center" key={idx}>
//                 <span className={`
//                     px-3 py-1.5
//                     text-xs font-medium
//                     rounded-full
//                     capitalize
//                     tracking-wider
//                     max-540:scale-[0.9]
//                     max-540:px-2 max-540:py-1
//                     max-360:scale-[0.65]
//                     flex items-center gap-1.5
//                     transition-all duration-200
//                     ${data === "pending" 
//                     ? "text-red-700 bg-red-100 group-hover:bg-red-200" 
//                     : "text-emerald-700 bg-emerald-100 group-hover:bg-emerald-200"
//                     }
//                 `}>
//                     {data}
//                 </span>
//             </div>
//             :
//               idx===4?
//                 (((props?.notifyCustomerIndicator || notifyCustomer)&&(props?.processOrderIndicator===false  && processOrder===false)) ?
//                     <div
//                     key={idx}
//                     className="flex justify-center"
//                     >
//                       <button className={`px-3 py-1.5
//                           text-xs font-medium
//                           rounded-full
//                           capitalize
//                           max-540:scale-[0.9]
//                           max-540:px-2 max-540:py-1
//                           max-360:scale-[0.65]
//                           tracking-wider
//                           flex items-center justify-center gap-1.5
//                           transition-all duration-200
//                           ${isDisable ? "bg-gray-300 text-gray-500 cursor-not-allowed": "bg-purple-500 text-white text-center rounded hover:bg-purple-600 focus:outline-none"}`}
//                           onClick={processOrderHandler}
//                           disabled={isDisable}
//                       >
//                         Process
//                       </button>
//                     </div>
//                     :
//                     (((props?.notifyCustomerIndicator || notifyCustomer)&&(props?.processOrderIndicator  ||  processOrder)) ? 
//                     <div className="flex justify-center" key={idx}>
//                         <button
//                           className={`px-3 py-1.5
//                             text-xs font-medium
//                             rounded-full
//                             capitalize
//                             justify-center
//                             max-540:scale-[0.9]
//                             max-540:px-2 max-540:py-1
//                             max-360:scale-[0.65]
//                             tracking-wider
//                             flex items-center gap-1.5
//                             transition-all duration-200
//                             ${isCompleteButtonDisable  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : (completeOrder)?'bg-gray-300 text-gray-500 cursor-not-allowed':'bg-yellow-500 text-white hover:bg-yellow-600'}`}
//                             onClick={completeOrderHandler}
//                             disabled={isCompleteButtonDisable || completeOrder}
//                         >
//                         {
//                             completeOrder ? "Finished" : "Complete?" 
//                         }
//                         </button>
//                     </div>
//                     :
//                     <div className="flex justify-center" key={idx}>
//                             <button
//                               className={`px-3 py-1.5
//                                 text-xs font-medium
//                                 rounded-full
//                                 capitalize
//                                 tracking-wider
//                                 justify-center
//                                 max-540:scale-[0.9]
//                                 max-540:px-2 max-540:py-1
//                                 max-360:scale-[0.65]
//                                 flex items-center gap-1.5
//                                 transition-all duration-200
//                                 ${isDisable ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
//                                 onClick={notifyCustomerHandler}
//                                 disabled={isDisable}>
//                                Notify
//                             </button>
//                     </div>
//                     ))
//             :

//             <div
//             key={idx}
//             className="text-center
//                 px-2 py-1.5
//                 text-xs
//                 font-normal
//                 text-black
//                 max-540:scale-[0.9]
//                 max-540:px-2 max-540:py-1
//                 max-360:scale-[0.65]
//                 relative
//                 group-hover:text-gray-900
//                 capitalize
//                 tracking-wider
//                 transition-colors duration-200"
//             >
//             {idx===3?
//                 <div>
//                     <span>&#8377;</span> <span>{data}</span>
//                 </div>
//                 :
//                 <div className='truncate'>
//                   {data}
//                   <img  title={data} className='absolute inset-0 opacity-0'/>
//                 </div>
//             }
//             </div>
//             )))}
//           </div>
//           {props?.userOrderCancellation && (
//           <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center transform transition-transform duration-300 ease-in-out">
//             <div className="bg-white/90 px-4 py-2 rounded-[2px] text-gray-700 max-870:text-[12px] max-640:text-[10px] max-640:py-1 max-500:text-[8px] text-center max-360:leading-[14px] max-500:px-[5px] max-500:py-[3px] max-420:text-[7px] max-360:text-[6px] max-640:py-1 max-870:px-3 text-sm">
//               User may be cancelling the order hence you can't print it , meanwhile you can handle other orders.
//             </div>
//           </div>
//         )}
//         </div>

//         <div className='h-[10px] max-360:h-[7px] bg-gray-200 flex justify-center items-center' onClick={()=>{setMoreDetails(!moreDetails)}}>
//             {
//                 moreDetails ? <TiArrowSortedUp className='text-xs'/> : <TiArrowSortedDown className='text-xs'/>
//             }
//         </div>
        
//                {/* Details Section */}
//                     <div className={`overflow-hidden transition-all duration-300 ${moreDetails ? 'max-h-[3000px]' : 'max-h-0'}`}>
//                       <div className="bg-gray-100 p-[8px] space-y-[2px]">
              
//                         {/* User/Vendor Details */}
              
//                         {props?.role === "vendor" && (
//                           <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                             <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Customer Details</h3>
//                             <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 md:grid-cols-3 text-sm max-480:gap-1">
//                               <div className='font-medium max-480:text-[12px] truncate'>Name: <span className="font-normal capitalize">{`${props?.firstName} ${props?.lastName}`}</span></div>
//                               <div className='font-medium max-480:text-[12px] truncate'>Email:&nbsp;
//                                 <span className="font-normal relative">
//                                   {props?.email}
//                                   <img  title={props?.email} className='absolute inset-0 opacity-0'/>
//                                 </span>
//                                 </div>
//                               <div className='font-medium max-480:text-[12px] truncate'>Mobile Number: <span className="font-normal">{props?.mobileNumber}</span></div>
              
//                             </div>
//                           </div>
//                         )}
              
//                         {/* Times */}
//                         <div className="bg-white p-4 shadow-sm max-480:p-2">
//                           <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Time Details</h3>
//                           <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                             <div className="font-medium max-480:text-[12px] truncate">Order Time: <span className="font-normal">{formattedTime(props?.orderedAt)}</span></div>
//                           </div>
//                         </div>
              
//                         {(
//                           <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                             <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Payment Details</h3>
//                             <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                               <div className="font-medium max-480:text-[12px] truncate">Order Price: <span className="font-normal capitalize">&#8377;{props?.price}</span></div>
//                               <div className="font-medium max-480:text-[12px] truncate">Payment Mode: <span className="font-normal  capitalize">{props?.paymentMode}</span></div>
//                             </div>
//                           </div>
//                         )}
              
//                         {/* Order Files */}
//                       <div className=' p-4 bg-white'>
//                         <h3 className="text-[13px] font-normal text-gray-400 mb-[8px]">Order Files</h3>
//                         <div className="grid grid-cols-6 max-640:gap-2 gap-4 max-640:text-[10px] bg-green-100 text-black rounded-[5px] max-640:p-2 p-2 text-sm font-medium">
//                             <div className="text-left flex items-center justify-center">Docs. Name</div>
//                             <div className="text-center flex items-center justify-center ">Pages</div>
//                             <div className="text-center flex items-center justify-center ">Color</div>
//                             <div className="text-center flex items-center justify-center ">Layout</div>
//                             <div className="text-center flex items-center justify-center ">B-T-B</div>
//                             <div className="text-right flex items-center justify-center " >Copies</div>
//                         </div>
              
//                         <div className="divide-y divide-gray-200">
//                             {props?.documents?.documents?.map((order, index) => (
//                               <div
//                                 key={index}
//                                 className={`grid grid-cols-6 max-640:text-[10px] max-640:gap-2 gap-4 p-2 rounded-[5px] bg-gray-50 px-2 text-sm 
//                                   transition-all duration-200 ease-in-out  group rounded-[5px]`}
//                               >
//                                 {/* Filename with Tooltip */}
//                                 <div className="text-left text-gray-700">
//                                   <Link to={order?.secure_url} className="flex items-center justify-center relative" target="_blank" rel="noopener noreferrer">
//                                     <span className="truncate text-blue-400 underline">{order?.fileName}<img src="djnkjsdnj" title={order?.fileName} className='absolute top-0 left-0 opacity-0'/></span>
//                                   </Link>
//                                 </div>
              
//                                 {/* Other Cells with Hover Effects */}
//                                 <div className="text-right text-gray-700 font-normal flex justify-center items-center">
//                                   {props?.documents?.fileConfigurations?.[index]?.numberOfPages}
//                                 </div>
                               
//                                 <div className="text-center text-gray-700 flex justify-center items-center">
//                                   <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center`}>
//                                     {props?.documents?.fileConfigurations?.[index]?.color!=="colored" ? "B&W" : "Color"}
//                                   </span>
//                                 </div>
//                                 <div className="text-center text-gray-700 capitalize group flex justify-center items-center">
//                                   {props?.documents?.fileConfigurations?.[index]?.orientation}
//                                 </div>
//                                 <div className="text-center text-gray-700 flex justify-center items-center">
//                                   <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center`}>
//                                     {props?.documents?.fileConfigurations?.[index]?.backToBack ? "Yes" : "No"}
//                                   </span>
//                                 </div>
//                                 <div className="text-center text-gray-700 flex justify-center items-center">
//                                   {props?.documents?.fileConfigurations?.[index].copies}
//                                 </div>
                                
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                         {(
                            
//                             <div className="py-[10px] max-480:py-[3px] flex flex-col justify-center items-center gap-2 overflow-hidden">
//                                 <button className="px-4 py-2  bg-red-500 max-480:scale-[0.90] text-sm text-white rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
//                                         onClick={setOrderCancellationIndicatorsByUser}
//                                 >
//                                   Cancel Order
//                                 </button>
//                             </div>
                         
//                         )}
//                     </div>
//                 </div>
//     {
//       cancelConfirmationWindow && 
//       <CancelConfirmationModal 
//                 agreeText = "Yes" 
//                 disagreeText="Go Back"
//                 heading="Final Confirmation"
//                 description="Are you sure you want to cancel this order? "
//                 secondDescription="Please specify the reason here"
//                 numberOfRows="3"
//                 agreeController={agreeController}
//                 disagreeController={disagreeController}
//                 disableAgreeButton={disableAgreeButton}
//                 setDisableAgreeButton={setDisableAgreeButton}
//         />
//     }
//    </div>
//   )
// }

// export default OfflineOngoingOrdersCard;