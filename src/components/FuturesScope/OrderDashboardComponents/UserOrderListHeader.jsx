// import React from 'react';

// import { MdCorporateFare } from "react-icons/md";

// const UserOrderListHeader = ({ onGoingOrders = [] }) => {
//   if (!onGoingOrders?.length) {
//     return (<div className='text-lg font-normal text-gray-400 text-center'>Queue is Empty</div>);
//   }

//   const headers = [
//     `${"S.No"}`,
//     'Customer',
//     'Payment Mode',
//     'No. of Docs',
//     'Order Status'
//   ];

//   return (
//     <div className=" border-[1px] border-gray-200  bg-blue-50 rounded-t-[5px]">
//       <div className="grid grid-cols-5 ">
//         {headers.map((header, idx) => (
//           <div 
//             key={idx} 
//             className="text-[12px] font-medium text-black flex max-450:text-[7px]  max-580:text-[10px] max-580:leading-[14px]   max-450:p-3 max-450:leading-[10px] justify-center items-center text-center uppercase p-[13px]"
//           >
//            <span>{header}</span> 
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default UserOrderListHeader;
