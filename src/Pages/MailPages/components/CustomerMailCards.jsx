import React from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const CustomerMailCards = ({ mails }) => {
  const navigate = useNavigate();

  return (
    <div className="flex  flex-col divide-y divide-gray-200 bg-white">
      {mails?.map((mail, index) => (
        <div
          key={index}
          className="group  relative flex flex-col sm:flex-row sm:items-center  justify-between gap-2 px-4 sm:px-6 py-[0.85rem] sm:py-4 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm rounded-md cursor-pointer"
          onClick={() => navigate(`mail/${mail?.mail_id}`)}
        >

          {/* Receiver */}
          <div className="flex items-center gap-2 w-full sm:w-1/4 min-w-[150px]">
            <div className="bg-blue-100 text-blue-600 font-semibold rounded-full px-2 py-[2px] sm:px-2 sm:py-1 text-[14px] sm:text-xs">
              To
            </div>
            <div className="flex flex-col truncate capitalize">
              <span className="text-[0.85rem] sm:text-sm font-normal text-gray-700 truncate">
                {mail?.receiver?.vendorAdditionalDetails?.shopName}
              </span>
              <span className="text-[0.75rem] sm:text-xs text-gray-500 truncate">
                {mail?.receiver?.vendorAdditionalDetails?.shopLandMark}
              </span>
            </div>
          </div>

          {/* Documents */}
          <div className="w-full sm:w-1/3 overflow-hidden">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {mail?.documents?.slice(0, 2)?.map((doc, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-600 text-[0.85rem] sm:text-xs font-medium px-2 py-[0.2rem] sm:py-1 rounded-full max-w-[110px] truncate"
                  title={doc?.fileName}
                >
                  {doc?.fileName?.length > 15
                    ? doc?.fileName?.slice(0, 12) + "..."
                    : doc?.fileName}
                </span>
              ))}
              {mail?.documents?.length > 2 && (
                <span className="text-[0.75rem] sm:text-xs text-gray-500 mt-1">
                  +{mail?.documents?.length - 2} more
                </span>
              )}
            </div>

            {/* <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
              {mail.documents.length} document{mail.documents.length > 1 ? "s" : ""}
            </div> */}
          </div>

          {/* Time */}
          <div className="text-right w-full absolute top-0 right-0 py-2 px-3 sm:relative sm:w-1/6 text-[0.70rem] sm:text-xs text-gray-500 group-hover:text-gray-700">
            {new Date(mail?.timeStamp)?.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })},{" "}
            {new Date(mail?.timeStamp)?.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>

          {/* More Icon */}
          <div className="self-end hidden sm:self-auto sm:block">
            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerMailCards;
