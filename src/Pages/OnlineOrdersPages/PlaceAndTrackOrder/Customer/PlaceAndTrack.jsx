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
import { getOngoingOrdersCountAndTimeEstimate } from '../../../../Services/operations/OrderOperations';
import { pollingAllSpecificOnGoingOrders } from '../../../../Services/operations/GetVarietyOfOrders';
import { getShopStatus } from '../../../../Services/operations/GetUserInformation';
import toast from 'react-hot-toast';
import { pollingOngoingOrdersCountAndTimeEstimate } from '../../../../Services/operations/GetVarietyOfOrders';
import { receiveUserOrder } from '../../../../Services/operations/OrderOperations';

const PlaceAndTrack = () => {
  const [timeAndCount , setTimeAndCount] = useState({});
  const [ongoingOrders, setOngoingOrders] = useState(null);
  const [selectedOngoingOrder , setSelectedOngoingOrder] = useState({});
  const [filteredVendorsData, setFilteredVendorsData] = useState([]);
  const [displayCheckoutModel, setDisplayCheckoutModel] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const[displayShopCloseNotice , setDisplayShopCloseNotice] = useState(false);
  const [displayReceiveConfirmation , setDisplayReceiveConfirmation] = useState(false);
  const [orderId , setOrderId] = useState("");

  function setCheckoutModelVisibility(value) {
    setDisplayCheckoutModel(value);
  }

  async function displayHandler(){
      const response = await getShopStatus(token, "", setIsShopOpen);
      if(response == true){
        setDisplayCheckoutModel(true);
      }else{
        setDisplayShopCloseNotice(true);
      }
  }

  useEffect(() => {
    // Fetching vendors with minimum details

    let interval;
    let interval_timeCount

    if (token) {
      getFilteredVendorsWithMinimumDetails(
        setLoading,
        setFilteredVendorsData,
        token
      );

      getOngoingOrdersCountAndTimeEstimate(token ,setTimeAndCount);

      interval_timeCount = setInterval(() => {
        pollingOngoingOrdersCountAndTimeEstimate(
         token ,setTimeAndCount
        ); // poll every 10 seconds
      }, 10000);


      interval = setInterval(() => {
        pollingAllSpecificOnGoingOrders(
          token,
          setOngoingOrders,
        ); // poll every 5 seconds
      }, 5000);
    }

    return () => {
      clearInterval(interval)
      clearInterval(interval_timeCount)
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchAllSpecificOnGoingOrders(token, setOngoingOrders, setLoading);
      getShopStatus(token, "", setIsShopOpen)
    }
  }, [token]);

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
                {(timeAndCount?.count === undefined || timeAndCount?.count === NaN ) ? "-" : timeAndCount?.count  } remote orders + {' '}
                some offline orders (Ongoing)
              </span>
            </div>

            {/* Ready Time */}
            <div className="flex items-center mt-2 sm:mt-0 sm:ml-8 text-[1.2rem] sm:text-[1.5rem]">
              <div className="w-[8px] h-[8px] rounded-full bg-orange-500 animate-pulse mr-[4px]"></div>
              <MdOutlineAccessTime className="text-orange-500 mr-[7px]" />
              <span className="text-sm sm:text-[1rem] ml-[0.3rem] font-montserrat">
                {(timeAndCount?.estimatedTime === undefined || timeAndCount?.estimatedTime === NaN) ? '-' : (Math.ceil(timeAndCount?.estimatedTime)<=0 ? 5 : Math.ceil(timeAndCount?.estimatedTime)) } mins (Ready Time)
              </span>
            </div>
          </div>
        </h1>
      </div>

      {ongoingOrders === null || ongoingOrders?.length === 0 ? (
        <NoOrderDisplay
          displayText="No Ongoing Orders"
          // setDisplayCheckoutModel={setDisplayCheckoutModel}
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

          <OnGoingCards ongoingOrders={ongoingOrders} setOrderId={setOrderId} selectedOngoingOrder={selectedOngoingOrder} setSelectedOngoingOrder={setSelectedOngoingOrder} setDisplayReceiveConfirmation={setDisplayReceiveConfirmation} displayReceiveConfirmation={displayReceiveConfirmation}/> 
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
          <OrderDetailsPopup  order={selectedOngoingOrder}  setSelectedOngoingOrder={setSelectedOngoingOrder}/>
          :
          <div></div>
      }

      {
        isShopOpen === false ?
        <div className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gray-400 absolute bottom-[2rem] right-[2rem] cursor-not-allowed shadow-lg ' onClick={()=>{displayHandler()}}>
          <FaPlus size={20} className='text-white '/>
        </div>
        :
        <div className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-blue-600 absolute bottom-[2rem] right-[2rem] hover:bg-blue-700 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl animate-bounce hover:animate-none ' onClick={()=>{displayHandler()}}>
        <FaPlus size={20} className='text-white transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110'/>
      </div>
      }

      {
        displayShopCloseNotice === true ?
        <div class='fixed inset-0 bg-black/70 text-white z-50 flex items-center justify-center'>
          <div class='bg-white text-gray-800 rounded-[10px] shadow-2xl p-8 max-w-md mx-4 transform transition-all duration-300 border border-gray-200'>
            <div class='text-center'>
              <div class='bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg class='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                </svg>
              </div>
              
              <h2 class='text-xl font-semibold text-gray-900 mb-3'>
                Service Notice
              </h2>
              
              <p class="text-sm text-gray-700 mb-6 leading-relaxed">
                The shop is no longer accepting online orders but will continue to receive mail orders until 5 PM. You can send the documents via Easer's outbox.
              </p>

              
              <button class='bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                      onClick={() => {setDisplayShopCloseNotice(false)}}>
                Got it 
              </button>
            </div>
          </div>
        </div>
        :
        <div></div>
      }

      {
        displayReceiveConfirmation === true ?
        <div className="fixed inset-0 bg-black/70 text-white z-50 flex items-center justify-center">
          <div className="bg-white text-gray-800 rounded-[8px] shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 border border-gray-100">
            <div className="text-center">
              {/* Icon container */}
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Receive Confirmation
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Are you sure you have received this order?
              </p>

              {/* Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-normal py-2 px-4 rounded-[8px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  onClick={async() => {
                                  const response = await receiveUserOrder(token,orderId);
                                  setDisplayReceiveConfirmation(false);
                                  if(response) toast.success("Thank you for using easer.");
                                  setOngoingOrders(prev => {
                                    return prev.filter(order => order.orderId !== orderId);
                                  });
                                  setOrderId("");
                  }}
                >
                  Yes, Received
                </button>

                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-normal py-2 px-4 rounded-[8px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  onClick={() => setDisplayReceiveConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        :
        <div></div>
      }

    </OrderCardContainer>
  );
};

export default PlaceAndTrack;
