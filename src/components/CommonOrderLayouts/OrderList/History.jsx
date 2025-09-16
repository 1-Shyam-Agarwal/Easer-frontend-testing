import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiTicktick } from "react-icons/si";

const OrderHistoryOrders = ({ orderHistoryOrders }) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="flex flex-col divide-y divide-gray-100 bg-white shadow-sm overflow-hidden">
      {orderHistoryOrders?.map((order, index) => {

        return (
          <>
            {width > 640 ? (
              <div
                className={`flex sm:grid sm:grid-cols-4 gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md rounded-none cursor-pointer hover:border-l-4 border-transparent hover:border-blue-400 }`}
                onClick={() =>
                  navigate(`/dashboard/ongoing-order/${order?.orderId}`)
                }
              >

                {/* 1. Shop Name */}
                <div className="flex items-center gap-3 sm:justify-center">
                  <div className="flex flex-col truncate capitalize text-[0.7rem]">
                    <span className="text-[0.9rem] font-normal text-gray-800 truncate">
                      Anand Enterprises
                    </span>
                    <span className="text-[0.8rem] text-gray-500 truncate font-light">
                      Bvimr basement
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
                  ₹{order?.price ?? "0"}  <SiTicktick size={17} className=" ml-2 text-green-600 inline"/>
                </div>

                

                {/* Documents */}
            <div className="w-full sm:w-1/3 overflow-hidden">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {order?.documents?.slice(0, 2)?.map((doc, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-600 text-[0.85rem] sm:text-xs font-medium px-2 py-[0.2rem] sm:py-1 rounded-full max-w-[110px] truncate"
                    title={doc?.fileName}
                  >
                    {doc?.fileName?.length > 15
                      ? doc?.fileName?.slice(0, 12) + '...'
                      : doc?.fileName}
                  </span>
                ))}
                {order?.documents?.length > 2 && (
                  <span className="text-[0.75rem] sm:text-xs text-gray-500 mt-1">
                    +{order?.documents?.length - 2} more
                  </span>
                )}
              </div>
            </div>

              </div>
            ) : (
              <div
                key={order?.orderId || index}
                className={`group relative transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md cursor-pointer border-l-4 border-transparent hover:border-blue-400 active:scale-[0.98] }`}
                onClick={() =>
                  navigate(`/dashboard/ongoing-order/${order?.orderId}`)
                }
              >
                <div className="p-3 space-y-1">
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
                          ₹{order?.price ?? "0"} <SiTicktick size={17} className=" ml-1 text-green-600 inline"/>
                        </span>
                      </div>
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
                        Ordered at {" "}
                        
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