import { useState, useEffect } from 'react';
import { MdOutlineAccessTime } from 'react-icons/md';
import { MdLocalPrintshop } from 'react-icons/md';
import NoOngoingOrdersAnimation from '../../../../Assets/Lotties/NoOngoingOrders.json';
import NoOrderDisplay from '../../../../components/CommonOrderLayouts/NoOrderDisplay';
import { useSelector } from 'react-redux';
import { getFilteredVendorsWithMinimumDetails } from '../../../../Services/operations/GetInformaitonOperations/VendorRelatedOps';
import Checkout from '../Components/Checkout';
import OnGoingCards from "../../../../components/CommonOrderLayouts/OrderList/OngoingOrder";
import { fetchAllSpecificOnGoingOrders } from '../../../../Services/operations/GetVarietyOfOrders';
import OrderHeader_5 from '../../../../components/CommonOrderLayouts/OrderHeader_5';
import OrderCardContainer from '../../../../components/CommonOrderLayouts/OrderCardContainer';
import OrderCardHeading from '../../../../components/CommonOrderLayouts/OrderPageHeading';
import { FaPlus } from "react-icons/fa6";
import OrderDetailsPopup from '../../../../components/CommonOrderLayouts/OrderDetailsPopup';

const PlaceAndTrack = () => {
  const [onlineOrdersQuantity, setOnlineOrdersQuantity] = useState(18);
  const [mailsSentIn5MinsQuantity, setmailsSentIn5MinsQuantity] = useState(10);
  const [printsReadyIn, setPrintsReadyIn] = useState(18);
  const [ongoingOrders, setOngoingOrders] = useState(null);
  const [selectedOngoingOrder , setSelectedOngoingOrder] = useState({});
  const [filteredVendorsData, setFilteredVendorsData] = useState([]);
  const [displayCheckoutModel, setDisplayCheckoutModel] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  function setCheckoutModelVisibility(value) {
    setDisplayCheckoutModel(value);
  }

  useEffect(() => {
    // Fetching vendors with minimum details
    if (token) {
      getFilteredVendorsWithMinimumDetails(
        setLoading,
        setFilteredVendorsData,
        token
      );
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchAllSpecificOnGoingOrders(token, setOngoingOrders, setLoading);
    }
  }, [token]);

  useEffect(()=>
  {
      console.log("selectedOngoingOrder : " , selectedOngoingOrder);
  } , [selectedOngoingOrder])

  return (
    <OrderCardContainer className="relative">
      <div className="mb-6">
        {/* Heading */}
        <h1 className="text-xl mt-4 ml-2 sm:ml-4 flex flex-col sm:flex-row sm:items-center text-gray-900 tracking-wide">
          <OrderCardHeading headingText="Place & Track Orders" />

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:ml-8 mt-3 sm:mt-0">
            {/* Remote Orders */}
            <div className="flex items-center text-[1.2rem] sm:text-[1.5rem]">
              <div className="w-[8px] h-[8px] rounded-full bg-blue-800 animate-pulse mr-[4px]"></div>
              <MdLocalPrintshop className="text-blue-800  mr-[7px]" />
              <span className="text-sm sm:text-[1rem] ml-[0.3rem] font-montserrat">
                {onlineOrdersQuantity} remote orders +{' '}
                {mailsSentIn5MinsQuantity} mails (Ongoing)
              </span>
            </div>

            {/* Ready Time */}
            <div className="flex items-center mt-2 sm:mt-0 sm:ml-8 text-[1.2rem] sm:text-[1.5rem]">
              <div className="w-[8px] h-[8px] rounded-full bg-orange-500 animate-pulse mr-[4px]"></div>
              <MdOutlineAccessTime className="text-orange-500 mr-[7px]" />
              <span className="text-sm sm:text-[1rem] ml-[0.3rem] font-montserrat">
                {printsReadyIn ? printsReadyIn : '-'} mins (Ready Time)
              </span>
            </div>
          </div>
        </h1>
      </div>

      {ongoingOrders === null || ongoingOrders?.length === 0 ? (
        <NoOrderDisplay
          displayText="Place Order"
          setDisplayCheckoutModel={setDisplayCheckoutModel}
          LottieAnimation={NoOngoingOrdersAnimation}
        />
      ) : (
        <div>
          <OrderHeader_5
            field_1="Shop Name" //Shop and location
            field_2="Price" //Price and paid
            field_3="Time"
            field_4="OTP"
            field_5="Prints Ready in"
          />

          <OnGoingCards ongoingOrders={ongoingOrders} selectedOngoingOrder={selectedOngoingOrder} setSelectedOngoingOrder={setSelectedOngoingOrder}/>
        </div>
      )}

      {displayCheckoutModel && (
        <Checkout
          setCheckoutModelVisibility={setCheckoutModelVisibility}
          filteredVendorsData={filteredVendorsData}
        />
      )}

      {
        "orderId" in selectedOngoingOrder ?
          <OrderDetailsPopup  order={selectedOngoingOrder} setSelectedOngoingOrder={setSelectedOngoingOrder}/>
          :
          <div></div>
      }

<div className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-blue-600 absolute bottom-[2rem] right-[2rem] hover:bg-blue-700 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl animate-bounce hover:animate-none ' onClick={()=>setDisplayCheckoutModel(true)}>
  <FaPlus size={20} className='text-white transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110'/>
</div>
    </OrderCardContainer>
  );
};

export default PlaceAndTrack;
