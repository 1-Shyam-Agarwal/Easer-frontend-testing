// import React from 'react'

// const UnreceivedOrdersHeader = (props) => {

//     if (!props?.unreceivedOrders?.length) {
//         return;
//       }
    
//       const headers = [
//         'S.No',
//         props?.role ==="vendor" ? "Cust. Name" : "Shop Name",
//         "TOC",
//         'Payment Status',
//       ];

//       if(props?.role==="vendor")
//       {
//             headers.push("Receive Status");
//       }

//       if(props?.role === "user")
//       {
//             headers.push("Price");
//       }

//       return (
//         <div className=" border-[1px] border-gray-200  bg-blue-50 rounded-t-[5px]">
//           <div className="grid grid-cols-5">
//             {headers.map((header, idx) => (
//               <div 
//                 key={idx} 
//                 className="text-xs font-medium text-black flex max-450:text-[7px]  text-center max-580:text-[10px] max-580:leading-[14px]   max-450:p-3 max-450:leading-[10px] justify-center items-center uppercase p-[13px]"
//               >
//                 {
//                   idx ===2?
//                   <div className='relative'>
//                     {header} 
//                     <img  title="Time Of Completion" className='absolute top-0 left-0 opacity-0'/>
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

// export default UnreceivedOrdersHeader;