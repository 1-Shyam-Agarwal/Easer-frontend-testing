// // import React, { useState, useEffect } from 'react';
// // import { Receipt, Printer, AlertCircle } from 'lucide-react';

// // const PaymentInvoiceWindow = ({ invoice }) => {
// //   const [applicablePriceBWSingleSide, setApplicablePriceBWSingleSide] = useState('-');
// //   const [applicablePriceBWBothSide, setApplicablePriceBWBothSide] = useState('-');

// //   useEffect(() => {
// //     // Calculate applicable price for both side prints
// //     setApplicablePriceBWBothSide(
// //       invoice?.pages?.numberofBlackAndWhitePrints_BackToBack === 0 
// //         ? "-" 
// //         : (
// //             invoice?.pages?.numberofBlackAndWhitePrints_BackToBack <= 4 
// //               ? invoice?.priceSchema?.backToBack_BlackAndWhite_LessThanEqualTo_4 
// //               : (
// //                   invoice?.pages?.numberofBlackAndWhitePrints_BackToBack >= 5 && invoice?.pages?.numberofBlackAndWhitePrints_BackToBack <= 10 
// //                     ? invoice?.priceSchema?.backToBack_BlackAndWhite_5_10Includes10 
// //                     : (
// //                         invoice?.pages?.numberofBlackAndWhitePrints_BackToBack > 10 
// //                           ? invoice?.priceSchema?.backToBack_BlackAndWhite_MoreThan_10 
// //                           : "Wrong Entry"
// //                     )
// //               )
// //         )
// //     );

// //     // Calculate applicable price for single side prints
// //     setApplicablePriceBWSingleSide(
// //       invoice?.pages?.numberofBlackAndWhitePrints_SingleSide === 0 
// //         ? "-" 
// //         : (
// //             invoice?.pages?.numberofBlackAndWhitePrints_SingleSide === 1 
// //               ? invoice?.priceSchema?.singleSide_BlackAndWhite_1 
// //               : (
// //                   (invoice?.pages?.numberofBlackAndWhitePrints_SingleSide >= 2 && invoice?.pages?.numberofBlackAndWhitePrints_SingleSide <= 5) 
// //                     ? invoice?.priceSchema?.singleSide_BlackAndWhite_2_5Includes5 
// //                     : invoice?.priceSchema?.singleSide_BlackAndWhite_Above5
// //               )
// //         )
// //     );
// //   }, [invoice]);

// //   const PrintDetail = ({ icon: Icon, label, count, rate }) => (
// //     count > 0 ? (
// //       <div className="flex items-center justify-between  p-3  border-gray-200">
// //         <div className="flex items-center gap-3">
// //           <Icon size={20} className="text-gray-600" />
// //           <div>
// //             <div className="text-[14px]">{label}</div>
// //             <div className="text-sm text-gray-600">
// //               {count} {count === 1 ? 'page' : 'pages'} × ₹{rate}/page
// //             </div>
// //           </div>
// //         </div>

// //         <div className="text-[16px] font-semibold">
// //           ₹{(count * rate).toFixed(2)}
// //         </div>

// //       </div>
// //     ) : null
// //   );

// //   return (
// //     <div className="mt-[20px] m-4">
     
// //         <h1 className="text-[20px] pl-2 flex gap-2">
// //           <Receipt className="text-blue-600" />
// //           <div className='flex flex-col justify-center items-center mb-[15px]'>
// //             <div>Payment Summary</div>
// //             <div className='w-[20px] h-[5px] bg-blue-500 rounded-[5px]'></div>
// //           </div>
          
// //         </h1>


// //       <div className="divide-y divide-gray-100">
// //         <PrintDetail 
// //           icon={Printer}
// //           label="Black & White (Single Side)"
// //           count={invoice?.pages?.numberofBlackAndWhitePrints_SingleSide}
// //           rate={applicablePriceBWSingleSide}
// //         />

// //         <PrintDetail 
// //           icon={Printer}
// //           label="Black & White (Back-To-Back)"
// //           count={invoice?.pages?.numberofBlackAndWhitePrints_BackToBack}
// //           rate={applicablePriceBWBothSide}
// //         />

// //         <PrintDetail 
// //           icon={Printer}
// //           label="Color Prints"
// //           count={invoice?.pages?.numberofColoredPrints}
// //           rate={invoice?.priceSchema?.colorPrice}
// //         />
// //       </div>

// //       {/* Total Amount */}
// //       <div className="p-6 bg-gray-50 rounded-b-[5px]">
// //         <div className="flex items-center justify-between">
// //           <div className="text-lg font-semibold">Total Amount</div>
// //           <div className="text-2xl font-bold text-blue-600">
// //             ₹{invoice?.price}
// //           </div>
// //         </div>
        
// //         {/* Print Details Summary */}
// //         <div className="mt-4 text-sm text-gray-600">
// //           {invoice?.pages?.numberofBlackAndWhitePrints_SingleSide > 0 && (
// //             <div className="flex items-center gap-1 mb-1">
// //               <AlertCircle size={14} />
// //               <span>Single-side B&W rate: ₹{applicablePriceBWSingleSide}/page</span>
// //             </div>
// //           )}
// //           {invoice?.pages?.numberofBlackAndWhitePrints_BackToBack > 0 && (
// //             <div className="flex items-center gap-1 mb-1">
// //               <AlertCircle size={14} />
// //               <span>Back-to-back B&W rate: ₹{applicablePriceBWBothSide}/page</span>
// //             </div>
// //           )}
// //           {invoice?.pages?.numberofColoredPrints > 0 && (
// //             <div className="flex items-center gap-1">
// //               <AlertCircle size={14} />
// //               <span>Color print rate: ₹{invoice?.priceSchema?.colorPrice}/page</span>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentInvoiceWindow;

// import React, { useState, useEffect } from 'react';
// import { Receipt, Printer, AlertCircle } from 'lucide-react';

// const PaymentInvoiceWindow = ({ invoice }) => {

//   const PrintDetail = ({ icon: Icon, label, count, rate,pricingMode}) => (
//     count > 0 ? (
//       <div className="flex max-480:flex-col flex-row max-480:items-start items-center justify-between p-3 border border-gray-200">
//         <div className="flex items-center gap-3 max-480:mb-2 mb-0">
//           <Icon size={20} className="text-gray-600 flex-shrink-0" />
//           <div>
//             <div className="text-[14px] break-words">{label}</div>
//             <div className="text-sm text-gray-600">
//               {
//                 pricingMode==="combined"?
//                 (
//                   <div>
//                      {
//                       `For ${count} ${count===1?'page' :'pages'} : ₹${rate}`
                      
//                      }
//                   </div>
//                 )
//                 :
//                 (
//                   <div>{count}{count === 1 ? 'page' : 'pages'} X ₹{rate}</div>
//                 )
//               }
//             </div>
//           </div>
//         </div>

//         <div className="text-[16px] font-semibold ml-8 sm:ml-0">
//         {
//             pricingMode==="combined" ? ("₹" + rate) : ("₹" +(count*rate)?.toFixed(2)) 
//         }
//         </div>
//       </div>
//     ) : null
//   );

//   return (
//     <div className="mt-[20px] mx-2 sm:mx-4 max-w-4xl">
//       <h1 className="text-[18px] sm:text-[20px] pl-2 flex gap-2">
//         <Receipt className="text-blue-600" />
//         <div className='flex flex-col justify-center items-center mb-[15px]'>
//           <div>Payment Summary</div>
//           <div className='w-[20px] h-[5px] bg-blue-500 rounded-[5px]'></div>
//         </div>
//       </h1>

//       <div>
//         <PrintDetail 
//           icon={Printer}
//           label="Black & White (Single Side)"
//           count={invoice?.pages?.numberofBlackAndWhitePrints_SingleSide}
//           rate={invoice?.priceSchema?.applicablePriceSchema_BW_SS?.[0]}
//           pricingMode={invoice?.priceSchema?.applicablePriceSchema_BW_SS?.[1]}
//         />

//         <PrintDetail 
//           icon={Printer}
//           label="Black & White (Back-To-Back)"
//           count={invoice?.pages?.numberofBlackAndWhitePrints_BackToBack}
//           rate={invoice?.priceSchema?.applicablePriceSchema_BW_BB?.[0]}
//           pricingMode={invoice?.priceSchema?.applicablePriceSchema_BW_BB?.[1]}
//         />

//         <PrintDetail 
//           icon={Printer}
//           label="Colour (Single Side)"
//           count={invoice?.pages?.numberofColoredPrints_SingleSide}
//           rate={invoice?.priceSchema?.applicablePriceSchema_C_SS?.[0]}
//           pricingMode={invoice?.priceSchema?.applicablePriceSchema_C_SS?.[1]}
//         />

//         <PrintDetail 
//           icon={Printer}
//           label="Colour (Back-To-Back)"
//           count={invoice?.pages?.numberofColoredPrints_backToBack}
//           rate={invoice?.priceSchema?.applicablePriceSchema_C_BB?.[0]}
//           pricingMode={invoice?.priceSchema?.applicablePriceSchema_C_BB?.[1]}
//         />


//       </div>

//       {/* Total Amount */}
//       <div className="p-4 sm:p-6 bg-gray-50 rounded-b-[5px]">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
//           <div className="text-base sm:text-lg font-semibold">Total Amount</div>
//           <div className="text-xl sm:text-2xl font-bold text-blue-600">
//             ₹{invoice?.price}
//           </div>
//         </div>
        
//         {/* Print Details Summary */}
//         <div className="mt-4 text-xs sm:text-sm text-gray-600">
//           {invoice?.pages?.numberofBlackAndWhitePrints_SingleSide > 0 && (
//             <div className="flex items-center gap-1 mb-1">
//               <AlertCircle size={14} className="flex-shrink-0" />
//               <span className="break-words">Single-side B&W rate: ₹{invoice?.priceSchema?.applicablePriceSchema_BW_SS?.[0]}{`${invoice?.priceSchema?.applicablePriceSchema_BW_SS?.[1]==="combined"?" (combined)":"/per-print"}`}</span>
//             </div>
//           )}
//           {invoice?.pages?.numberofBlackAndWhitePrints_BackToBack > 0 && (
//             <div className="flex items-center gap-1 mb-1">
//               <AlertCircle size={14} className="flex-shrink-0" />
//               <span className="break-words">Back-to-back B&W rate: ₹{invoice?.priceSchema?.applicablePriceSchema_BW_BB?.[0]}{`${invoice?.priceSchema?.applicablePriceSchema_BW_BB?.[1]==="combined"?" (combined)":"/per-print"}`}</span>
//             </div>
//           )}
//           {invoice?.pages?.numberofColoredPrints_SingleSide > 0 && (
//             <div className="flex items-center gap-1">
//               <AlertCircle size={14} className="flex-shrink-0" />
//               <span className="break-words">Color print rate: ₹{invoice?.priceSchema?.applicablePriceSchema_C_SS?.[0]}{`${invoice?.priceSchema?.applicablePriceSchema_C_SS?.[1]==="combined"?" (combined)":"/per-print"}`}</span>
//             </div>
//           )}

//           {invoice?.pages?.numberofColoredPrints_backToBack > 0 && (
//             <div className="flex items-center gap-1">
//               <AlertCircle size={14} className="flex-shrink-0" />
//               <span className="break-words">Color print rate: ₹{invoice?.priceSchema?.applicablePriceSchema_C_BB?.[0]}{`${invoice?.priceSchema?.applicablePriceSchema_C_BB?.[1]==="combined"?" (combined)":"/per-print"}`}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentInvoiceWindow;