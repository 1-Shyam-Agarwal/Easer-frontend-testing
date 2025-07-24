// // import React, { useState } from 'react';
// // import { Info } from 'lucide-react';

// // const PriceCard = ({ title, children, className }) => (
// //   <div className={`p-4 rounded-[5px] shadow-lg transition-transform duration-300 ${className}`}>
// //     <h3 className="text-[18px] font-semibold text-center mb-4">{title}</h3>
// //     {children}
// //   </div>
// // );

// // const PriceList = ({ title, items }) => (
// //   <div className="space-y-4">
// //     <h4 className="text-lg font-medium mb-4">{title}</h4>
// //     <ul className="space-y-3">
// //       {items.map((item, index) => (
// //         <li key={index} className="flex items-center justify-between text-sm">
// //           <span className="flex items-center gap-2">
// //             {item.label}
// //             {item.tooltip && (
// //               <div className="group relative">
// //                 <Info size={16} className="cursor-help" />
// //                 <div className="invisible group-hover:visible absolute left-0 bottom-6 w-48 bg-gray-900 text-white text-xs rounded p-2">
// //                   {item.tooltip}
// //                 </div>
// //               </div>
// //             )}
// //           </span>
// //           <span className="font-semibold">₹{item.price} /print</span>
// //         </li>
// //       ))}
// //     </ul>
// //   </div>
// // );

// // const PricingSchema = ({ invoice }) => {
// //   const [activeTab, setActiveTab] = useState('bw');

// //   const singleSideItems = [
// //     {
// //       label: "Single Page",
// //       price: invoice?.priceSchema?.singleSide_BlackAndWhite_1,
// //       tooltip: "Best for quick, single-page documents"
// //     },
// //     {
// //       label: "2-5 Pages",
// //       price: invoice?.priceSchema?.singleSide_BlackAndWhite_2_5Includes5,
// //       tooltip: "Economical choice for small documents"
// //     },
// //     {
// //       label: "Above 5 Pages",
// //       price: invoice?.priceSchema?.singleSide_BlackAndWhite_Above5,
// //       tooltip: "Most cost-effective for larger documents"
// //     }
// //   ];

// //   const bothSideItems = [
// //     {
// //       label: "1-4 Pages",
// //       price: invoice?.priceSchema?.backToBack_BlackAndWhite_LessThanEqualTo_4,
// //       tooltip: "Save paper with double-sided printing"
// //     },
// //     {
// //       label: "5-10 Pages",
// //       price: invoice?.priceSchema?.backToBack_BlackAndWhite_5_10Includes10,
// //       tooltip: "Perfect for medium-sized documents"
// //     },
// //     {
// //       label: "Above 10 Pages",
// //       price: invoice?.priceSchema?.backToBack_BlackAndWhite_MoreThan_10,
// //       tooltip: "Best value for large documents"
// //     }
// //   ];

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 ">
// //       <h2 className="p-2 text-[20px]">Printing Prices</h2>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-6">
// //         <div className="lg:col-span-2">
// //           <PriceCard 
// //             title="Black & White Printing" 
// //             className="bg-gradient-to-br from-gray-800 to-gray-900 text-white"
// //           >
// //             <div className="flex gap-4 mb-6">
// //               <button
// //                 className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
// //                   activeTab === 'bw' 
// //                     ? 'bg-white text-gray-900' 
// //                     : 'bg-gray-700 text-white'
// //                 }`}
// //                 onClick={() => setActiveTab('bw')}
// //               >
// //                 Single Side
// //               </button>
// //               <button
// //                 className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
// //                   activeTab === 'duplex' 
// //                     ? 'bg-white text-gray-900' 
// //                     : 'bg-gray-700 text-white'
// //                 }`}
// //                 onClick={() => setActiveTab('duplex')}
// //               >
// //                 Both Sides
// //               </button>
// //             </div>
            
// //             <div className="transition-opacity duration-300">
// //               {activeTab === 'bw' ? (
// //                 <PriceList title="Single Side Pricing" items={singleSideItems} />
// //               ) : (
// //                 <PriceList title="Double Side Pricing" items={bothSideItems} />
// //               )}
// //             </div>
// //           </PriceCard>
// //         </div>

// //         <PriceCard 
// //           title="Color Printing" 
// //           className="bg-gradient-to-br from-blue-600 to-blue-700 text-white h-min "
// //         >
// //           <div className="text-center space-y-4">
// //             <div className="text-[30px] font-semibold">₹{invoice?.priceSchema?.colorPrice}</div>
// //             <div className="text-sm opacity-90">per print</div>
// //             <div className="text-xs bg-blue-800 rounded-lg p-3 mt-4">
// //               Perfect for presentations, photos, and marketing materials
// //             </div>
// //           </div>
// //         </PriceCard>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PricingSchema;

// import React, { useState } from 'react';
// import { Info } from 'lucide-react';

// const PriceCard = ({ title, children, className }) => (
//   <div className={`p-4 sm:p-6 rounded-[5px] shadow-lg transition-transform duration-300 ${className}`}>
//     <h3 className="text-[16px] sm:text-[18px] font-semibold text-center mb-4">{title}</h3>
//     {children}
//   </div>
// );

// const PriceList = ({ title, items }) => (
//   <div className="space-y-3 sm:space-y-4">
//     <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">{title}</h4>
//     <ul className="space-y-2 sm:space-y-3">
//       {items?.map((item, index) => (
//         <li key={index} className="flex items-start sm:items-center justify-between text-xs sm:text-sm">
//           <span className="flex items-center gap-1 sm:gap-2 flex-1">
//             <span className="break-words">{item?.label}</span>
//             {item?.tooltip && (
//               <div className="group relative">
//                 <Info size={16} className="cursor-help flex-shrink-0" />
//                 <div className="invisible group-hover:visible absolute left-0 sm:left-auto right-0 sm:right-auto bottom-6 w-36 sm:w-48 bg-gray-900 text-white text-xs rounded p-2 z-10">
//                   {item?.tooltip}
//                 </div>
//               </div>
//             )}
//           </span>
//           <span className="font-semibold whitespace-nowrap ml-2">₹{item?.price} /print</span>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// const PricingSchema = ({ invoice }) => {
//   const [activeTab, setActiveTab] = useState('bw');

//   const singleSideItems = [
//     {
//       label: "Single Page",
//       price: invoice?.priceSchema?.singleSide_BlackAndWhite_1,
//       tooltip: "Best for quick, single-page documents"
//     },
//     {
//       label: "2-5 Pages",
//       price: invoice?.priceSchema?.singleSide_BlackAndWhite_2_5Includes5,
//       tooltip: "Economical choice for small documents"
//     },
//     {
//       label: "Above 5 Pages",
//       price: invoice?.priceSchema?.singleSide_BlackAndWhite_Above5,
//       tooltip: "Most cost-effective for larger documents"
//     }
//   ];

//   const bothSideItems = [
//     {
//       label: "1-4 Pages",
//       price: invoice?.priceSchema?.backToBack_BlackAndWhite_LessThanEqualTo_4,
//       tooltip: "Save paper with double-sided printing"
//     },
//     {
//       label: "5-10 Pages",
//       price: invoice?.priceSchema?.backToBack_BlackAndWhite_5_10Includes10,
//       tooltip: "Perfect for medium-sized documents"
//     },
//     {
//       label: "Above 10 Pages",
//       price: invoice?.priceSchema?.backToBack_BlackAndWhite_MoreThan_10,
//       tooltip: "Best value for large documents"
//     }
//   ];

//   return (
//     <div className="max-w-4xl mx-auto px-2 sm:px-6 py-4 sm:py-6">
//       <h2 className="p-2 text-[18px] sm:text-[20px]">Printing Prices</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//         <div className="lg:col-span-2">
//           <PriceCard 
//             title="Black & White Printing" 
//             className="bg-gradient-to-br from-gray-800 to-gray-900 text-white"
//           >
//             <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
//               <button
//                 className={`flex-1 py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base ${
//                   activeTab === 'bw' 
//                     ? 'bg-white text-gray-900' 
//                     : 'bg-gray-700 text-white'
//                 }`}
//                 onClick={() => setActiveTab('bw')}
//               >
//                 Single Side
//               </button>
//               <button
//                 className={`flex-1 py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base ${
//                   activeTab === 'duplex' 
//                     ? 'bg-white text-gray-900' 
//                     : 'bg-gray-700 text-white'
//                 }`}
//                 onClick={() => setActiveTab('duplex')}
//               >
//                 Both Sides
//               </button>
//             </div>
            
//             <div className="transition-opacity duration-300">
//               {activeTab === 'bw' ? (
//                 <PriceList title="Single Side Pricing" items={singleSideItems} />
//               ) : (
//                 <PriceList title="Double Side Pricing" items={bothSideItems} />
//               )}
//             </div>
//           </PriceCard>
//         </div>

//         <PriceCard 
//           title="Color Printing" 
//           className="bg-gradient-to-br from-blue-600 to-blue-700 text-white h-min"
//         >
//           <div className="text-center space-y-3 sm:space-y-4">
//             <div className="text-[24px] sm:text-[30px] font-semibold">₹{invoice?.priceSchema?.colorPrice}</div>
//             <div className="text-xs sm:text-sm opacity-90">per print</div>
//             <div className="text-xs bg-blue-800 rounded-lg p-2 sm:p-3 mt-2 sm:mt-4">
//               Perfect for presentations, photos, and marketing materials
//             </div>
//           </div>
//         </PriceCard>
//       </div>
//     </div>
//   );
// };

// export default PricingSchema;