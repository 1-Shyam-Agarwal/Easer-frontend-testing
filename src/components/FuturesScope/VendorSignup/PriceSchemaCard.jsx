// import React from 'react'
// import { Pencil, Trash2 } from 'lucide-react'

// const PriceSchemaCard = (props) => {
//   return (
//     <div className="overflow-x-auto bg-white rounded-t-[4px]">
//         <div className="min-w-full text-center">
//             <div>
//                 <div className="bg-white text-gray-700 grid grid-cols-7 border-b-[1px] ">
//                     <div className="px-4 py-2 font-normal uppercase text-[10px] self-center justify-self-center">{props?.colour === "blackAndWhite" ? "B&W" : (props?.colour === "colour" ? "Color" : "Invalid")}</div>
//                     <div className="px-4 py-2 font-normal  text-[10px] self-center justify-self-center">{props?.printingMethod ==="singleSide" ? "Single-side" : (props?.printingMethod==="backToBack"?"Back-To-Back" : "Invalid")}</div>
//                     <div className="px-4 py-2 font-normal capitalize text-[10px] self-center justify-self-center">{props?.rangeType}</div>
//                     <div className="px-4 py-2 font-normal uppercase text-[10px] self-center justify-self-center">{props?.rangeType ==="range" ? (`${props?.startingRange}-${props?.endingRange}`) : (props?.rangeType==="above" ? props?.aboveValue : "Invalid")}</div>
//                     <div className="px-4 py-2 font-normal uppercase text-[10px] self-center justify-self-center">₹ {props?.price}</div>
//                     <div className="px-4 py-2 font-normal  text-[10px] self-center justify-self-center">{props?.pricingMethod ==="perPrint" ? "Per-print" : (props?.pricingMethod==="combined"?"Combined" : "Invalid")}</div>
//                     <div className="px-4 py-2 font-normal uppercase text-[10px] self-center justify-self-center">
//                     <div className="flex items-center justify-center space-x-2">
//                         <button 
//                             onClick={(e)=>{
//                                 e.preventDefault();
//                                 props.editHandler(props?.idx);

//                             }} 
//                             className="text-gray-500 hover:text-blue-500 transition-colors p-1 rounded-md hover:bg-blue-50"
//                         >
//                             <Pencil className="w-4 h-4" />
//                         </button>
//                         <button 
//                             onClick={(e)=>
//                                 {
//                                     e.preventDefault();
//                                     props.deleteHandler(props?.idx);
//                                 } 
//                             }
//                             className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
//                         >
//                             <Trash2 className="w-4 h-4" />
//                         </button>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default PriceSchemaCard