import OrderCardContainer from './../../components/CommonOrderLayouts/OrderCardContainer';
import OrderCardHeading from './../../components/CommonOrderLayouts/OrderPageHeading';
import OrderSearchBar from './../../components/CommonOrderLayouts/OrderSearchBar';
import NoOrderDisplay from './../../components/CommonOrderLayouts/NoOrderDisplay';
import NoOrderHistory from './../../Assets/Lotties/NoOngoingOrders.json';
import OrderHeader_4 from './../../components/CommonOrderLayouts/OrderHeader_4';
import { useState } from 'react';
import Pagination from './../../components/CommonOrderLayouts/Pagination';
import OrderHistoryOrders from '../../components/CommonOrderLayouts/OrderList/History';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSpecificOrderHistory } from '../../Services/operations/GetVarietyOfOrders';
import OrderDetailsPopup from "../../components/CommonOrderLayouts/OrderDetailsPopup";

const OrderHistory = () => {
  const [orderHistoryOrders, setOrderHistoryOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [loading , setLoading] = useState(false);
  const [selectedOrderHistory , setSelectedOrderHistory] = useState([]);

  useEffect(()=>
  {
      fetchSpecificOrderHistory(token , setOrderHistoryOrders , setLoading)

  },[token])

  useEffect(()=>
  {
      console.log("orderHistoryOrdersV : "  ,orderHistoryOrders)
  },[orderHistoryOrders])
  

  return (
    <OrderCardContainer>
      <div className="text-xl my-6 ml-2 sm:ml-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-900 tracking-wide">
        <OrderCardHeading headingText="Order History" />
      </div>

      {
        loading ? 
        <div>spinner</div>
        :
        <div>
          {orderHistoryOrders?.length === 0 ? (
            <NoOrderDisplay
              displayText="No Order History"
              LottieAnimation={NoOrderHistory}
            />
          ) : (
            <div>
              <OrderHeader_4
                field_1="Reciever" //Shop and location
                field_2="Ordered at"  //Date
                field_3="Price" //Price
                field_4="Documents" 
              />
              <OrderHistoryOrders orderHistoryOrders = {orderHistoryOrders} setSelectedOrderHistory={setSelectedOrderHistory}/>
            </div>
            
            )}
        </div>
      }
      {
        "orderId" in selectedOrderHistory ?
          <OrderDetailsPopup  order={selectedOrderHistory}  setSelectedOngoingOrder={setSelectedOrderHistory}/>
          :
          <div></div>
      }
      
    </OrderCardContainer>
  );
};

export default OrderHistory;
