// import React, { useContext, useEffect, useState } from 'react';
// import UnreceivedOrdersHeader from '../components/FuturesScope/UnrecievedDashboard/unrecievedHeader.jsx';
// import { useDispatch } from 'react-redux';
// import { fetchAllSpecificUnreceivedOrders } from '../Services/operations/GetVarietyOfOrders';
// import { useSelector } from 'react-redux';
// import UnreceivedOrderCard from '../components/FuturesScope/UnrecievedDashboard/unrecievedCard.js';
// import { ShoppingCart } from 'lucide-react';
// import { socketContext } from '../ContextApi/SocketContext.js';
// import { useNavigate } from 'react-router-dom';

// const UnreceivedOrders = () => {

//   const [unreceivedOrders , setUnreceivedOrders] = useState([]);
//   const role = useSelector(state => state.auth.role) ;
//   const token = useSelector((state) => state.auth.token);
//   const [loading , setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {socket , setSocket} = useContext(socketContext);
//   const [searchQuery , setSearchQuery] = useState("");

//   function searchTextHandler(e)
//   {
//       setSearchQuery(e.target.value);
//   }

//   const filteredData = unreceivedOrders?.filter((order)=>
//   {
//       const paymentStatus = order?.paymentStatus?.toLowerCase();
//       let TOC = order?.timeOfCompletion;
//       TOC = new Date(TOC);
//       const entity = role==="user" ?(order?.vendor?.vendorAdditionalDetails?.shopName?.toLowerCase()) : `${order?.user?.firstName} ${order?.user?.lastName}`;

//       const formattedTOC = `${String(TOC?.getHours())?.padStart(2, '0')}:${String(TOC?.getMinutes())?.padStart(2, '0')}`;;
//       const query = searchQuery?.toLowerCase();

//       return(
//         paymentStatus?.includes(query) || formattedTOC?.includes(query) || entity?.includes(query)
//       )
//   })

//   useEffect(()=>{

//     dispatch(fetchAllSpecificUnreceivedOrders(token , setUnreceivedOrders,setLoading,dispatch,navigate,socket,setSocket));

//   },[socket])

//   useEffect(()=>
//   {
//       if(socket && role)
//       {
//         if(role === "vendor")
//         {
//           socket.on("vendor-update-your-unreceived-orders" , (orderId)=>
//           {
//               setUnreceivedOrders((prev)=>
//               (

//                   prev.filter(order=>
//                   {
//                       return order?.orderId !==orderId
//                   })
//               ))
//           })
//         }

//         if(role === "user")
//         {
//           socket.on("user-update-your-unreceived-orders" , (orderId)=>
//           {

//               setUnreceivedOrders((prev)=>
//               (
//                   prev.filter((order)=>
//                   {
//                       return order?.orderId !==orderId
//                   })
//               ))
//           })
//         }

//       }
//   },[socket , role])

//   return (
//     <div className='p-2 sm:p-6 bg-gray-10 min-h-screen relative'>
//       {
//           loading?
//           (
//             <div className="min-h-screen flex items-center justify-center">
//               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )
//           :
//           (
//             unreceivedOrders?.length<=0?
//             (
//               <div className="w-full max-w-2xl mx-auto bg-white rounded-[2px] shadow-sm border border-gray-200">
//                   <div className="flex flex-col items-center justify-center p-12">
//                       <div className="rounded-full bg-red-50 p-4 mb-4">
//                           <ShoppingCart className="h-8 w-8 text-red-500" />
//                       </div>

//                       <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
//                           No Unreceived Orders
//                       </h3>

//                       <p className="text-gray-500 text-center max-w-sm mb-6">
//                           You have no pending orders waiting to be received.
//                       </p>

//                       <div className="w-full max-w-xs border-t border-gray-200" />
//                   </div>
//               </div>
//             )
//             :
//               <div className='px-[20px] max-480:p-[4px] '>
//                   {/* Header Section */}
//                   <div className='flex justify-between items-center flex-wrap pb-[20px] gap-6 max-390:gap-4'>
//                           <div className={` flex items-center gap-2 space-x-2`}>
//                               <div className="rounded-[15px] bg-blue-100 p-4 flex justify-center items-center">
//                                   <ShoppingCart className="aspect-square h-[25px] max-390:h-[20px] text-blue-500" />
//                               </div>
//                               <h3 className="text-[28px] font-normal text-gray-800 max-390:text-[20px]">
//                               Unreceived Orders
//                               </h3>
//                           </div>

//                           {/* Search Bar Section */}
//                           <div className="flex items-start flex-col space-x-4 ">
//                               {/* Search Input */}
//                               <div className="flex-l w-[390px] max-450:w-[300px]">
//                                   <div className="relative flex items-center">

//                                   <input
//                                       type="text"
//                                       placeholder="Search Orders"
//                                       className="w-full py-2.5 px-4 max-360:py-2 bg-gray-100
//                                               border-0 rounded-[9px]
//                                               text-gray-700 placeholder-gray-500
//                                               focus:outline-none focus:ring-2 focus:ring-blue-500
//                                               transition-all duration-200"
//                                       onChange={searchTextHandler}
//                                       value={searchQuery}
//                                   />

//                                   <div className="absolute right-3">
//                                       <svg
//                                       className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       viewBox="0 0 24 24"
//                                       >
//                                       <path
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                           strokeWidth={2}
//                                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                       />
//                                       </svg>
//                                   </div>

//                               </div>
//                           </div>
//                           <div className=' text-gray-500 pt-[4px] text-[11px]'>{ role ==="user" ? "Filter by TOC , Shop , Payment status" : "Filter by TOC , Customer , Payment status"}</div>
//                       </div>
//                   </div>

//               <UnreceivedOrdersHeader unreceivedOrders={unreceivedOrders} role={role}/>
//               {
//                 filteredData?.map((order,index)=>
//                 {
//                   return  <UnreceivedOrderCard
//                         key={order?.orderId + Date.now()}
//                         role={role}
//                         s_no={index+1}
//                         shopName={order?.vendor?.vendorAdditionalDetails?.shopName}
//                         shopLocation={order?.vendor?.vendorAdditionalDetails?.shopLandMark}
//                         firstName={order?.user?.firstName}
//                         lastName={order?.user?.lastName}
//                         email={order?.user?.email}
//                         mobileNumber={order?.user?.mobileNumber}
//                         orderedAt={order?.orderedAt}
//                         orderId ={order?.orderId}
//                         fineEnforcementTimeInMinutes={order?.vendor?.vendorAdditionalDetails?.fineSchema?.fineEnforcementTimeInMinutes}
//                         fineRatePerMinute={order?.vendor?.vendorAdditionalDetails?.fineSchema?.fineRatePerMinute}
//                         timeOfTurn={order?.timeOfTurn}
//                         timeOfProcessing={order?.timeOfProcessing}
//                         timeOfCompletion={order?.timeOfCompletion}
//                         price={order?.price}
//                         paymentStatus={order?.paymentStatus}
//                         paymentMode={order?.paymentMode}
//                         documents = {order?.documents}
//                         userRoomCode = {order?.user?.userId}
//                         paymentId = {order?.paymentId}
//                         bankReferenceNumber ={order?.bankReferenceNumber}
//                     />

//                 })
//               }
//             </div>
//           )

//       }
//     </div>
//   )
// }

// export default UnreceivedOrders;
