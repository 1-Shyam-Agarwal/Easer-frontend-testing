// import React, { useContext, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setShowOrderModel } from '../Slices/PlaceOrderModelSlice';
// import { useEffect } from 'react';
// import { getOnGoingOrders } from '../Services/operations/VendorRelated';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UserOrderCard from '../components/OrderDashboardComponents/UserOrderCard';
// import UserOrderListHeader from '../components/OrderDashboardComponents/UserOrderListHeader';
// import { BsStack } from "react-icons/bs";
// import { getShopStatus } from '../Services/operations/GetUserInformation.jsx';
// import infoToast from '../components/Core/Auth/InfoToast.jsx';
// import { socketContext } from '../ContextApi/SocketContext.js';

// const OrderDashboard = () => {
//   const token = useSelector((state)=>(state.auth.token));
//   const[onGoingOrders , setOnGoingOrders] = useState([]);
//   const [searchQuery , setSearchQuery] = useState("");
//   const[isShopOpen , setIsShopOpen] = useState(false);
//   const[loading , setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const {socket,setSocket} = useContext(socketContext);
//   const role = useSelector(state=>state.auth.role) ;
//   let vendorID;
//   vendorID = location.pathname.split("/").pop();

//   useEffect(()=>
//   {
//       dispatch(getShopStatus(token , vendorID , setIsShopOpen , undefined , undefined , socket));
//   },[socket])

//   useEffect(()=>
//   {
//     dispatch(getOnGoingOrders(setOnGoingOrders ,token , setLoading ,vendorID ,dispatch ,navigate , socket, setSocket));
//   },[socket]);

//   useEffect(()=>
//   {
//     if(socket)
//     {
//         socket.emit("join-initial-self-room",vendorID);

//         if(role === "user")
//         {
//               socket.on("other-users-update-your-order-queue" , (userOrders)=>
//               {
//                   setOnGoingOrders((prev)=>
//                   {
//                       return [
//                       ...prev ,
//                       userOrders
//                       ]
//                   })
//               })

//               socket.on("customer-update-your-order-queue" , (order)=>
//               {
//                   setOnGoingOrders((prev)=>
//                   {
//                       return [
//                       ...prev ,
//                       order
//                       ]
//                   })
//               })

//               socket.on("update-cancelled-status-to-true" , (orderId)=>
//               {
//                   setOnGoingOrders((prev)=>
//                   (
//                       prev.map(order=>
//                       {
//                           if(order?.orderId === orderId)
//                           {
//                             return{
//                               ...order,
//                               "userOrderCancellation": true
//                             }
//                           }
//                           else
//                           {
//                             return{
//                               ...order
//                             }
//                           }
//                       }
//                       )
//                   ))
//               })

//               socket.on("update-cancelled-status-to-false",(orderId)=>
//               {
//                   setOnGoingOrders((prev)=>
//                   (
//                       prev.map(order=>
//                       {
//                           if(order?.orderId === orderId)
//                           {
//                             return{
//                               ...order,
//                               "userOrderCancellation": false
//                             }
//                           }
//                           else
//                           {
//                             return{
//                               ...order
//                             }
//                           }
//                       }
//                       )
//                   ))

//             })

//             socket.on("update-ongoing-orders-after-successfull-cancellation",(orderId)=>
//             {
//                 setOnGoingOrders((prev)=>
//                 (
//                     prev.filter(order=>
//                     {
//                         return order?.orderId !== orderId
//                     })
//                 ))
//             })

//             socket.on("user-update-your-cancellation-status-to-true",(orderId)=>
//             {
//               setOnGoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                           return{
//                             ...order,
//                             "vendorOrderCancellation": true
//                           }
//                         }
//                         else
//                         {
//                           return{
//                             ...order
//                           }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("user-update-your-cancellation-status-to-false",(orderId)=>
//             {
//               setOnGoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                           return{
//                             ...order,
//                             "vendorOrderCancellation": false
//                           }
//                         }
//                         else
//                         {
//                           return{
//                             ...order
//                           }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("update-shop-status",()=>
//             {
//                setIsShopOpen((prev)=>
//               {
//                   return (!prev);
//               });
//             })

//             socket.on("user-update-notify-status",(data)=>
//             {
//                 setOnGoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {

//                         if(order?.orderId === data?.orderId)
//                         {
//                           return{
//                             ...order,
//                             "notifyCustomerIndicator": true,
//                             "orderStatus": "waiting for customer",
//                             "timeOfTurn" :data?.data?.timeOfTurn,
//                             "waitingTime" : data?.data?.waitingTime
//                           }
//                         }
//                         else
//                         {
//                           return{
//                             ...order
//                           }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("user-update-your-process-status",(orderId)=>
//             {
//                 setOnGoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                           return{
//                             ...order,
//                             "processOrderIndicator": true,
//                             "orderStatus": "printing"
//                           }
//                         }
//                         else
//                         {
//                           return{
//                             ...order
//                           }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("user-reset-customer-process-status",(orderId)=>
//             {
//                 setOnGoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                           return{
//                             ...order,
//                             "processOrderIndicator": false,
//                             "orderStatus": "waiting"
//                           }
//                         }
//                         else
//                         {
//                           return{
//                             ...order
//                           }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("all-update-your-ongoing-order-as-a-order-is-completed",(orderId)=>
//             {
//                 setOnGoingOrders((prev)=>
//                 (
//                     prev.filter(order=>
//                     {
//                         return order?.orderId !== orderId
//                     })
//                 ))

//             })
//         }
//     }

//   },[role,socket]);

//   useEffect(() => {
//     // Method 1: Prevent using the pushState
//     window.history.pushState(null, '', window.location.href);

//     // Method 2: Handle popstate event
//     const handlePopstate = (event) => {
//       event.preventDefault();
//       window.history.pushState(null, '', window.location.href);
//     };
//     window.addEventListener('popstate', handlePopstate);

//     // Cleanup
//     return () => {
//       window.removeEventListener('popstate', handlePopstate);
//     };
//   }, []);

//   function searchTextHandler(e)
//   {
//       setSearchQuery(e.target.value);
//   }

//   async function shopStatusHandler()
//   {
//       const response = await dispatch(getShopStatus(token , vendorID , setIsShopOpen, dispatch , navigate , socket , setSocket));
//       if(response)
//       {
//           dispatch(setShowOrderModel(true))
//       }
//       else
//       {
//           infoToast("The shop is now closed and will not accept any further orders, but all received orders will be printed.")
//       }
//   }

//   const filteredData = onGoingOrders?.filter((item)=>
//   {
//       const fullName = `${item?.user?.firstName?.toLowerCase()} ${item?.user?.lastName?.toLowerCase()}`;
//       const query = searchQuery?.toLowerCase() ;

//       return fullName?.includes(query) || fullName?.includes(query);
//   })

//   return (
//     <div>
//       {
//         loading?
//         (
//           <div className="min-h-screen flex items-center justify-center">
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         )
//         :
//         (
//           <div className='p-2 sm:p-6 bg-gray-10 min-h-screen relative'>
//           {
//             role==="user"?
//           <div className='px-[20px] max-480:p-[4px] '>
//                     <div className='flex justify-between items-center flex-wrap pb-[20px] gap-6 max-390:gap-4'>
//                           <div className={` flex items-center gap-2 space-x-2`}>
//                               <div className="rounded-[15px] bg-blue-100 p-4 flex justify-center items-center">
//                                   <BsStack className="aspect-square h-[25px] max-390:h-[20px] text-blue-500" />
//                               </div>
//                               <h3 className="text-[28px] font-normal text-gray-800 max-390:text-[20px]">
//                               Order Queue
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
//                           <div className=' text-gray-500 pt-[4px] text-[11px]'>{ role ==="user" ? "Filter by Name" : "Filter by Customer Name"}</div>
//                       </div>
//                   </div>

//           {/* Floating Action Button */}
//           <div>
//           {
//             role === "user" && (
//             <button
//               onClick={shopStatusHandler}
//               className="fixed z-50 bottom-12 right-12 max-480:right-8 w-14 max-340:w-12 max-340:h-12 h-14
//                         bg-blue-600 hover:bg-blue-700 active:bg-blue-800
//                         rounded-full shadow-lg hover:shadow-xl
//                         transform hover:-translate-y-0.5 active:translate-y-0
//                         transition-all duration-150 ease-in-out
//                         flex items-center justify-center
//                         group"
//               aria-label="Place Order"
//             >
//               {
//                 isShopOpen ?
//                     <svg
//                     className="w-6 h-6 text-white transform group-hover:rotate-90 transition-transform duration-150"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     />
//                   </svg>
//                   :
//                   <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 200 200"
//                   width="200"
//                   height="200"
//                 >
//                   {/* <!-- Background --> */}
//                   <rect width="200" height="200" fill="#f8d7da" rx="10" />

//                   {/* <!-- Store Icon --> */}
//                   <g>
//                     <rect x="50" y="70" width="100" height="50" fill="#d9534f" rx="5" />
//                     <rect x="55" y="75" width="90" height="40" fill="#fff" rx="3" />
//                     <line x1="50" y1="70" x2="150" y2="70" stroke="#c9302c" strokeWidth="4" />
//                     <rect x="70" y="75" width="15" height="15" fill="#d9534f" />
//                     <rect x="115" y="75" width="15" height="15" fill="#d9534f" />
//                   </g>

//                   {/* <!-- "Closed" Banner --> */}
//                   <g>
//                     <rect x="30" y="130" width="140" height="30" fill="#d9534f" rx="5" />
//                     <text
//                       x="100"
//                       y="150"
//                       fontFamily="Arial, sans-serif"
//                       fontSize="14"
//                       textAnchor="middle"
//                       fill="#fff"
//                       fontWeight="bold"
//                     >
//                       SHOP IS CLOSED
//                     </text>
//                   </g>
//                 </svg>

//               }
//             </button>
//           )}
//           </div>
//             {/* Headers */}
//             <div>
//                 <UserOrderListHeader onGoingOrders={onGoingOrders}/>
//             </div>

//             {/* Data Section */}
//             <div>
//                 <div className='border-b-grey-400 border-[1px]'>
//                   {
//                     filteredData?.map((order , index) => (
//                       <UserOrderCard
//                         key={order?.orderId + Date.now()}
//                         s_no ={index+1}
//                         orderId={order?.orderId}
//                         user = {order?.user}
//                         documents={order?.documents}
//                         orderStatus={order?.orderStatus}
//                         yourOrder={order?.yourOrder}
//                         paymentMode={order?.paymentMode}
//                         vendorOrderCancellation ={order?.vendorOrderCancellation}
//                         userOrderCancellation = {order?.userOrderCancellation}
//                         notifyCustomerIndicator={order?.notifyCustomerIndicator}
//                         processOrderIndicator={order?.processOrderIndicator}
//                         timeOfTurn={order?.timeOfTurn}
//                         waitingTime={order?.waitingTime}
//                         setOnGoingOrders={setOnGoingOrders}
//                         vendorId ={vendorID}
//                       />))
//                   }
//                 </div>
//             </div>
//           </div>

//           :
//           (
//              role ==="vendor" ?
//              (
//               <div className="max-w-screen-xl mx-auto p-6 flex flex-col">
//                     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                         <div className="flex flex-col items-center text-center">

//                           <div className="mb-4 text-red-500">
//                               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                               </svg>
//                           </div>

//                           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                               Vendor can't access this page
//                           </h3>

//                           <p className="text-sm text-gray-500 max-w-sm">
//                           It looks like you're logged in as a vendor, and unfortunately, you don't have permission to access this page.
//                           If you'd like to place an order, please log in as a customer. If you need further assistance, feel free to contact our support team.
//                           </p>

//                         </div>

//                     </div>
//               </div>
//              )
//              :
//              (
//               <div className="max-w-screen-xl mx-auto p-6 flex flex-col">
//                 <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                   <div className="flex flex-col items-center text-center">
//                     <div className="mb-4 text-red-500">
//                     <svg
//                       className="w-12 h-12"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
//                       />
//                       </svg>
//                     </div>

//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       Unable to Fetch Data
//                     </h3>

//                     <p className="text-sm text-gray-500 max-w-sm">
//                       It looks like there was an issue fetching data. Please check your
//                       internet connection or reload the page to try again.
//                     </p>

//                     <button
//                       onClick={() => window.location.reload()}
//                       className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-[3px] shadow-sm hover:bg-blue-700"
//                     >
//                       Reload Page
//                     </button>
//                   </div>
//                 </div>
//               </div>

//              )
//           )

//         }
//         </div>
//         )
//       }
//     </div>
//   );
// };

// export default OrderDashboard;
