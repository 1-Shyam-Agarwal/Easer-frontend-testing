import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiTicktick } from "react-icons/si";

const OrderHistoryOrders = ({ orderHistoryOrders, setSelectedOrderHistory,role }) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  function capitalizeFirstLetter(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }


  return (
    <div className="flex flex-col divide-y divide-gray-100 bg-white shadow-sm overflow-hidden">
      {orderHistoryOrders?.map((order, index) => {
        return (
          <>
            {width > 640 ? (
              <div
                className={`flex sm:grid sm:grid-cols-4 gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md rounded-none cursor-pointer hover:border-l-4 border-transparent hover:border-blue-400`}
                onClick={() => {
                  setSelectedOrderHistory(order);
                }}
              >
                {/* 1. Shop Name */}
                <div className="flex items-center gap-3 sm:justify-center">
                  <div className="flex flex-col truncate capitalize text-[0.7rem]">
                    <span className="text-[0.9rem] font-normal text-gray-800 truncate">
                      {
                        role === 'vendor' ?
                          <span>{`${capitalizeFirstLetter(order?.user?.firstName)} ${capitalizeFirstLetter(order?.user?.lastName)}` || 'Unknown'}</span>
                        :
                        (role === 'customer' ?
                          <span>{order?.vendor?.vendorAdditionalDetails?.shopName}</span>
                          :
                          "Loading..."
                        )
                      }
                    </span>
                    <span className="text-[0.8rem] text-gray-500 truncate font-light">
                      {
                        role === 'vendor' ?
                        <span>{order?.user?.mobileNumber}</span>
                        :
                        (role === 'customer' ?
                          <span>{order?.vendor?.vendorAdditionalDetails?.shopLandMark}</span>
                          :
                          "Loading..."
                        )
                      }
                    </span>
                  </div>
                </div>

                {/* 2. Date & Time */}
                <div className="text-center text-[0.75rem] text-gray-500 flex items-center justify-center group-hover:text-gray-700 font-normal">
                  {new Date(order?.orderedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
                  ,{" "}
                  {new Date(order?.orderedAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>

                {/* 3. Price */}
                <div className="text-center text-[0.9rem] font-normal flex items-center justify-center text-green-600">
                  ₹{order?.price ?? "Loading..."}
                  <SiTicktick size={17} className="ml-2 text-green-600 inline" />
                </div>

                {/* 4. Enhanced Documents Display */}
                <div className="w-full flex justify-center items-center overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    {/* Main document badge */}
                    {order?.documents?.slice(0, 1).map((doc, i) => (
                      <div
                        key={i}
                        className="group relative bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer min-w-0 max-w-full"
                        title={doc?.name}
                      >
                        {/* Document icon */}
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="truncate">
                            {doc?.name?.length > 16
                              ? `${doc?.name.slice(0, 13)}...`
                              : doc?.name}
                          </span>
                        </div>

                        {/* Hover tooltip for full name */}
                        {doc?.name?.length > 16 && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20 pointer-events-none">
                            {doc?.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* More documents indicator */}
                    {order?.documents?.length > 1 && (
                      <div className="group relative">
                        <div className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer flex items-center gap-1">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span>+{order?.documents?.length - 1}</span>
                        </div>

                        {/* Hover tooltip showing additional documents */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 pointer-events-none min-w-max max-w-xs">
                          <div className="space-y-1">
                            <div className="font-medium mb-1">Additional documents:</div>
                            {order?.documents?.slice(1, Math.min(order.documents.length, 4)).map((doc, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <svg className="w-2.5 h-2.5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="truncate">
                                  {doc?.name?.length > 25 ? `${doc?.name.slice(0, 22)}...` : doc?.name}
                                </span>
                              </div>
                            ))}
                            {order?.documents?.length > 4 && (
                              <div className="text-gray-400 text-center pt-1 border-t border-gray-700">
                                ...and {order.documents.length - 4} more
                              </div>
                            )}
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    )}

                    {/* No documents state */}
                    {(!order?.documents || order?.documents?.length === 0) && (
                      <div className="bg-gray-50 border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>No docs</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={order?.orderId || index}
                className={`group relative transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md cursor-pointer border-l-4 border-transparent hover:border-blue-400 active:scale-[0.98]`}
                onClick={() => {
                  setSelectedOrderHistory(order);
                }}
              >
                <div className="p-3 space-y-3">
                  {/* Header Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {/* Shop Details */}
                        <div className="min-w-0 flex flex-col">
                          <h3 className="text-[0.85rem] sm:text-sm font-normal text-gray-900 truncate">
                            Anand Enterprises
                          </h3>
                          <p className="text-[0.75rem] sm:text-xs text-gray-500 truncate">
                            Bvimr basement
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="ml-3 flex-shrink-0">
                      <div className="px-2 py-1">
                        <span className="text-green-700 font-semibold text-sm">
                          ₹{order?.price ?? "Loading..."}
                          <SiTicktick size={17} className="ml-1 text-green-600 inline" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Mobile Documents Display */}
                  <div className="flex justify-center">
                    <div className="flex items-center gap-1.5 flex-wrap justify-center">
                      {/* Main document badge */}
                      {order?.documents?.slice(0, 1).map((doc, i) => (
                        <div
                          key={i}
                          className="group relative bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm min-w-0 max-w-full"
                          title={doc?.name}
                        >
                          <div className="flex items-center gap-1">
                            <svg className="w-2.5 h-2.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="truncate">
                              {doc?.name?.length > 14
                                ? `${doc?.name.slice(0, 11)}...`
                                : doc?.name}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* More documents indicator for mobile */}
                      {order?.documents?.length > 1 && (
                        <div className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                          <svg className="w-2.5 h-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span>+{order?.documents?.length - 1}</span>
                        </div>
                      )}

                      {/* No documents state for mobile */}
                      {(!order?.documents || order?.documents?.length === 0) && (
                        <div className="bg-gray-50 border border-gray-200 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                          <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>No docs</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="flex justify-between items-center p-2 bg-blue-100 rounded-full">
                    <div className="flex items-center gap-2">
                      {/* Clock Icon */}
                      <div className="w-4 h-4 text-blue-400">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-[0.65rem] sm:text-xs text-gray-500 font-semibold">
                        Ordered at{" "}
                        {new Date(order?.orderedAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                        {" ("}
                        {new Date(order?.orderedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })}
                        {") "}
                      </span>
                    </div>

                    {/* Arrow Icon */}
                    <div className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default OrderHistoryOrders;