import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

const CancelledOrders = ({ cancelledOrders }) => {

  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Handler for resize
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Attach listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  return (
    <div className="flex flex-col divide-y divide-gray-100 bg-white shadow-sm overflow-hidden">
      {cancelledOrders?.map((order, index) => {
        const mailTime = new Date(order?.orderedAt).getTime();
        const isNew = Date.now() - mailTime < 30 * 1000; // Highlight new order

        return (
          <div
            key={order?.orderId || index}
            className={`group relative flex flex-wrap justify-between sm:grid sm:grid-cols-5 gap-4 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md rounded-none cursor-pointer  border-transparent hover:border-blue-400 ${
              isNew ? 'animate-bg-pulse bg-blue-50/30' : ''
            }`}
            onClick={() =>
              navigate(`/dashboard/ongoing-order/${order?.orderId}`)
            }
          >
            {/* 1. Shop Name */}
            <div className="flex items-center gap-3 sm:justify-center">
              <div className="flex flex-col truncate capitalize text-[0.7rem]">
                <span className="text-[0.9rem] font-normal text-gray-800 truncate">
                  Bvimr basement
                </span>
                <span className="text-[0.8rem] text-gray-500 truncate font-light">
                  Anand Enterprises
                </span>
              </div>
            </div>

            {/* 2. Price */}
            <div className="text-center text-[0.9rem] font-semibold flex items-center justify-center text-green-600">
              ₹{order?.price ?? '0'}
            </div>

            {windowWidth>=640 ? 
            <div className="flex items-center gap-3 sm:justify-center">
              <div className="flex flex-col truncate capitalize text-[0.7rem]">
                <span className="text-[0.9rem] font-normal text-gray-800 truncate">
                  {new Date(order?.orderedAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
              })}
                </span>
                <span className="text-[0.8rem] text-gray-500 truncate font-light">
                  {new Date(order?.orderedAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
                </span>
              </div>
            </div>
            :
            <div></div>
      }

            {/* 4. Prints Ready In */}
            <div className="text-center text-[0.9rem] font-medium flex items-center justify-center text-orange-600">
              <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm font-semibold">
                18 mins
              </span>
            </div>

            {/* 4. Reference number*/}
            <div className="text-center text-[0.9rem] font-medium flex items-center justify-center text-orange-600">
              <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm font-semibold">
                {windowWidth>=640 ? "" : "Ref. No :  "}123445678909876
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CancelledOrders;