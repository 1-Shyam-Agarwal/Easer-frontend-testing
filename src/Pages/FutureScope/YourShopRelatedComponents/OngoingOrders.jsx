// import React, { useContext, useEffect, useRef } from 'react'
// import { fetchAllSpecificOnGoingOrders } from '../Services/operations/GetVarietyOfOrders';
// import { useState } from 'react';
// import { useDispatch ,useSelector } from 'react-redux';
// import OngoingOrdersHeader from "../components/FuturesScope/OngoingOrders/OngoingOrdersHeader.js";
// import OnGoingOrderCard from '../components/FuturesScope/OngoingOrders/OngoingOrdersCard.js';
// import { PackageSearch } from 'lucide-react';
// import OfflineOngoingOrdersCard from '../components/FuturesScope/OngoingOrders/OfflineOngoingOrdersCard.js';
// import OnlineOngoingOrdersCard from '../components/FuturesScope/OngoingOrders/OnlineOngoingOrdersCard.jsx';
// import { socketContext } from '../ContextApi/SocketContext.js';
// import { useNavigate } from 'react-router-dom';
// import infoToast from '../components/Core/Auth/InfoToast.jsx';
// import toast from 'react-hot-toast';

// const OngoingOrders = (props) => {

//     const[ongoingOrders , setOngoingOrders] = useState([]);
//     const[loading , setLoading]=useState(true);
//     const token = useSelector((state) => state.auth.token);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const[searchQuery , setSearchQuery] = useState("");
//     const role = useSelector(state => state.auth.role);
//     const {socket , setSocket} = useContext(socketContext);
//     let isUserOnWebsite = useRef(true);

//     useEffect(()=>
//     {

//         if(role === "vendor")
//         {
//             document.addEventListener("visibilitychange", () => {
//                 isUserOnWebsite.current = !isUserOnWebsite.current;
//             })

//             if (Notification.permission === "default") {
//                 Notification.requestPermission().then(permission => {
//                     if (permission === "granted") {
//                         toast.success("Now we are fully equipped to send you order notifications when you are on other websites.")
//                     }
//                     else if(permission === "denied")
//                     {
//                         infoToast("Blocking notifications prevents us from sending order alerts when you are on other websites.")
//                     }
//                 });
//             }
//             else if(Notification.permission === "denied")
//             {
//                 infoToast("You blocked the notifications due to which we can't send order alerts to you.Please allow it so that we can send.");
//             }
//         }

//         return ()=>
//         {
//             if(role === "vendor")
//             {
//                 document.removeEventListener("visibilitychange" ,() => {
//                     isUserOnWebsite.current = !isUserOnWebsite.current;
//                 } )
//             }
//         }
//     },[role])

//     function searchTextHandler(e)
//     {
//         setSearchQuery(e.target.value);

//     }

//     const filteredData = ongoingOrders?.filter((item)=>
//     {
//         const Name = role ==="user" ?`${item?.vendor?.vendorAdditionalDetails?.shopName?.toLowerCase()}`: `${item?.user?.firstName?.toLowerCase()} ${item?.user?.lastName?.toLowerCase()}`;
//         const query = searchQuery?.toLowerCase() ;

//         return Name?.includes(query) ;
//     })

//     // Fetch ongoing orders once role is available
//     useEffect(() => {
//             dispatch(fetchAllSpecificOnGoingOrders(token, setOngoingOrders , setLoading ,dispatch , navigate , socket , setSocket));
//     }, [socket]);

//     useEffect(()=>
//     {
//         if(role==="vendor")
//         {
//             socket.on("vendor-update-your-ongoing-orders" , (order)=>
//             {
//                 if(!isUserOnWebsite.current)
//                 {
//                     if(Notification.permission === "granted")
//                     {
//                         new Notification("New Order Placed", {
//                             body: "You have a new order. Check it now!",
//                             tag: "order-notification",
//                             requireInteraction: true ,
//                         });
//                     }
//                 }
//                 setOngoingOrders((prev)=>
//                 {
//                     return [
//                         ...prev,
//                         order
//                     ]
//                 })
//             })

//             socket.on("update-cancelled-status-to-true" , (orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                             return{
//                             ...order,
//                             "userOrderCancellation": true
//                             }
//                         }
//                         else
//                         {
//                             return{
//                             ...order
//                             }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("update-cancelled-status-to-false",(orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                             return{
//                             ...order,
//                             "userOrderCancellation": false
//                             }
//                         }
//                         else
//                         {
//                             return{
//                             ...order
//                             }
//                         }
//                     }
//                     )
//                 ))

//             })

//             socket.on("update-ongoing-orders-after-successfull-cancellation",(orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.filter(order=>
//                     {
//                         return order?.orderId !== orderId
//                     })
//                 ))
//             })

//             socket.on("all-update-your-ongoing-order-as-a-order-is-completed",(orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.filter(order=>
//                     {
//                         return order?.orderId !== orderId
//                     })
//                 ))

//             })
//         }
//         else if(role ==="user")
//         {
//             socket.on("update-ongoing-orders-after-successfull-cancellation",(orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.filter(order=>
//                     {
//                         return order?.orderId !== orderId
//                     })
//                 ))
//             })

//             socket.on("user-update-your-cancellation-status-to-true",(orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                             return{
//                             ...order,
//                             "vendorOrderCancellation": true
//                             }
//                         }
//                         else
//                         {
//                             return{
//                             ...order
//                             }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("user-update-your-cancellation-status-to-false",(orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                             return{
//                             ...order,
//                             "vendorOrderCancellation": false
//                             }
//                         }
//                         else
//                         {
//                             return{
//                             ...order
//                             }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("user-update-notify-status-in-your-ongoing-dashboard",(data)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === data?.orderId)
//                         {
//                             return{
//                             ...order,
//                             "notifyCustomerIndicator": true,
//                             "orderStatus": "waiting for customer",
//                             "timeOfTurn" :data?.data?.timeOfTurn,
//                             "waitingTime" : data?.data?.waitingTime
//                             }
//                         }
//                         else
//                         {
//                             return{
//                             ...order
//                             }
//                         }
//                     }
//                     )
//                 ))
//             })
//             socket.on("user-reset-your-process-status-in-your-ongoing-dashboard" , (orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                             return{
//                             ...order,
//                             "processOrderIndicator": false,
//                             "orderStatus": "waiting"
//                             }
//                         }
//                         else
//                         {
//                             return{
//                             ...order
//                             }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("user-update-your-process-status-in-your-ongoing-dashboard",(orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.map(order=>
//                     {
//                         if(order?.orderId === orderId)
//                         {
//                             return{
//                             ...order,
//                             "processOrderIndicator": true,
//                             "orderStatus": "printing"
//                             }
//                         }
//                         else
//                         {
//                             return{
//                             ...order
//                             }
//                         }
//                     }
//                     )
//                 ))
//             })

//             socket.on("user-update-your-ongoing-order-in-your-ongoing-dashboard-as-a-order-is-completed",(orderId)=>
//             {
//                 setOngoingOrders((prev)=>
//                 (
//                     prev.filter(order=>
//                     {
//                         return order?.orderId !== orderId
//                     })
//                 ))
//             })
//         }

//     },[role])

//   return (
//     <div>
//       {
//           loading ?
//           (
//             <div className="min-h-screen flex items-center justify-center">
//               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )
//           :
//           (
//             <div className='p-2 sm:p-6 bg-gray-10 min-h-screen relative'>
//             {
//                 ongoingOrders?.length>0?
//                 <div className='px-[20px] max-480:p-[4px] '>
//                             {/* Header Section */}
//                             <div className='flex justify-between items-center flex-wrap pb-[20px] gap-6 max-390:gap-4'>
//                                     <div className={` flex items-center gap-2 space-x-2`}>
//                                         <div className="rounded-[15px] bg-blue-100 p-4 flex justify-center items-center">
//                                             <PackageSearch className="aspect-square h-[25px] max-390:h-[20px] text-blue-500" />
//                                         </div>
//                                         <h3 className="text-[28px] font-normal text-gray-800 max-390:text-[20px]">
//                                         Ongoing Orders
//                                         </h3>
//                                     </div>

//                                     {/* Search Bar Section */}
//                                     <div className="flex items-start flex-col space-x-4 ">
//                                         {/* Search Input */}
//                                         <div className="flex-l w-[390px] max-450:w-[300px]">
//                                             <div className="relative flex items-center">

//                                             <input
//                                                 type="text"
//                                                 placeholder="Search Orders"
//                                                 className="w-full py-2.5 px-4 max-360:py-2 bg-gray-100
//                                                         border-0 rounded-[9px]
//                                                         text-gray-700 placeholder-gray-500
//                                                         focus:outline-none focus:ring-2 focus:ring-blue-500
//                                                         transition-all duration-200"
//                                                 onChange={searchTextHandler}
//                                                 value={searchQuery}
//                                             />

//                                             <div className="absolute right-3">
//                                                 <svg
//                                                 className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                                 >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth={2}
//                                                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                                 />
//                                                 </svg>
//                                             </div>

//                                         </div>
//                                     </div>
//                                     <div className=' text-gray-500 pt-[4px] text-[11px]'>{ role ==="user" ? "Filter by Shop" : "Filter by Customer"}</div>
//                                 </div>
//                             </div>

//                     <OngoingOrdersHeader role={role}/>
//                     {
//                         role ==="user"?
//                         filteredData?.map((order ,idx)=>
//                         {

//                             return (
//                                 <OnGoingOrderCard
//                                     key={order?.orderId + Date.now()}
//                                     orderedAt = {order?.orderedAt}
//                                     orderId = {order?.orderId}
//                                     price = {order?.price}
//                                     paymentMode = {order?.paymentMode}
//                                     paymentStatus = {order?.paymentStatus}
//                                     orderStatus = {order?.orderStatus}
//                                     S_No = {idx+1}
//                                     documents={order?.documents}
//                                     vendorOrderCancellation ={order?.vendorOrderCancellation}
//                                     userOrderCancellation = {order?.userOrderCancellation}
//                                     notifyCustomerIndicator={order?.notifyCustomerIndicator}
//                                     processOrderIndicator={order?.processOrderIndicator}
//                                     timeOfTurn={order?.timeOfTurn}
//                                     waitingTime ={order?.waitingTime}
//                                     role ={role}
//                                     shopName ={order?.vendor?.vendorAdditionalDetails?.shopName}
//                                     shopLandMark ={order?.vendor?.vendorAdditionalDetails?.shopLandMark}
//                                     vendorId={order?.vendor?.userId}
//                                     paymentId = {order?.paymentId}
//                                     bankReferenceNumber = {order?.bankReferenceNumber}
//                                 />
//                             );
//                         })
//                         :
//                         ((role === "vendor") ?
//                             filteredData?.map((order ,idx)=>
//                             {
//                                 return (order?.paymentMode==="online"?
//                                 (
//                                     <OnlineOngoingOrdersCard
//                                         key={order?.orderId + Date.now()}
//                                         s_no={idx+1}
//                                         price={order?.price}
//                                         firstName={order?.user?.firstName}
//                                         lastName={order?.user?.lastName}
//                                         paymentStatus={order?.paymentStatus}
//                                         orderedAt = {order?.orderedAt}
//                                         orderId = {order?.orderId}
//                                         paymentMode = {order?.paymentMode}
//                                         orderStatus = {order?.orderStatus}
//                                         mobileNumber={order?.user?.mobileNumber}
//                                         email = {order?.user?.email}
//                                         documents={order?.documents}
//                                         vendorOrderCancellation ={order?.vendorOrderCancellation}
//                                         userOrderCancellation = {order?.userOrderCancellation}
//                                         processOrderIndicator={order?.processOrderIndicator}
//                                         role ={role}
//                                         userId = {order?.user?.userId}
//                                         paymentId = {order?.paymentId}
//                                         bankReferenceNumber = {order?.bankReferenceNumber}
//                                     />
//                                 )
//                                 :
//                                 (order?.paymentMode==="offline"?
//                                 (
//                                     <OnlineOngoingOrdersCard
//                                         key={order?.orderId + Date.now()}
//                                         s_no={idx+1}
//                                         price={order?.price}
//                                         firstName={order?.user?.firstName}
//                                         lastName={order?.user?.lastName}
//                                         paymentStatus={order?.paymentStatus}
//                                         orderedAt = {order?.orderedAt}
//                                         orderId = {order?.orderId}
//                                         paymentMode = {order?.paymentMode}
//                                         orderStatus = {order?.orderStatus}
//                                         mobileNumber={order?.user?.mobileNumber}
//                                         email = {order?.user?.email}
//                                         documents={order?.documents}
//                                         vendorOrderCancellation ={order?.vendorOrderCancellation}
//                                         userOrderCancellation = {order?.userOrderCancellation}
//                                         processOrderIndicator={order?.processOrderIndicator}
//                                         role ={role}
//                                         userId = {order?.user?.userId}
//                                         paymentId = {order?.paymentId}
//                                         bankReferenceNumber = {order?.bankReferenceNumber}
//                                     />
//                                     // <OfflineOngoingOrdersCard
//                                     //     key={order?.orderId + Date.now()}
//                                     //     s_no={idx+1}
//                                     //     price={order?.price}
//                                     //     firstName={order?.user?.firstName}
//                                     //     lastName={order?.user?.lastName}
//                                     //     paymentStatus={order?.paymentStatus}
//                                     //     orderedAt = {order?.orderedAt}
//                                     //     orderId = {order?.orderId}
//                                     //     paymentMode = {order?.paymentMode}
//                                     //     orderStatus = {order?.orderStatus}
//                                     //     mobileNumber={order?.user?.mobileNumber}
//                                     //     email = {order?.user?.email}
//                                     //     documents={order?.documents}
//                                     //     vendorOrderCancellation ={order?.vendorOrderCancellation}
//                                     //     userOrderCancellation = {order?.userOrderCancellation}
//                                     //     notifyCustomerIndicator={order?.notifyCustomerIndicator}
//                                     //     processOrderIndicator={order?.processOrderIndicator}
//                                     //     timeOfTurn={order?.timeOfTurn}
//                                     //     role ={role}
//                                     //     userId = {order?.user?.userId}
//                                     // />
//                                 )
//                                 :
//                                 <div key={idx}>
//                                 </div>))
//                             })
//                         :
//                         <div></div>)
//                     }
//                 </div>
//                 :
//                 <div className="w-full max-w-2xl mx-auto bg-white rounded-[2px] shadow-sm border border-gray-200">
//                     <div className="flex flex-col items-center justify-center p-12">
//                         <div className="rounded-full bg-blue-50 p-4 mb-4">
//                         <PackageSearch className="h-8 w-8 text-blue-500" />
//                         </div>

//                         <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
//                         No Ongoing Orders
//                         </h3>

//                         <p className="text-gray-500 text-center max-w-sm mb-6">
//                         There are no ongoing orders at the moment.
//                         </p>

//                         <div className="w-full max-w-xs border-t border-gray-200" />
//                     </div>
//                 </div>
//             }
//         </div>

//           )
//       }
//     </div>
//   )
// }

// export default OngoingOrders;
