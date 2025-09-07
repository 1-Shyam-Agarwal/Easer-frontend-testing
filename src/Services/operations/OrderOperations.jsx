import { orderOperationsEndpoints } from '../apis';
import { apiConnector } from '../apiconnect';
import toast from 'react-hot-toast';

const {
  SET_NOTIFY_CUSTOMER_INDICATOR,
  SEND_MESSAGE_TO_CUSTOMER,
  SET_PROCESS_ORDER_INDICATOR,
  DESET_PROCESS_ORDER_INDICATOR,
  COMPLETE_USER_ORDER,
  RECEIVE_USER_ORDER,
} = orderOperationsEndpoints;

export function setNotifyCustomerIndicator(token, orderId, value) {
  return async () => {
    try {
      const response = await apiConnector(
        'POST',
        SET_NOTIFY_CUSTOMER_INDICATOR,
        {
          orderId,
          value,
        },
        { Authorization: `Bearer ${token}` }
      );

      return response?.data?.data;
    } catch (e) {
      if (
        e?.response?.data?.message ===
        "User may be cancelling the order so you can't notify customer"
      ) {
        toast.error(
          "User may be cancelling the order So you can't notify customer"
        );
      } else {
        toast.error(
          e?.response?.data?.message ||
            'Unable to notify the customer. Please try again.'
        );
      }
      return false;
    }
  };
}

export function sendMessageToUser(token, orderId, message) {
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector(
        'POST',
        SEND_MESSAGE_TO_CUSTOMER,
        {
          orderId,
          message,
        },
        { Authorization: `Bearer ${token}` }
      );
      toast.dismiss(toastId);
      return true;
    } catch (error) {
      if (
        error?.response?.data?.message ===
        "User may be Cancelling the Order So you can't Notify the Order"
      ) {
        toast.error(
          "User may be Cancelling the Order So you can't Notify the Order"
        );
      } else {
        toast.error(
          error?.response?.data?.message ||
            'Unable to send message to the user.'
        );
      }
      toast.dismiss(toastId);
      return false;
    }
  };
}

export function setProcessOrderIndicatorByVendor(token, orderId) {
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector(
        'POST',
        SET_PROCESS_ORDER_INDICATOR,
        {
          orderId,
        },
        { Authorization: `Bearer ${token}` }
      );
      toast.dismiss(toastId);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to update status.');
      toast.dismiss(toastId);
      return 0;
    }
  };
}

export function desetProcessOrderIndicatorByVendor(token, orderId) {
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector(
        'POST',
        DESET_PROCESS_ORDER_INDICATOR,
        {
          orderId,
        },
        { Authorization: `Bearer ${token}` }
      );
      toast.dismiss(toastId);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to update status.');
      toast.dismiss(toastId);
      return 0;
    }
  };
}

export function completeUserOrder(token, orderId, message) {
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector(
        'POST',
        COMPLETE_USER_ORDER,
        {
          orderId,
          message,
        },
        { Authorization: `Bearer ${token}` }
      );
      toast.dismiss(toastId);
      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Unable to complete the order. Please try again.'
      );
      toast.dismiss(toastId);
      return 0;
    }
  };
}

export function receiveUserOrder(
  token,
  orderId,
  exactFine,
  fineTaken,
  additionalCharges,
  timeOfReceiving
) {
  return async (req, res) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector(
        'POST',
        RECEIVE_USER_ORDER,
        {
          orderId,
          exactFine,
          fineTaken,
          additionalCharges,
          timeOfReceiving,
        },
        { Authorization: `Bearer ${token}` }
      );
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(
        error?.response?.data?.message ||
          'Unable to perform this operation. Please try again.'
      );
    }
  };
}
