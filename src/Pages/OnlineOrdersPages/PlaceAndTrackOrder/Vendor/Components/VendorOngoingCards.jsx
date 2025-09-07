import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import OrderCardContainer from '../../../../../components/CommonOrderLayouts/OrderCardContainer';

const VendorOngoingCards = ({ ongoingOrders }) => {
  const navigate = useNavigate();
  function capitalizeFirstLetter(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <OrderCardContainer>
      {ongoingOrders?.map((order, index) => {
        const mailTime = new Date(order?.orderedAt).getTime();
        const isNew = Date.now() - mailTime < 30 * 1000; // Highlight new order

        return (
          <div
            key={order?.orderId || index}
            className={`group flex items-center relative justify-between px-6 py-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-sm rounded-md ${
              isNew ? 'animate-bg-pulse' : ''
            }`}
            onClick={() =>
              navigate(`/dashboard/ongoing-order/${order?.orderId}`)
            }
          >
            {/* 1. student */}
            <div className="w-1/6 min-w-[120px] truncate capitalize">
              {`${capitalizeFirstLetter(order?.user?.firstName)} ${capitalizeFirstLetter(order?.user?.lastName)}` ||
                'Unknown'}
            </div>

            {/* 2. mobile numbder */}
            <div className="w-1/6 min-w-[120px]">
              {order?.user?.mobileNumber}
            </div>

            {/* 3. \Docs*/}
            <div className="w-1/6 min-w-[120px]">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {order?.documents?.slice(0, 2)?.map((doc, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-600 text-[0.85rem] sm:text-xs font-medium px-2 py-[0.2rem] sm:py-1 rounded-full max-w-[110px] truncate"
                    title={doc?.name}
                  >
                    {doc?.name?.length > 15
                      ? doc?.name?.slice(0, 12) + '...'
                      : doc?.name}
                  </span>
                ))}
                {order?.documents?.length > 2 && (
                  <span className="text-[0.75rem] sm:text-xs text-gray-500 mt-1">
                    +{order?.documents?.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* 4. price */}
            <div className="w-1/6 min-w-[120px]">₹{order?.price ?? '0'}</div>

            {/* 5. payment status*/}
            <div className="w-1/6 min-w-[120px]">Paid</div>

            {/* Optional More Icon */}
            <div className=" absolute right-4 w-4 h-4 hover:bg-blue-900  z-10">
              <MoreVertical className="w-4 h-4 text-gray-600 hover:text-gray-800 " />
            </div>
          </div>
        );
      })}
    </OrderCardContainer>
  );
};

export default VendorOngoingCards;
