import { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { BsThreeDotsVertical } from "react-icons/bs";
import ConfirmationModal from "../../../../../components/Core/Auth/GeneralConfirmationWindow";
import { completeUserOrder } from "../../../../../Services/operations/OrderOperations";
import { useSelector } from "react-redux";

const VendorOngoingCards = ({ ongoingOrders, setSelectedOngoingOrder,setOngoingOrders }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    orderId: null,
    orderData: null
  });
  const token = useSelector((state) => state.auth.token);

  function capitalizeFirstLetter(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  const handleCompleteOrder = (order) => {
    setConfirmationModal({
      isOpen: true,
      orderId: order.orderId,
      orderData: order
    });
  };

  const confirmCompleteOrder = async () => {
    try {
      await completeUserOrder(token, confirmationModal.orderId);
      // You might want to add success notification here
      // or update the orders list to remove the completed order
    } catch (error) {
      // You might want to add error notification here
    } finally {

      setOngoingOrders((prev)=>
      {
          return prev.filter((order) => order.orderId !== confirmationModal.orderId);
      })
      
      setConfirmationModal({
        isOpen: false,
        orderId: null,
        orderData: null
      });

    }
  };

  const cancelCompleteOrder = () => {
    setConfirmationModal({
      isOpen: false,
      orderId: null,
      orderData: null
    });
  };

  useEffect(() => {
    const resizeHandler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-100 bg-white shadow-sm overflow-hidden">
        {ongoingOrders?.map((order, index) => {
          const mailTime = new Date(order?.orderedAt).getTime();
          const isNew = Date.now() - mailTime < 30 * 1000; // Highlight new order

          return (
            <div key={index}>
              {width > 640 ? (
                <div className="relative">
                  <div
                    className={`flex sm:grid sm:grid-cols-5 gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md rounded-none cursor-pointer hover:border-l-4 border-transparent hover:border-blue-400 ${
                      isNew ? "animate-bg-pulse bg-blue-50/30" : ""
                    }`}
                    onClick={() => {
                      setSelectedOngoingOrder(order);
                    }}
                  >
                    {/* 1. name and mobile number */}
                    <div className="flex items-center gap-2 sm:justify-center">
                      <div className="flex flex-col truncate capitalize text-[0.7rem]">
                        <span className="text-[0.9rem] font-normal text-gray-800 truncate">
                          {`${capitalizeFirstLetter(order?.user?.firstName)} ${capitalizeFirstLetter(order?.user?.lastName)}` || 'Unknown'}
                        </span>
                        <span className="text-[0.8rem] text-gray-500 truncate font-light">
                          {order?.user?.mobileNumber}
                        </span>
                        <span className="text-[0.8rem] text-gray-500 truncate font-light lowercase">
                          {order?.user?.email}
                        </span>
                      </div>
                    </div>
                    
                    {/* 2. Docs*/}
                    <div className="min-w-[100%]">
                      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                        {order?.documents?.slice(0, 1)?.map((doc, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-600 text-[0.85rem] sm:text-xs font-medium px-2 py-[0.2rem] sm:py-1 rounded-full max-w-[110px] truncate"
                            title={doc?.name}
                          >
                            {doc?.name?.length > 15
                              ? doc?.name?.slice(0, 12) + '...'
                              : doc?.name}
                          </span>
                        ))}
                        {order?.documents?.length > 1 && (
                          <span className="text-[0.75rem] sm:text-xs text-gray-500 mt-1">
                            +{order?.documents?.length - 1} more
                          </span>
                        )}
                      </div>
                    </div>

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

                    {/* 2. Price */}
                    <div className="text-center text-[0.9rem] font-normal flex items-center justify-center text-green-600">
                      ₹{order?.price ?? "0"} <SiTicktick size={17} className="ml-2 text-green-600 inline" />
                    </div>

                    {/* 4. OTP */}
                    <div className="text-center text-[0.9rem] flex items-center justify-center text-black-600 font-semibold">
                      {order?.otp ?? "-"}
                    </div>
                  </div>
                  
                  <div 
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 px-4 p-6 border-l border-gray-200 cursor-pointer hover:text-blue-600 text-gray-400 hover:bg-blue-50"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handleCompleteOrder(order);
                    }}
                  >
                    <BsThreeDotsVertical size={20} />
                  </div>
                </div>
              ) : (
                <div
                  className={`group relative transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md cursor-pointer border-l-4 border-transparent hover:border-blue-400 active:scale-[0.98] ${
                    isNew ? "animate-bg-pulse bg-blue-50/30 border-l-blue-400" : ""
                  }`}
                  onClick={() => {
                    setSelectedOngoingOrder(order);
                  }}
                >
                  <div className="p-3 space-y-1">
                    {/* Header Section */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {/* Customer Details */}
                          <div className="min-w-0 flex flex-col">
                            <h3 className="text-[0.85rem] sm:text-sm font-normal text-gray-900 truncate">
                              {`${capitalizeFirstLetter(order?.user?.firstName)} ${capitalizeFirstLetter(order?.user?.lastName)}` || 'Unknown'}
                            </h3>
                            <p className="text-[0.75rem] sm:text-xs text-gray-500 truncate">
                              {order?.user?.mobileNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price Badge and Actions */}
                      <div className="ml-3 flex-shrink-0 flex items-center gap-2">
                        <div className="px-2 py-1">
                          <div className="text-green-700 font-semibold flex gap-4 text-sm">
                            <span>₹{order?.price ?? "0"} <SiTicktick size={17} className="ml-1 text-green-600 inline" /></span>
                            <span className="ml-2">OTP : {order?.otp ?? "-"}</span>
                          </div>
                        </div>
                        
                        {/* Complete Order Button for Mobile */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteOrder(order);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <BsThreeDotsVertical size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Footer Section */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
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
            </div>
          );
        })}
      </div>

      {/* Single Confirmation Modal */}
      {confirmationModal.isOpen && (
        <ConfirmationModal 
          heading={"Complete Order"}
          description={`Are you sure you want to complete the order for ${confirmationModal.orderData?.user?.firstName} ${confirmationModal.orderData?.user?.lastName}?`}
          agreeText={"Complete Order"}
          disagreeText={"Cancel"}
          agreeController={confirmCompleteOrder}
          disagreeController={cancelCompleteOrder}
        />
      )}
    </>
  );
};

export default VendorOngoingCards;