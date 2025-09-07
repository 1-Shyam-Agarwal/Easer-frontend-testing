import React from 'react';
import OrderCardContainer from '../../../components/CommonOrderLayouts/OrderCardContainer';
import OrderCardHeading from '../../../components/CommonOrderLayouts/OrderPageHeading';
import OrderSearchBar from '../../../components/CommonOrderLayouts/OrderSearchBar';
import NoOrderDisplay from '../../../components/CommonOrderLayouts/NoOrderDisplay';
import NoCancelledOrders from '../../../Assets/Lotties/NoOngoingOrders.json';
import OrderHeader_5 from '../../../components/CommonOrderLayouts/OrderHeader_5';
import { useState } from 'react';
import Pagination from '../../../components/CommonOrderLayouts/Pagination';
import CancelledOrders from '../../../components/CommonOrderLayouts/OrderList/CancelledOrder';

const CancelledCustomer = () => {
  const [cancelledOrders, setCancelledOrders] = useState(['a', 'b', 'c', 'd']);
  const [keyword, setKeyword] = useState('');

  return (
    <OrderCardContainer>
      <div className="text-xl mt-4 ml-2 sm:ml-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-900 tracking-wide">
        <OrderCardHeading headingText="Cancelled & Refunds" />
        <OrderSearchBar />
      </div>
      {cancelledOrders.length === 0 ? (
        <NoOrderDisplay
          displayText="No Cancelled Orders"
          LottieAnimation={NoCancelledOrders}
        />
      ) : (
        <div>
          <Pagination/>
          <OrderHeader_5
            field_1="Shop Name" //Shop and location
            field_2="Ordered on"  //Date
            field_3="Price" //Price
            field_4="Refunded" // Refunded by and date
            field_5="Reference No." //Bank Reference number
          />
          <CancelledOrders cancelledOrders = {cancelledOrders}/>
        </div>
        
      )}
    </OrderCardContainer>
  );
};

export default CancelledCustomer;
