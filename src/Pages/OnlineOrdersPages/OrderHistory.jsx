import OrderCardContainer from './../../components/CommonOrderLayouts/OrderCardContainer';
import OrderCardHeading from './../../components/CommonOrderLayouts/OrderPageHeading';
import OrderSearchBar from './../../components/CommonOrderLayouts/OrderSearchBar';
import NoOrderDisplay from './../../components/CommonOrderLayouts/NoOrderDisplay';
import NoOrderHistory from './../../Assets/Lotties/NoOngoingOrders.json';
import OrderHeader_5 from './../../components/CommonOrderLayouts/OrderHeader_5';
import { useState } from 'react';
import Pagination from './../../components/CommonOrderLayouts/Pagination';
import OrderHistoryOrders from '../../components/CommonOrderLayouts/OrderList/History';

const OrderHistory = () => {
  const [orderHistoryOrders, setOrderHistoryOrders] = useState(['a', 'b', 'c', 'd']);
  const [keyword, setKeyword] = useState('');

  return (
    <OrderCardContainer>
      <div className="text-xl mt-4 ml-2 sm:ml-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-900 tracking-wide">
        <OrderCardHeading headingText="Order History" />
        <OrderSearchBar />
      </div>
      {orderHistoryOrders.length === 0 ? (
        <NoOrderDisplay
          displayText="No Order History"
          LottieAnimation={NoOrderHistory}
        />
      ) : (
        <div>
          <Pagination/>
          <OrderHeader_5
            field_1="Sender" //Shop and location
            field_2="Ordered at"  //Date
            field_3="Price" //Price
            field_4="OTP" // Refunded by and date
            field_5="Documents" //Bank Reference number
          />
          <OrderHistoryOrders orderHistoryOrders = {orderHistoryOrders}/>
        </div>
        
      )}
    </OrderCardContainer>
  );
};

export default OrderHistory;
