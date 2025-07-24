// import React, { useContext } from 'react';
// import CancelConfirmationModal from './CancelConfirmationModel';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { desetOrderCancellationIndicators, setOrderCancellationIndicators } from '../../Services/operations/OrderCancellation.jsx';
// import { cancellationOfOrder } from '../../Services/operations/OrderCancellation.jsx';
// import { socketContext } from '../../ContextApi/SocketContext.js';
// import { useNavigate } from 'react-router-dom';

// const UserOrderCard = (props) => {

//   const[ CancelConfirmationWindow, setCancelConfirmationWindow] = useState(false);
//   const token = useSelector(state=>(state.auth.token));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const waitingTime=props?.waitingTime? props?.waitingTime : 0 ;
//   const {socket,setSocket} = useContext(socketContext);
//   const [disableAgreeButton , setDisableAgreeButton] = useState(false);
//   const profile = `https://api.dicebear.com/9.x/initials/svg?seed=${props?.user?.firstName} ${props?.user?.lastName}`
//   const userData = [
//     props?.s_no,
//     profile,
//     props?.paymentMode,
//     props?.documents,
//     props?.orderStatus
//   ];
//   const yourOrder = props?.yourOrder;

  

//   async function setOrderCancellationIndicatorsByUser()
//   {
//       const response = await dispatch(setOrderCancellationIndicators(token,props?.orderId, dispatch , navigate , socket , setSocket ));
      
//       if(response)
//       {
//         setCancelConfirmationWindow(true);
//         setDisableAgreeButton(false);
//         if(props?.vendorId && socket)
//         {
//             socket.emit("update-order-cancellation-indicator-to-true",{orderId : props?.orderId , roomCode : props?.vendorId}) ;
//         }
//       }
//   }

//   async function disagreeController()
//   {
//     const response = await dispatch(desetOrderCancellationIndicators(token , props?.orderId ));
//     if(response)
//     {
//       setCancelConfirmationWindow(false);
//       if(props?.vendorId && socket)
//       {
//           socket.emit("update-order-cancellation-indicator-to-false",{orderId : props?.orderId , roomCode : props?.vendorId}) ;
//       }
//     } 
//   }

//   async function agreeController(reason)
//   {
//      const response = await dispatch(cancellationOfOrder(token , props?.orderId ,reason));

//      if(response)
//      {
//         setCancelConfirmationWindow(false);
//         setDisableAgreeButton(false);
//         if(props?.vendorId && socket)
//         {
//             socket.emit("order-cancellation-is-confirmed",{orderId : props?.orderId , roomCode : props?.vendorId}) ;
//         }
//      }
//   }

//   function timeFromDate(dateInMS)
//   {

//       dateInMS = typeof dateInMS === "string" ? Date.parse(dateInMS) : dateInMS;
//       const date = new Date(dateInMS + waitingTime*60*1000 ); // Convert timestamp to a Date object
//       const hours = date?.getHours();
//       const minutes = date?.getMinutes();

//       // Format time in HH:MM:SS format
//       return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}`;
//   }


//   return (
//     <div 
//       className={`
//         max-w-full 
//         overflow-hidden 
//         border-b-grey-200
//         border-[1px]
//         group 
//         ${props?.yourOrder ? "border-l-[4px] border-l-green-700 bg-green-50" : "bg-white"}
//         transition-colors duration-200
//       `}
//     >
//       {/* Header Row */}
//       <div className="relative">
//       <div className=" grid grid-cols-5 
//       gap-4 
//       items-center 
//       p-[13px]
//       max-540:p-[10px]
//       max-360:p-[7px]
//       max-360:py-[3px]
      
//       border border-gray-100
//       group"
//     >
//       {userData.map((data, idx) => (
//         idx === 1 ? (
//           // Profile Image Cell
//           <div className="flex justify-center max-540:scale-[0.85] max-360:scale-[0.70]" key={idx}>
//             <img 
//               src={data} 
//               alt="User avatar"
//               className="w-8 h-8 rounded-full 
//                 ring-2 ring-gray-100 
//                 shadow-sm
//                 hover:ring-4 
//                 transition-all duration-200"
//             />
//           </div>
//         ) : idx === 2 ? (
          
//           <div className="flex justify-center" key={idx}>
//             <span className={`
//               px-3 py-1.5
//               text-xs font-medium
//               rounded-full
//               max-540:scale-[0.9]
//               max-540:px-2 max-540:py-1
//               max-360:scale-[0.65]
//               capitalize
//               tracking-wider
//               flex items-center gap-1.5
//               transition-all duration-200
//               ${data === "offline" 
//                 ? "text-yellow-700 bg-yellow-100 group-hover:bg-yellow-200" 
//                 : "text-emerald-700 bg-emerald-100 group-hover:bg-emerald-200"
//               }
//             `}>
//               {data}
//             </span>
//           </div>
//         ) : (idx===4?
//           <div className="flex justify-center" key={idx}>
//             <span
//               className={`
//                 px-3 py-1.5
//                 text-xs font-medium
//                 rounded-full
//                 capitalize
//                 max-540:scale-[0.9]
//                 max-360:scale-[0.65]
//                 tracking-wider
//                 relative
//                 flex items-center gap-1.5
//                 transition-all duration-200
//                 ${
//                   props?.orderStatus === "waiting"
//                     ? "text-violet-700 bg-violet-100 group-hover:bg-violet-200"
//                     : (
//                         props?.orderStatus === "waiting for customer" ?
//                         "text-red-700 bg-red-100 group-hover:bg-red-200"
//                         :
//                         (
//                           props?.orderStatus === "printing" ?
//                           "text-green-700 bg-green-100 group-hover:bg-green-200"
//                           :
//                           "text-yellow-700 bg-yellow-100 group-hover:bg-yellow-200"
//                         )
//                       )
//                 }
//                 `}
//             >
//               {data === "waiting for customer" ? "WFC" : data}
//               <img  title={data} className='absolute inset-0 opacity-0'/>
//             </span>

//           </div>
//           :
//           <div
//             key={idx}
//             className="text-center
//               px-2 py-1.5
//               text-xs
//               max-540:scale-[0.9]
//               max-360:scale-[0.75]
//               font-medium
//               text-gray-600
//               group-hover:text-gray-900
//               uppercase
//               tracking-wider
//               truncate
//               transition-colors duration-200"
//           >
//             {data}
//           </div>
//         )))}
//         </div>
        
//         {props?.userOrderCancellation && (!yourOrder) &&(props?.notifyCustomerIndicator===false) &&(
//           <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center transform transition-transform duration-300 ease-in-out">
//             <div className="bg-white/90 px-4 py-2 rounded-[2px] text-gray-700 max-870:text-[12px] max-640:text-[10px] max-640:py-1 max-500:text-[8px] text-center max-360:leading-[14px] max-500:px-[5px] max-500:py-[3px] max-420:text-[7px] max-360:text-[6px] max-640:py-1 max-870:px-3 text-sm">
//               User may be cancelling the order hence vendor can't print it , meanwhile handling other print orders
//             </div>
//           </div>
//         )}

//         {(props?.notifyCustomerIndicator===true)&&(!yourOrder) &&(props?.processOrderIndicator===false) &&(
//           <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center transform transition-transform duration-300 ease-in-out">
//             <div className="bg-white/90 px-4 py-2 rounded-[2px] text-gray-700 max-870:text-[12px] max-640:text-[10px] max-640:py-1  text-center max-360:leading-[14px] max-500:px-[6px] max-500:py-[3px] max-420:text-[8px] max-360:text-[7px] max-640:py-1 max-870:px-3 text-sm">
//               The vendor is waiting for the user to arrive , meanwhile handling other print orders. 
//             </div>
//           </div>
//         )}

//         {(props?.userOrderCancellation===false)&&(!yourOrder) &&(props?.processOrderIndicator===true) &&(
//           <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center transform transition-transform duration-300 ease-in-out">
//             <div className="bg-white/90 px-4 py-2 rounded-[2px] text-gray-700 max-870:text-[12px] max-640:text-[10px] max-640:py-1  text-center max-360:leading-[14px] max-500:px-[6px] max-500:py-[3px] max-420:text-[8px] max-360:text-[7px] max-640:py-1 max-870:px-3 text-sm">
//               Vendor is printing this order.
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Action Buttons - Only show if it's user's order */}
//       {(yourOrder) && (props?.orderStatus !== "printing") && (props?.vendorOrderCancellation === false)&&(
//         <div className={`h-0 overflow-hidden ${props?.notifyCustomerIndicator===true ? "group-hover:h-[90px] max-870:group-hover:h-[100px]":"group-hover:h-[60px] max-360:group-hover:h-[50px]"}  transition-all duration-300 ease-in-out flex justify-center items-center bg-gray-100`}>
//           <div className=" py-[5px] flex flex-col justify-center items-center gap-2 overflow-hidden">
//             {
//               (props?.notifyCustomerIndicator===true) && (
//                 <div className='text-center text-[14px]  max-640:text-[11px] max-825:text-[12px] max-360:text-[9px] mt-[10px] px-3'>
//                     Vendor is waiting for you. Please come anytime before <b>{timeFromDate(props?.timeOfTurn)}</b>, as your order will be automatically cancelled after this time.
//                 </div>
//               )
//             }
//             <button className="px-4 py-2 mb-[8px] max-360:py-1 max-825:scale-[0.90] bg-red-500 max-480:scale-[0.90] max-360:scale[0.70] max-360:text-[9px] text-sm text-white rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
//                     onClick={setOrderCancellationIndicatorsByUser}
//             >
//               Cancel Order
//             </button>
//           </div>
//         </div>
//       )}
//       {
//         (yourOrder) && (props?.orderStatus === "printing") && (

//           <div className="h-0 overflow-hidden group-hover:h-[60px] max-480:group-hover:h-[50px] transition-all  duration-300 ease-in-out bg-gray-100 flex justify-center items-center ease-in-out">
//             <div className=" py-4 px-4 text-sm max-480:text-[12px] max-360:text-[10px] max-480:leading-[14px] text-gray-600 text-center">
//               You can't cancel the order now as the vendor has started printing it.
//             </div>
//           </div>

//         )
//       }
//       {
//         (yourOrder) && (props?.vendorOrderCancellation === true) && (props?.orderStatus !== "printing") && (
//           <div className="h-0 overflow-hidden group-hover:h-[60px] max-480:group-hover:h-[50px] transition-all duration-300 bg-gray-100 flex justify-center items-center ease-in-out">
//             <div className="  py-4 px-4 text-[13px] max-480:text-[10px]  max-480:leading-[14px] text-gray-600 text-center">
//             You cannot cancel the order right now as the vendor might be processing its cancellation. Please try again later.
//             </div>
//           </div>
//         )
//       }

      

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
//                   />
//       }
//     </div>
//   );
// };

// export default UserOrderCard;
