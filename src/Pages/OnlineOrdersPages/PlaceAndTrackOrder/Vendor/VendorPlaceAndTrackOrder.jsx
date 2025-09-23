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
import { LiaBorderStyleSolid } from 'react-icons/lia';
import OrderDetailsPopup from '../../../../components/CommonOrderLayouts/OrderDetailsPopup';

const VendorPlaceAndTrackOrder = () => {
  const [ongoingOrders, setOngoingOrders] = useState(null);
  const [selectedOngoingOrder , setSelectedOngoingOrder] = useState({});
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchAllSpecificOnGoingOrders(token, setOngoingOrders, setLoading);
    }
  }, [token]);


  return (
    <OrderCardContainer>
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
          <OrderModeToggle active="Online Orders" />
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
