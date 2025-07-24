// import React, { useState, useEffect, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getFilteredVendorsWithMinimumDetails } from '../../Services/operations/VendorRelated.jsx';
// import { validatePrintOrderVendor } from '../../Services/operations/PrintOrderVendor.jsx';
// import toast from 'react-hot-toast';
// import { socketContext } from '../../ContextApi/SocketContext.js';


// const PlaceOrderSelection = () => {

  
//   const{socket,setSocket} = useContext(socketContext);

//   const handleVendorSelection = (e) => {
//     setVendorId(e?.target?.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!vendorId) {
//       toast.error("Please select a Shop.")
//       return;
//     }
//     dispatch(validatePrintOrderVendor(setLoading, navigate, token, vendorId  , dispatch ,  socket , setSocket));
//   };

//   useEffect(() => {
//     const fetchVendors = async () => {
//       try {
//         dispatch(getFilteredVendorsWithMinimumDetails(setLoading, setFilteredVendorsData, token ,dispatch , navigate , socket , setSocket));
//       } catch (error) {
//         console.error("Error fetching vendors:", error);
//       }
//     };
//     fetchVendors();
//   }, [socket]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   const capitalize = (str) => {
//     return str.replace(/\b\w/g, char => char.toUpperCase());
//   };
  

//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl max-340:text-2xl font-normal text-gray-900">Select Print Shop</h1>
//           <p className="mt-2 text-sm text-gray-600">Choose a print shop to place your order</p>
//         </div>

//         {filteredVendorsData?.length >0? (
//           <div className="bg-white py-8 px-4 shadow  rounded-[5px] sm:px-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label 
//                   htmlFor="shop-select" 
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Available Print Shops
//                 </label>
//                 <select
//                   id="shop-select"
//                   value={vendorId}
//                   onChange={handleVendorSelection}
//                   className="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-[5px]"
//                 >
//                   <option value="">Select a print shop</option>
//                   {filteredVendorsData?.map((vendor) => (
//                     <option key={vendor?.userId} value={vendor?.userId} className="capitalize">
//                       {capitalize(vendor?.vendorAdditionalDetails?.shopName)} 
//                       {vendor?.vendorAdditionalDetails?.shopLandMark && 
//                         capitalize(` (${vendor?.vendorAdditionalDetails?.shopLandMark})`)
//                       }
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 disabled={!vendorId}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-[5px] shadow-sm text-sm font-medium text-white
//                   ${vendorId 
//                     ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
//                     : 'bg-blue-300 cursor-not-allowed'
//                   }`}
//               >
//                 Continue to Place Order
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex flex-col items-center text-center">
//               <div className="mb-4 text-red-500">
//                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 No Print Shops Available
//               </h3>
//               <p className="text-sm text-gray-500 max-w-sm">
//                 We haven't found any registered printing shops in your area yet. 
//                 Know a print shop owner? Encourage them to join our platform for 
//                 expanded business opportunities!
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlaceOrderSelection;