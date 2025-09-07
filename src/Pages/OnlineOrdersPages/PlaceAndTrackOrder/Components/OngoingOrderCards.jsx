import { useNavigate } from "react-router-dom";

const OngoingOrders = ({ ongoingOrders }) => {

  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col divide-y divide-gray-100 bg-white shadow-sm overflow-hidden">
      {ongoingOrders?.map((order, index) => {
        const mailTime = new Date(order?.orderedAt).getTime();
        const isNew = Date.now() - mailTime < 30 * 1000; // Highlight new order

        return (
          <div
            key={order?.orderId || index}
            className={`group relative grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md rounded-none cursor-pointer border-l-4 border-transparent hover:border-blue-400 ${
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

            {/* 3. Date & Time */}
            <div className="text-center text-[0.75rem] text-gray-500 flex items-center justify-center group-hover:text-gray-700 font-medium">
              {new Date(order?.orderedAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
              })}
              ,{' '}
              {new Date(order?.orderedAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </div>

            {/* 4. Prints Ready In */}
            <div className="text-center text-[0.9rem] font-medium flex items-center justify-center text-orange-600">
              <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm font-semibold">
                18 mins
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OngoingOrders;