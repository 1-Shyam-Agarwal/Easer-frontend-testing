// import React, { useState ,useEffect } from 'react'
// import { fetchAllCancelledOrders } from '../Services/operations/GetVarietyOfOrders';
// import { useDispatch, useSelector } from 'react-redux';
// import CancelledOrdersHeader from '../components/FuturesScope/CancelledOrders/CancelledOrdersHeader.js';
// import CancelledOrdersCard from '../components/FuturesScope/CancelledOrders/CancelledOrdersCard.jsx';
// import { PackageX } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { socketContext } from '../ContextApi/SocketContext.js';

// const CancelledOrdersDashboard = () => {

//     const [cancelledOrders , setCancelledOrders] = useState([]);
//     const [searchQuery ,setSearchQuery] = useState("");
//     const token = useSelector((state) => state.auth.token);
//     const [loading , setLoading] = useState(true);
//     const role = useSelector(state => state.auth.role) ;
//     const {socket , setSocket} = useContext(socketContext);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(()=>
//     {
//         dispatch(fetchAllCancelledOrders(token , setCancelledOrders ,setLoading ,  dispatch,navigate , socket , setSocket));
//     },[socket])

//     function searchTextHandler(e)
//     {
//         setSearchQuery(e.target.value);
//     }

//     const filteredData = cancelledOrders?.filter((order)=>
//     {
//         const refundStatus = order?.paymentMode==="offline"? "n/a" :((order?.refundStatus)  ?  "refunded":"pending");
//         let DOC = order?.times?.timeOfCancellation;
//         DOC = new Date(DOC);
//         const entity = role==="user" ?(order?.vendor?.vendorAdditionalDetails?.shopName?.toLowerCase()) : `${order?.user?.firstName} ${order?.user?.lastName}`;

//         const formattedDOC = `${String(DOC?.getDate())?.padStart(2, '0')}/${String(DOC?.getMonth() + 1)?.padStart(2, '0')}/${DOC?.getFullYear()}`;
//         const query = searchQuery?.toLowerCase();

//         return(
//             refundStatus?.includes(query) || formattedDOC?.includes(query) || entity?.includes(query)
//         )
//     })

//   return (

//     <div>
//         {
//             loading?
//             (
//                 <div className="min-h-screen flex items-center justify-center">
//                     <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//             )
//             :
//             (
//                 <div className='p-2 sm:p-6 bg-gray-10 min-h-screen relative'>
//                     {
//                         cancelledOrders?.length>0 ?
//                         (
//                         <div className='px-[20px] max-480:p-[4px] '>
//                             {/* Header Section */}
//                             <div className='flex justify-between items-center flex-wrap pb-[20px] gap-6 max-390:gap-4'>
//                                     <div className={` flex items-center gap-2 space-x-2`}>
//                                         <div className="rounded-[15px] bg-yellow-100 p-4 flex justify-center items-center">
//                                             <PackageX className="aspect-square h-[25px] max-390:h-[20px] text-yellow-500" />
//                                         </div>
//                                         <h3 className="text-[28px] font-normal text-gray-800 max-390:text-[20px]">
//                                         Cancelled Orders
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
//                                     <div className=' text-gray-500 pt-[4px] text-[11px]'>{ role ==="user" ? "Filter by DOC , Shop , Refund Status" : "Filter by DOC , Customer , Refund Status"}</div>
//                                 </div>
//                             </div>

//                             <CancelledOrdersHeader role={role}/>
//                             {
//                                 filteredData?.map((cancelledOrder , index)=>
//                                 {
//                                     if(role === "vendor")
//                                     {
//                                         return <CancelledOrdersCard
//                                                 key={index}
//                                                 s_no = {index+1}
//                                                 refundTime = {cancelledOrder?.refundTime}
//                                                 orderID = {cancelledOrder?.orderID}
//                                                 times = {cancelledOrder?.times}
//                                                 orderPrice ={cancelledOrder?.orderPrice}
//                                                 paymentMode = {cancelledOrder?.paymentMode}
//                                                 paymentStatus = {cancelledOrder?.paymentStatus}
//                                                 refundStatus = {cancelledOrder?.refundStatus}
//                                                 orderFiles = {cancelledOrder?.orderFiles}
//                                                 reason = {cancelledOrder?.reason}
//                                                 user = {cancelledOrder?.user}
//                                                 role = {role}
//                                                 cancelledBy = {cancelledOrder?.cancelledBy}
//                                                 paymentId = {cancelledOrder?.paymentId}
//                                                 bankReferenceNumber ={cancelledOrder?.bankReferenceNumber}
//                                         />

//                                     }

//                                     if(role === "user")
//                                     {
//                                         return <CancelledOrdersCard
//                                                 key={index}
//                                                 orderID = {cancelledOrder?.orderID}
//                                                 s_no={index+1}
//                                                 times = {cancelledOrder?.times}
//                                                 refundTime = {cancelledOrder?.refundTime}
//                                                 orderPrice ={cancelledOrder?.orderPrice}
//                                                 paymentMode = {cancelledOrder?.paymentMode}
//                                                 paymentStatus = {cancelledOrder?.paymentStatus}
//                                                 refundStatus = {cancelledOrder?.refundStatus}
//                                                 orderFiles = {cancelledOrder?.orderFiles}
//                                                 reason = {cancelledOrder?.reason}
//                                                 vendor = {cancelledOrder?.vendor?.vendorAdditionalDetails}
//                                                 role = {role}
//                                                 cancelledBy = {cancelledOrder?.cancelledBy}
//                                                 paymentId = {cancelledOrder?.paymentId}
//                                                 bankReferenceNumber ={cancelledOrder?.bankReferenceNumber}
//                                         />
//                                     }

//                                 })
//                             }

//                         </div>
//                         )
//                         :
//                         (
//                         <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
//                             <div className="flex flex-col items-center justify-center p-12">
//                             <div className="rounded-full bg-yellow-50 p-4 mb-4">
//                                 <PackageX className="h-8 w-8 text-yellow-500" />
//                             </div>

//                             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                                 No Cancelled Orders
//                             </h3>

//                             <p className="text-gray-500 text-center max-w-sm mb-6">
//                                 Nothing to see here! You’re on a cancellation-free streak.
//                             </p>

//                             <div className="w-full max-w-xs border-t border-gray-200" />
//                             </div>
//                         </div>
//                         )

//                     }
//                 </div>

//             )
//         }
//     </div>

//   )
// }

// export default CancelledOrdersDashboard
