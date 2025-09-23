import { getOrdersEndpoints, getUserInformationEndpoints,orderOperationsEndpoints } from '../apis';
import { apiConnector } from '../apiconnect';
import toast from 'react-hot-toast';
import { setShowModel } from '../../Slices/LogoutSlice';

const {
  GET_ALL_CANCELLED_ORDERS,
  GET_ALL_SPECIFIC_USER_ONGOING_ORDERS,
  GET_SPECIFIC_ORDER_HISTORY,
  GET_SPECIFIC_UNRECEIVED_ORDER,
  GET_SPECIFIC_ONLINE_ORDER,
} = getOrdersEndpoints;

export async function fetchAllCancelledOrders(
  token,
  setCancelledOrders,
  setLoading
) {
  setLoading(true);
  try {
    const response = await apiConnector(
      'POST',
      GET_ALL_CANCELLED_ORDERS,
      undefined,
      { Authorization: `Bearer ${token}` }
    );
    setLoading(false);
    setCancelledOrders(response?.data?.response?.cancelledOrders);
  } catch (error) {
    setLoading(false);
    toast.error(
      error?.response?.data?.message ||
        'Unable to fetch cancelled orders. Please reload the page or try again later.'
    );
  }
}

export async function fetchAllSpecificOnGoingOrders(
  token,
  setOngoingOrders,
  setLoading
) {
  setLoading(true);
  try {
    const response = await apiConnector(
      'POST',
      GET_ALL_SPECIFIC_USER_ONGOING_ORDERS,
      undefined,
      { Authorization: `Bearer ${token}` }
    );
    setLoading(false);
    setOngoingOrders(response?.data?.data);
  } catch (error) {
    setLoading(false);
    toast.error(
      error?.response?.data?.message ||
        'Unable to fetch ongoing orders. Please reload the page or try again later.'
    );
  }
}

export async function pollingAllSpecificOnGoingOrders(token, setOngoingOrders) {
  try {
    const response = await apiConnector(
      'POST',
      GET_ALL_SPECIFIC_USER_ONGOING_ORDERS,
      undefined,
      { Authorization: `Bearer ${token}` }
    );
    setOngoingOrders(response?.data?.data);
  } catch (error) {
    console.error(
      error?.response?.data?.message ||
        'Unable to fetch ongoing orders. Please reload the page or try again later.'
    );
    toast.error(error?.response?.data?.message ||
        'Unable to fetch ongoing orders. Please reload the page or try again later.');
  }

}

export async function pollingOngoingOrdersCountAndTimeEstimate(token, setTimeAndCount) {
  try {
    const response = await apiConnector("POST" , orderOperationsEndpoints.GET_TIME_ESTIMATE_AND_ORDERS_COUNT  , {} , {Authorization : `Bearer ${token}`});
    setTimeAndCount(response?.data?.data);
  } catch (error) {
    console.error(
      error?.response?.data?.message ||
        'Unable to fetch ongoing orders count and time estimate. Please reload the page or try again later.'
    );
  }
}

export async function fetchAllSpecificUnreceivedOrders(
  token,
  setUnreceivedOrders,
  setLoading
) {
  setLoading(true);
  try {
    const response = await apiConnector(
      'GET',
      GET_SPECIFIC_UNRECEIVED_ORDER,
      undefined,
      { Authorization: `Bearer ${token}` }
    );
    setUnreceivedOrders(response?.data?.data);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        'Unable to fetch unreceived orders.'
    );
  }
  finally
  {
      setLoading(false);
  }
  
}

export async function fetchSpecificOrderHistory(
  token,
  setOrderHistory,
  setLoading
) {
  setLoading(true);
  try {
    const response = await apiConnector(
      'POST',
      GET_SPECIFIC_ORDER_HISTORY,
      undefined,
      { Authorization: `Bearer ${token}` }
    );
    setOrderHistory(response?.data?.data);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || 'Unable to fetch order history'
    );
  }
  finally{
    setLoading(false);
  }
  
}

export async function fetchSpecificOnlineOrder(
  token,
  onlineOrderId,
  setOnlineOrder,
  setLoading
) {
  setLoading(true);
  try {
    const response = await apiConnector(
      'POST',
      GET_SPECIFIC_ONLINE_ORDER,
      { onlineOrderId },
      { Authorization: `Bearer ${token}` }
    );
    setLoading(false);
    setOnlineOrder(response?.data?.data?.[0]);
  } catch (error) {
    setLoading(false);
    toast.error(error?.response?.data?.message || 'Unable to fetch details');
  }
}
