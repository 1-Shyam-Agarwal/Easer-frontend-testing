import { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";

const VendorOngoingCards = ({ ongoingOrders, setSelectedOngoingOrder }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [completedOrders, setCompletedOrders] = useState(new Set());

  function capitalizeFirstLetter(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  const handleCompleteOrder = (orderId, event) => {
    event.stopPropagation(); // Prevent card click when button is clicked
    setCompletedOrders(prev => new Set([...prev, orderId]));
  };

  const isOrderCompleted = (orderId) => {
    return completedOrders.has(orderId);
  };

  useEffect(() => {
    const resizeHandler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="flex flex-col divide-y divide-gray-100 bg-white shadow-sm overflow-hidden">
      {ongoingOrders?.map((order, index) => {
        const mailTime = new Date(order?.orderedAt).getTime();
        const isNew = Date.now() - mailTime < 30 * 1000; // Highlight new order
        const isCompleted = isOrderCompleted(order?.orderId || index);

        return (
          <>
            {width > 640 ? (
              <div
                className={`flex sm:grid sm:grid-cols-6 gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3 transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md rounded-none cursor-pointer hover:border-l-4 border-transparent hover:border-blue-400 ${
                  isNew && !isCompleted ? "animate-bg-pulse bg-blue-50/30" : ""
                } ${
                  isCompleted 
                    ? "bg-gray-100 opacity-60 line-through decoration-2 decoration-gray-500" 
                    : ""
                }`}
                onClick={() => {
                  if (!isCompleted) {
                    setSelectedOngoingOrder(order);
                  }
                }}
                style={{
                  textDecorationLine: isCompleted ? 'line-through' : 'none',
                  textDecorationThickness: isCompleted ? '2px' : 'auto',
                  textDecorationColor: isCompleted ? '#6b7280' : 'auto'
                }}
              >
                {/* 1. name and mobile number */}
                <div className="flex items-center gap-2 sm:justify-center">
                  <div className="flex flex-col truncate capitalize text-[0.7rem]">
                    <span className={`text-[0.9rem] font-normal truncate ${
                      isCompleted ? 'text-gray-400' : 'text-gray-800'
                    }`}>
                      {`${capitalizeFirstLetter(order?.user?.firstName)} ${capitalizeFirstLetter(order?.user?.lastName)}` || 'Unknown'}
                    </span>
                    <span className={`text-[0.8rem] truncate font-light ${
                      isCompleted ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {order?.user?.mobileNumber}
                    </span>
                    <span className={`text-[0.8rem] truncate font-light lowercase ${
                      isCompleted ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {order?.user?.email}
                    </span>
                  </div>
                </div>

                {/* Complete Button */}
                <div className="flex items-center justify-center">
                  {!isCompleted ? (
                    <button 
                      className="px-3 py-2 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                      onClick={(e) => handleCompleteOrder(order?.orderId || index, e)}
                    >
                      Complete
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-2 bg-gray-200 rounded-md">
                      <SiTicktick size={14} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500">Completed</span>
                    </div>
                  )}
                </div>
                
                {/* 2. Docs*/}
                <div className="min-w-[100%]">
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {order?.documents?.slice(0, 1)?.map((doc, i) => (
                      <span
                        key={i}
                        className={`text-[0.85rem] sm:text-xs font-medium px-2 py-[0.2rem] sm:py-1 rounded-full max-w-[110px] truncate ${
                          isCompleted 
                            ? 'bg-gray-200 text-gray-400' 
                            : 'bg-blue-100 text-blue-600'
                        }`}
                        title={doc?.name}
                      >
                        {doc?.name?.length > 15
                          ? doc?.name?.slice(0, 12) + '...'
                          : doc?.name}
                      </span>
                    ))}
                    {order?.documents?.length > 1 && (
                      <span className={`text-[0.75rem] sm:text-xs mt-1 ${
                        isCompleted ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        +{order?.documents?.length - 1} more
                      </span>
                    )}
                  </div>
                </div>

                <div className={`text-center text-[0.75rem] flex items-center justify-center group-hover:text-gray-700 font-normal ${
                  isCompleted ? 'text-gray-400' : 'text-gray-500'
                }`}>
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

                {/* 2. Price */}
                <div className={`text-center text-[0.9rem] font-normal flex items-center justify-center ${
                  isCompleted ? 'text-gray-400' : 'text-green-600'
                }`}>
                  ₹{order?.price ?? "0"}  
                  <SiTicktick size={17} className={`ml-2 inline ${
                    isCompleted ? 'text-gray-400' : 'text-green-600'
                  }`}/>
                </div>

                {/* 4. OTP */}
                <div className={`text-center text-[0.9rem] flex items-center justify-center font-semibold ${
                  isCompleted ? 'text-gray-400' : 'text-black'
                }`}>
                  {order?.otp ?? "-"}
                </div>
              </div>
            ) : (
              <div
                key={order?.orderId || index}
                className={`group relative transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md cursor-pointer border-l-4 border-transparent hover:border-blue-400 active:scale-[0.98] ${
                  isNew && !isCompleted ? "animate-bg-pulse bg-blue-50/30 border-l-blue-400" : ""
                } ${
                  isCompleted 
                    ? "bg-gray-100 opacity-60 line-through decoration-2 decoration-gray-500 border-l-gray-400" 
                    : ""
                }`}
                onClick={() => {
                  if (!isCompleted) {
                    setSelectedOngoingOrder(order);
                  }
                }}
                style={{
                  textDecorationLine: isCompleted ? 'line-through' : 'none',
                  textDecorationThickness: isCompleted ? '2px' : 'auto',
                  textDecorationColor: isCompleted ? '#6b7280' : 'auto'
                }}
              >
                <div className="p-3 space-y-1">
                  {/* Header Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {/* Customer Details */}
                        <div className="min-w-0 flex flex-col">
                          <h3 className={`text-[0.85rem] sm:text-sm font-normal truncate ${
                            isCompleted ? 'text-gray-400' : 'text-gray-900'
                          }`}>
                            {`${capitalizeFirstLetter(order?.user?.firstName)} ${capitalizeFirstLetter(order?.user?.lastName)}` || 'Unknown'}
                          </h3>
                          <p className={`text-[0.75rem] sm:text-xs truncate ${
                            isCompleted ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {order?.user?.mobileNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price Badge and Complete Button */}
                    <div className="ml-3 flex-shrink-0 flex flex-col gap-2">
                      <div className="px-2 py-1">
                        <div className={`font-semibold flex gap-4 text-sm ${
                          isCompleted ? 'text-gray-400' : 'text-green-700'
                        }`}>
                          <span>
                            ₹{order?.price ?? "0"} 
                            <SiTicktick size={17} className={`ml-1 inline ${
                              isCompleted ? 'text-gray-400' : 'text-green-600'
                            }`}/>
                          </span>
                          <span className="ml-2">OTP: {order?.otp ?? "4768"}</span>
                        </div>
                      </div>
                      
                      {/* Complete Button for Mobile */}
                      {!isCompleted ? (
                        <button 
                          className="px-2 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                          onClick={(e) => handleCompleteOrder(order?.orderId || index, e)}
                        >
                          Complete
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md">
                          <SiTicktick size={12} className="text-gray-500" />
                          <span className="text-xs font-medium text-gray-500">Done</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {/* Clock Icon */}
                      <div className={`w-4 h-4 ${
                        isCompleted ? 'text-gray-400' : 'text-blue-400'
                      }`}>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className={`text-[0.65rem] sm:text-xs font-semibold ${
                        isCompleted ? 'text-gray-400' : 'text-gray-500'
                      }`}>
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
                    
                    {/* Completion Status or New Order Indicator */}
                    {isCompleted ? (
                      <div className="flex items-center gap-1">
                        <SiTicktick size={14} className="text-gray-500" />
                        <span className="text-xs font-semibold text-gray-500">COMPLETED</span>
                      </div>
                    ) : isNew ? (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-blue-600">NEW</span>
                      </div>
                    ) : (
                      /* Arrow Icon */
                      <div className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
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

export default VendorOngoingCards;