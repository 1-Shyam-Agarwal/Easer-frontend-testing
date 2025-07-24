import React from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VendorMailCards = ({ mails }) => {

  const navigate = useNavigate();
  console.log("Vendor Mail Cards: ", mails);
  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {mails?.map((mail, index) => (
        <div
          key={index}
          className="group flex items-center justify-between px-6 py-4 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm rounded-md"
          onClick={() => {
            // Handle mail click if needed}
            navigate(`mail/${mail.mail_id}`);
          }}
        >
          {/* Sender */}
          <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
  <div className="bg-blue-100 text-blue-600 font-medium rounded-full px-3 py-1 text-xs">
    From
  </div>
  <div className="flex flex-col text-gray-800 text-sm leading-tight truncate">
    <span className="font-semibold capitalize">
      {mail?.sender?.firstName} {mail?.sender?.lastName}
    </span>
    <span className="text-xs text-gray-600 truncate">
      {mail?.sender?.mobileNumber}
    </span>
    <span className="text-xs text-gray-600 truncate">
      {mail?.sender?.email}
    </span>
  </div>
</div>


          {/* Documents */}
          <div className="w-1/3 overflow-hidden">
  <div className="flex flex-wrap gap-2">
    {mail.documents?.slice(0, 2).map((doc, i) => (
      <span
        key={i}
        className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full max-w-[110px] truncate"
        title={doc.fileName} // full name on hover
      >
        {doc.fileName.length > 15
          ? doc.fileName.slice(0, 12) + "..."
          : doc.fileName}
      </span>
    ))}
    {mail.documents.length > 2 && (
      <span className="text-xs text-gray-500 mt-1">+{mail.documents.length - 2} more</span>
    )}
  </div>

  <div className="text-xs text-gray-500 mt-1">
    {mail.documents.length} document{mail.documents.length > 1 ? "s" : ""}
  </div>
</div>


          {/* Time */}
          <div className="text-right w-1/6 text-xs text-gray-500 group-hover:text-gray-700">
            {new Date(mail.timeStamp).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })},{" "}
            {new Date(mail.timeStamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>

            <div>
                <MoreVertical className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            </div>
        </div>
      ))}
    </div>
  );
};

export default VendorMailCards;


// import React from "react";
// import { MoreVertical } from "lucide-react";

// const CustomerMailCards = ({ mails }) => {
//   return (
//     <div className="flex flex-col divide-y divide-gray-200 bg-white">
//       {mails?.map((mail, index) => (
//         <div
//           key={index}
//           className="group flex items-center justify-between px-6 py-4 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm rounded-md"
//         >
          
//         {/* Receiver */}
//         <div className="flex items-center gap-2 w-1/4 min-w-[150px]">
//             <div className="bg-blue-100 text-blue-600 font-semibold rounded-full px-3 py-1 mr-[5px] text-xs">
//                 To
//             </div>
//             <div className="flex flex-col truncate capitalize">
//                 <span className="text-sm font-normal text-gray-700 truncate">
//                     {mail.receiver?.vendorAdditionalDetails?.shopName}
//                 </span>
//                 <span className="text-xs text-gray-500 truncate">
//                     {mail.receiver?.vendorAdditionalDetails?.shopLandMark}
//                 </span>
//             </div>
//         </div>


//           {/* Documents */}
//           <div className="w-1/3 overflow-hidden">
//   <div className="flex flex-wrap gap-2">
//     {mail.documents?.slice(0, 2).map((doc, i) => (
//       <span
//         key={i}
//         className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full max-w-[110px] truncate"
//         title={doc.fileName} // full name on hover
//       >
//         {doc.fileName.length > 15
//           ? doc.fileName.slice(0, 12) + "..."
//           : doc.fileName}
//       </span>
//     ))}
//     {mail.documents.length > 2 && (
//       <span className="text-xs text-gray-500 mt-1">+{mail.documents.length - 2} more</span>
//     )}
//   </div>

//   <div className="text-xs text-gray-500 mt-1">
//     {mail.documents.length} document{mail.documents.length > 1 ? "s" : ""}
//   </div>
// </div>


//           {/* Time */}
//          <div className="text-right w-1/6 text-xs text-gray-500 group-hover:text-gray-700">
//   {new Date(mail.timeStamp).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "2-digit",
//   })},{" "}
//   {new Date(mail.timeStamp).toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   })}
// </div>

//             <div>
//                 <MoreVertical className="w-5 h-5 text-gray-600 hover:text-gray-800" />
//             </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CustomerMailCards;




