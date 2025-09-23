import OrderCardContainer from './../../components/CommonOrderLayouts/OrderCardContainer';
import OrderCardHeading from './../../components/CommonOrderLayouts/OrderPageHeading';
import OrderSearchBar from './../../components/CommonOrderLayouts/OrderSearchBar';
import NoOrderDisplay from './../../components/CommonOrderLayouts/NoOrderDisplay';
import NoUnreceivedOrders from './../../Assets/Lotties/NoOngoingOrders.json';
import OrderHeader_5 from './../../components/CommonOrderLayouts/OrderHeader_5';
import { useState } from 'react';
import Pagination from './../../components/CommonOrderLayouts/Pagination';
import UnreceivedOrders from '../../components/CommonOrderLayouts/OrderList/UnreceivedOrders';
import { useSelector } from 'react-redux';
import { fetchAllSpecificUnreceivedOrders } from '../../Services/operations/GetVarietyOfOrders';
import { useEffect } from 'react';
import OrderDetailsPopup from '../../components/CommonOrderLayouts/OrderDetailsPopup';

const VendorUnrecievedOrders = () => {
  const [unreceivedOrders, setUnreceivedOrders] = useState([]);
  const [keyword, setKeyword] = useState('');
  const role = useSelector(state => state.auth.role) ;
  const token =  useSelector(state => state.auth.token);
  const [loading , setLoading] = useState(false);
  const [selectedUreceivedOrder , setSelectedUreceivedOrder] = useState({});

  useEffect(()=>
  {
      fetchAllSpecificUnreceivedOrders(token , setUnreceivedOrders,setLoading )
  },[token])

  return (
    <OrderCardContainer>
    {
      !loading ? 
      (
      <div>
        <div className="text-xl mt-4 ml-2 mb-4 sm:ml-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-900 tracking-wide">
          <OrderCardHeading headingText="Unreceived Orders" />
        </div>
        {unreceivedOrders.length === 0 ? (
          <NoOrderDisplay
            displayText="No Unreceived Orders"
            LottieAnimation={NoUnreceivedOrders}
          />
        ) : (
          <div>
            <OrderHeader_5
              field_1="Sender" //Shop and location
              field_2="Ordered at"  //Date
              field_3="Price" //Price
              field_4="OTP" // Refunded by and date
              field_5="Reference No." //Bank Reference number
            />
            <UnreceivedOrders unreceivedOrders = {unreceivedOrders} setSelectedOngoingOrder={setSelectedUreceivedOrder} selectedOngoingOrder={selectedUreceivedOrder}/>
          </div>
          
        )}
        </div>
      )
      :
      (
        <div>
          <div className="flex justify-center items-center h-[50vh]">
            <span className="loader"></span>
          </div>
        </div>
      )
    }

    {
      "orderId" in selectedUreceivedOrder ?
        <OrderDetailsPopup  order={selectedUreceivedOrder} setSelectedOngoingOrder={setSelectedUreceivedOrder}/>
        :
        <div></div>
    }
    </OrderCardContainer>
  );
};

export default VendorUnrecievedOrders;
