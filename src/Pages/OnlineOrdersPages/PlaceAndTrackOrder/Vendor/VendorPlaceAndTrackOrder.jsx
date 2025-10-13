import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import NoOngoingOrdersAnimation from '../../../../Assets/Lotties/NoOngoingOrders.json';
import { useSelector } from 'react-redux';
import OnGoingCards from '../Components/OngoingOrderCards';
import { fetchAllSpecificOnGoingOrders } from '../../../../Services/operations/GetVarietyOfOrders';
import VendorOngoingCards from './Components/VendorOngoingCards';
import { useNavigate } from 'react-router-dom';
import OrderModeToggle from '../../../../components/PlaceAndTrack/Vendor/OrderModeToggle';
import OrderHeader_5 from '../../../../components/CommonOrderLayouts/OrderHeader_5';
import OrderCardContainer from '../../../../components/CommonOrderLayouts/OrderCardContainer';
import OrderCardHeading from '../../../../components/CommonOrderLayouts/OrderPageHeading';
import OrderDetailsPopup from '../../../../components/CommonOrderLayouts/OrderDetailsPopup';
import { pollingAllSpecificOnGoingOrders } from '../../../../Services/operations/GetVarietyOfOrders';
import { ongoingOrderCount } from '../../../../Services/operations/OrderOperations';
import { changeShopStatus } from '../../../../Services/operations/resetDeatils';
import { getShopStatus } from '../../../../Services/operations/GetUserInformation';

const VendorPlaceAndTrackOrder = () => {
  const [ongoingOrders, setOngoingOrders] = useState(null);
  const [selectedOngoingOrder , setSelectedOngoingOrder] = useState({});
  const token = useSelector((state) => state.auth.token);
  const [isShopOpen , setIsShopOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [count , setCount] = useState(0);

  useEffect(() => {

    let interval;
    let count_interval;
    if (token) {
      fetchAllSpecificOnGoingOrders(token, setOngoingOrders, setLoading);

      getShopStatus(token, "", setIsShopOpen)

      interval = setInterval(() => {
        pollingAllSpecificOnGoingOrders(
          token,
          setOngoingOrders
        ); // poll every 5 seconds
      }, 6000);

      ongoingOrderCount(
          token,
          setCount
      );

      count_interval = setInterval(() => {
        ongoingOrderCount(
          token,
          setCount
        ); // poll every 5 seconds
      }, 6000);

      
    }

    return () => {
      clearInterval(interval)
      clearInterval(count_interval)
    };

  }, [token]);


  function toggleShopStatus()
  {
      changeShopStatus(token ,setIsShopOpen);
  }


  return (
    <OrderCardContainer>

      {/* heading */}
      <h1 className="text-xl mt-4 ml-2 sm:ml-4 mb-4 flex flex-col sm:justify-between sm:flex-row sm:items-center text-gray-900 tracking-wide">
                <OrderCardHeading headingText={`Online Orders (${isShopOpen ? "Open" : "Closed"})`} />
                <button
                  onClick={toggleShopStatus}
                  className={`
                    px-4 py-2 rounded-[4px] text-base font-normal shadow-md transition duration-300
                    ${isShopOpen 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                    }
                  `}
                >
                  {isShopOpen ? "Close Shop" : "Open Shop"}
                </button>

      </h1>

      {ongoingOrders === null || ongoingOrders?.length === 0 ? (
        <div className="text-center mt-12 text-gray-600 text-sm flex justify-center">
          <div className="flex flex-col-reverse lg:flex-row items-center px-4 sm:px-12 gap-6">
            <div className="translate-x-0 lg:translate-x-[20px] text-center lg:text-left">
              <div className="text-lg sm:text-xl font-montserrat font-medium">
                No online Prints found
              </div>
            </div>

            <Lottie
              animationData={NoOngoingOrdersAnimation}
              loop={false}
              className="w-[220px] sm:w-[280px] md:w-[320px] lg:w-[350px] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[350px] mx-auto"
            />
          </div>
        </div>
      ) : (
        <div>
          <OrderModeToggle active="Online Orders" count={count}/>
          <OrderHeader_5
            field_1="Student"
            field_2="Docs"
            field_3="Ordered At"
            field_4="Price"
            field_5="OTP"
          />
          <VendorOngoingCards ongoingOrders={ongoingOrders} setSelectedOngoingOrder={setSelectedOngoingOrder} selectedOngoingOrder={selectedOngoingOrder} setOngoingOrders={setOngoingOrders} />
        </div>
      )}
      {
        "orderId" in selectedOngoingOrder ?
          <OrderDetailsPopup  order={selectedOngoingOrder} setSelectedOngoingOrder={setSelectedOngoingOrder}/>
          :
          <div></div>
      }
      
    </OrderCardContainer>
  );
};

export default VendorPlaceAndTrackOrder;
