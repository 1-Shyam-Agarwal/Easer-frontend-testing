// import React from 'react';
// import { useState } from 'react';
// import { TiArrowSortedDown , TiArrowSortedUp } from 'react-icons/ti';

// const OrderHistoryCard = (props) => {
//   const [moreDetails, setMoreDetails] = useState(false);


//   function formattedTime(date) {
//     date = new Date(date);
//     return `${String(date?.getHours())?.padStart(2, '0')}:${String(date?.getMinutes())?.padStart(2, '0')}`;
//   }

//   function formattedDate(date) {
//     date = new Date(date);
//     const day = String(date?.getDate())?.padStart(2, '0');
//     const month = String(date?.getMonth() + 1)?.padStart(2, '0'); // Months are 0-based
//     const year = date?.getFullYear();
//     return `${day}/${month}/${year}`; // Format: DD-MM-YYYY
// }


//   const Data = [
//     props?.S_No,
//     props?.role === "vendor" ? `${props?.user?.firstName} ${props?.user?.lastName}` : props?.vendor?.shopName,
//     formattedDate(props?.orderedAt),
//     formattedTime(props?.orderedAt),
//     `₹${props?.price + props?.additionalCharges + props?.fineTaken}`
//   ];


//   return (
//     <div 
//           className={`
//             max-w-full 
//             bg-white
//             overflow-hidden 
//             border-b-gray-50
//             border-b-[3px]
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
//               {Data.map((data, idx) => {

//                 return (
//                   idx === 1?
//                   (
//                     <div
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
//                         relative
//                         flex justify-center items-center
//                         tracking-wider
//                         transition-colors duration-200"
//                     >
//                       <span className='truncate'>{data}</span>
//                       <img  title={data} className='absolute inset-0 opacity-0'/>
//                     </div>
//                   )
//                   :
//                   (
//                     <div
//                       key={idx}
//                       className="text-center
//                         px-2 py-1.5
//                         text-xs
//                         font-normal
//                         text-black
//                         max-540:scale-[0.9]
//                         max-360:scale-[0.65]
//                         flex justify-center items-center
//                         group-hover:text-gray-900
//                         capitalize
//                         tracking-wider
//                         transition-colors duration-200"
//                     >
//                       {data}
//                     </div>
//                   )
//                 )
//               })}
//             </div>
    
//             <div className='h-[10px] max-360:h-[7px] bg-gray-200 flex justify-center items-center' onClick={()=>{setMoreDetails(!moreDetails)}}>
//                       {
//                           moreDetails ? <TiArrowSortedUp className='text-xs'/> : <TiArrowSortedDown className='text-xs'/>
//                       }
//             </div>
      

//       {/* Details Section */}
//       <div className={`overflow-hidden transition-all duration-300 ${moreDetails ? 'max-h-[3000px]' : 'max-h-0'}`}>
//         <div className="bg-gray-100 p-[8px] space-y-[2px]">

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
//               <div className="font-medium max-480:text-[12px] truncate">Order Time: <span className="font-normal">{formattedTime(props?.orderedAt)}</span></div>
//               {
//                   !props?.timeOfTurn ? 
//                   (
//                     ""
//                   )
//                   :
//                   (
//                     <div className="font-medium max-480:text-[12px] truncate">Turn Time: <span className="font-normal">{formattedTime(props?.timeOfTurn)}</span></div>
//                   )
//               }

//               {
//                   !props?.timeOfPrinting?
//                   (
//                     ""
//                   )
//                   :
//                   (
//                     <div className="font-medium max-480:text-[12px] truncate">Processing Time: <span className="font-normal">{props?.timeOfPrinting === "NA" ? "NA" : formattedTime(props?.timeOfPrinting)}</span></div>
//                   )
//               }

//               <div className="font-medium max-480:text-[12px] truncate">Completion Time: <span className="font-normal">{formattedTime(props?.timeOfCompletion)}</span></div>
                    
//               <div className="font-medium max-480:text-[12px] truncate">Receiving Time: <span className="font-normal">{formattedTime(props?.timeOfReceiving)}</span></div>
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
//                 <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//                   <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Payment Details</h3>
//                   <div className="grid max-480:grid-cols-1 grid-cols-2 gap-2 text-sm max-480:gap-1">
//                     <div className="font-medium max-480:text-[12px] truncate">Order Price: <span className="font-normal capitalize">&#8377;{props?.price}</span></div>
//                     <div className="font-medium max-480:text-[12px] truncate">Payment Mode: <span className="font-normal  capitalize">{props?.paymentMode}</span></div>
//                     <div className="font-medium max-480:text-[12px] truncate">Payment Status: <span className="font-normal  capitalize">{props?.paymentStatus}</span></div>
//                   </div>
//                 </div>
//           )}

//           {(
//             <div className="bg-white p-4 rounded-[3px] shadow-sm max-480:p-2">
//               <h3 className="text-[13px] font-normal text-gray-400 mb-[8px] max-480:mb-[4px] max-480:text-[10px]">Fine & Additional Charges & Discount Details</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm max-480:gap-1">
//                 <div className="font-medium max-480:text-[12px] truncate">Order Actual Price: <span className="font-normal capitalize">&#8377;{props?.price}</span></div>
//                 {
//                    (props?.paymentMode === "online" ?
//                    <div className="font-medium max-480:text-[12px] truncate">Actual Fine: <span className="font-normal  capitalize">&#8377;{props?.exactFine}</span></div>
//                    :
//                    "")
//                 }
//                 {

//                    (
//                     (props?.paymentMode === "online" ?
//                       <div className="font-medium max-480:text-[12px] truncate">Fine Taken: <span className="font-normal  capitalize">&#8377;{props?.fineTaken}</span></div>
//                       :
//                       "")
//                    )
//                 }
//                 <div className="font-medium max-480:text-[12px] truncate">{props?.additionalCharges>=0 ?"Additional Charges:":"Discount: " } <span className="font-normal  capitalize">&#8377;{props?.additionalCharges>=0 ? props?.additionalCharges : (props?.additionalCharges*-1)}</span></div>
//                 <div className="font-medium max-480:text-[12px] truncate">Final Amount Taken: <span className="font-normal  capitalize">&#8377;{props?.price + props?.additionalCharges + props?.fineTaken}</span></div>
//               </div>
//             </div>
//           )}

//           {/* Order Files */}
//           <div className=' p-4 bg-white'>
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
          
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderHistoryCard;


