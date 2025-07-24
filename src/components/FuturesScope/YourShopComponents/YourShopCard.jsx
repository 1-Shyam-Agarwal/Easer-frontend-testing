// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp, Clock, Printer, AlertCircle } from 'lucide-react';
// import { AiFillShop } from "react-icons/ai";
// import {useNavigate} from "react-router-dom";
// import { useSelector } from 'react-redux';


// const PrintShopCard = ({ element }) => {

//   const [isExpanded, setIsExpanded] = useState(false);
//   const role = useSelector((state)=>(state.auth.role));
//   const navigate = useNavigate();

//   return (
//     <div className="w-full mb-4 py-2 bg-white border border-grey-150 rounded-[3px] hover:border-blue-300 transition-all duration-200">
//       {/* Main Section - Always Visible */}
//       <div className="p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="flex items-center gap-3">
//           <div className=" pr-[10px] rounded-[5px]">
//             <AiFillShop className="w-8 h-8 text-blue-600" />
//           </div>
//           <div>
//             <h2 className="text-lg font-normal text-gray-800 capitalize">
//               {element?.vendorAdditionalDetails?.shopName || 'Shop Name Unavailable'}
//             </h2>
//             <p className="text-sm text-gray-500 capitalize">
//               {element?.vendorAdditionalDetails?.shopLandMark || 'Location details unavailable'}
//             </p>
//           </div>
//         </div>


//         <div className='flex gap-2 self-center '>

//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
//         >
//           {isExpanded ? (
//             <>
//               <ChevronUp className="w-4 h-4" />
//               <span>Hide Details</span>
//             </>
//           ) : (
//             <>
//               <ChevronDown className="w-4 h-4" />
//               <span>View Details</span>
//             </>
//           )}
//         </button>

//         {
//             role ==="user"?
//             (
//               <button
//               onClick={()=>{navigate(`/dashboard/place-order/shop/${element?.userId}`)}}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
//               >
//                 Place Order
//               </button>
//             )
//             :
//             (
//               <div></div>
//             )
//         }

        
//         </div>
        
//       </div>

//       {/* Expanded Details */}
//       {isExpanded && (
//         <div className="border-t border-gray-100">
//           {/* Price Details Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="px-4 py-2 text-left font-medium text-gray-600">Print Type</th>
//                   <th className="px-4 py-2 text-right font-medium text-gray-600">Price (₹)</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 max-390:text-[10px]">
//                 {
//                     element?.vendorAdditionalDetails?.priceSchema?.priceSchema?.map((priceStructure,idx)=>
//                     {
//                       return(
//                         <tr className="hover:bg-gray-50" key={idx}>
//                           <td className="px-4 py-2 text-gray-600">
//                           {
//                            `${priceStructure?.colour==="blackAndWhite"? "B&W" :(priceStructure?.colour==="colour" ? "Colour" : "Invalid")} | 
//                             ${priceStructure?.printingMethod==="singleSide"? "Single-side" :(priceStructure?.printingMethod==="backToBack" ? "Back-to-Back" : "Invalid")} |
//                             ${priceStructure?.rangeType ==="above"? 
//                                   `Above ${priceStructure?.aboveValue} Pages` 
//                                   : 
//                                   (
//                                     priceStructure?.rangeType ==="range" ?
//                                         (
//                                           priceStructure?.startingRange === priceStructure?.endingRange ? 
//                                                   `For ${priceStructure?.startingRange} Pages` 
//                                                   : 
//                                           `Range: (${priceStructure?.startingRange}-${priceStructure?.endingRange}) Pages`
//                                         )
//                                         :
//                                         "Invalid"
//                                   )
//                             }`
//                           }
//                           </td>
//                           <td className="pr-[5px] py-2 text-right font-medium">{`₹ ${priceStructure?.price} ( ${priceStructure?.pricingMethod} )`}</td>
//                         </tr>
//                       );
//                     })
//                 }
//               </tbody>
//             </table>
//             <div className='text-[13px] max-390:text-[10px] text-gray-500 p-2'><span className='text-red-600 text-[14px] max-390:text-[11px]'>Combined*</span> means total cost for that Range</div>
//           </div>

//           {/* Footer Info */}
//           <div className="p-4 flex flex-wrap gap-6 border-t border-gray-100 bg-gray-50">
//             {element?.vendorAdditionalDetails?.fineSchema?.fineRatePerMinute !== 0 && (
//               <div className="flex items-center gap-2">
//                 <AlertCircle className="w-4 h-4 text-yellow-600" />
//                 <span className="text-sm text-gray-600">
//                   Fine: ₹{element?.vendorAdditionalDetails?.fineSchema?.fineRatePerMinute}/min after{' '}
//                   {element?.vendorAdditionalDetails?.fineSchema?.fineEnforcementTimeInMinutes} minutes
//                 </span>
//               </div>
//             )}
            
//             <div className="flex items-center gap-2">
//               <Clock className="w-4 h-4 text-green-600" />
//               <span className="text-sm text-gray-600">
//                 Waiting time: {element?.vendorAdditionalDetails?.waitingTime || 'Not specified'} {element?.vendorAdditionalDetails?.waitingTime ? "minutes" : ""} ( for offline orders )
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PrintShopCard;