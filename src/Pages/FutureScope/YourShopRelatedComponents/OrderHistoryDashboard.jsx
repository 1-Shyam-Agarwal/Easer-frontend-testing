// import React, { useContext, useEffect, useState } from 'react';
// import OrderHistoryHeader from '../components/FuturesScope/orderHistory/OrderHistoryHeader.js';
// import { useDispatch } from 'react-redux';
// import { fetchSpecificOrderHistory } from '../Services/operations/GetVarietyOfOrders';
// import { useSelector } from 'react-redux';
// import OrderHistoryCard from "../components/FuturesScope/orderHistory/OrderHistoryCard.jsx"
// import { Archive } from 'lucide-react';
// import { socketContext } from '../ContextApi/SocketContext.js';
// import { useNavigate } from 'react-router-dom';

// const OrderHistoryDashboard = () => {
//     const[orderHistory , setOrderHistory] = useState([]);
//     const[loading , setLoading] = useState(true);
//     const[searchQuery , setSearchQuery] = useState("");
//     const token = useSelector((state) => state.auth.token);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const {socket , setSocket} = useContext(socketContext);
//     const role = useSelector(state => state.auth.role);

//     function searchTextHandler(e)
//     {
//         setSearchQuery(e.target.value);
//     }

//     const filteredData = orderHistory?.filter((item)=>
//     {
//         const Name = role === "user" ?`${item?.vendor?.vendorAdditionalDetails?.shopName?.toLowerCase()} ${item?.vendor?.vendorAdditionalDetails?.shopLandMark?.toLowerCase()}`: `${item?.user?.firstName?.toLowerCase()} ${item?.user?.lastName?.toLowerCase()}`;
//         let DOO = item?.orderedAt;
//         DOO = new Date(DOO);

//         const formattedDOO = `${String(DOO?.getDate())?.padStart(2, '0')}/${String(DOO?.getMonth() + 1)?.padStart(2, '0')}/${DOO?.getFullYear()}`;

//         return Name.includes(searchQuery) || formattedDOO.includes(searchQuery);
//     })

//     useEffect(()=>
//     {
//         dispatch(fetchSpecificOrderHistory(token , setOrderHistory , setLoading ,dispatch , navigate , socket , setSocket));
//     },[socket])

//   return (
//     <div className='p-2 sm:p-6 bg-gray-10 min-h-screen relative'>
//         {
//             loading ? 
//                 <div>
//                     <div className="min-h-screen flex items-center justify-center">
//                         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                     </div>
//                 </div>
//             :
//             (
//                 (orderHistory?.length<=0)?
//                 <div>
//                     <div className="w-full max-w-2xl mx-auto bg-white rounded-[2px] shadow-sm border border-gray-200">
//                         <div className="flex flex-col items-center justify-center p-12">
//                             <div className="rounded-full bg-green-50 p-4 mb-4">
//                                 <Archive className="h-8 w-8 text-green-500" />
//                             </div>
                            
//                             <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
//                                 No Order History
//                             </h3>
                            
//                             <p className="text-gray-500 text-center max-w-sm mb-6">
//                                 You haven't placed any orders yet.
//                             </p>
                            
//                             <div className="w-full max-w-xs border-t border-gray-200" />
//                         </div>
//                     </div>
//                 </div>
//                 :
//                 <div className='px-[20px] max-480:p-[4px] '>
//                     <div className='flex justify-between items-center flex-wrap pb-[20px] gap-6 max-390:gap-4'>
//                           <div className={` flex items-center gap-2 space-x-2`}>
//                               <div className="rounded-[15px] bg-blue-100 p-4 flex justify-center items-center">
//                                   <Archive className="aspect-square h-[25px] max-390:h-[20px] text-blue-500" />
//                               </div>
//                               <h3 className="text-[28px] font-normal text-gray-800 max-390:text-[20px]">
//                               Order History
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
//                           <div className=' text-gray-500 pt-[4px] text-[11px]'>{ role ==="user" ? "Filter by DOO & Shop" : "Filter by DOO & Customer"}</div>
//                       </div>
//                   </div>
                  
//                     <OrderHistoryHeader
//                         orderHistory = {orderHistory}
//                         role = {role}
//                     />

//                     {
//                         filteredData?.map((order , idx)=>
//                         {
//                             return (
//                                 <OrderHistoryCard
//                                     key = {order?.orderId + Date.now()}
//                                     S_No = {idx + 1}
//                                     orderedAt = {order?.orderedAt}
//                                     orderId = {order?.orderId}
//                                     role = {role}
//                                     user = {order?.user}
//                                     vendor = {order?.vendor?.vendorAdditionalDetails}
//                                     paymentMode = {order?.paymentMode}
//                                     paymentStatus={order?.paymentStatus}
//                                     price = {order?.price}
//                                     timeOfCompletion ={order?.timeOfCompletion}
//                                     timeOfTurn = {order?.timeOfTurn}
//                                     timeOfPrinting = {order?.timeOfPrinting}
//                                     timeOfReceiving = {order?.timeOfReceiving}
//                                     orderFiles = {order?.orderFiles}
//                                     transactionId = {order?.transactionId}
//                                     transactionUserId = {order?.transactionUserId}
//                                     exactFine = {order?.exactFine}
//                                     fineTaken = {order?.fineTaken}
//                                     additionalCharges = {order?.additionalCharges}
//                                     paymentId = {order?.paymentId}
//                                     bankReferenceNumber ={order?.bankReferenceNumber}
//                                 />
//                             )
//                         })
//                     }

//                 </div>
//             )
//         }
        
//     </div>
//   )
// }

// export default OrderHistoryDashboard