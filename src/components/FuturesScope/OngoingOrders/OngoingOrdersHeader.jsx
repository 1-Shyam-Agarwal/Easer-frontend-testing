// import React from 'react'

// const OngoingOrdersHeader = (props) => {
    
//       const headers = [
//         'S.No',
//         `${props?.role==="user"? "Shop Name" : (props?.role==="vendor")?"Cust. Name":"" }`,
//         'Payment Status',
//         'Price',
//         `${props?.role==="user"? "Order Status" : (props?.role==="vendor")?"Actions":"" }`,
//       ];
    
//       return (
//         <div className=" border-[1px] border-gray-200  bg-blue-50 rounded-t-[5px]">
//           <div className="grid grid-cols-5">
//             {headers.map((header, idx) => (
//               <div 
//                 key={idx} 
//                 className="text-xs font-medium text-black flex max-450:text-[7px]  text-center max-580:text-[10px] max-580:leading-[14px]   max-450:p-3 max-450:leading-[10px] justify-center items-center uppercase p-[13px]"
//               >
//                 {
//                   idx ===0?
//                   <div className='relative'>
//                     {header} 
//                     <img  title="Date Of Cancellation" className='absolute top-0 left-0  opacity-0'/>
//                   </div>
//                   :
//                   header
//                 }
//               </div>
//             ))}
//           </div>
//         </div>
//       );
// }

// export default OngoingOrdersHeader