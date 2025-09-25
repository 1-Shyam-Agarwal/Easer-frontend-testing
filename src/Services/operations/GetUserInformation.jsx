import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnect';
import { getUserInformationEndpoints } from '../apis';

const { GET_USER_DETAILS, GET_SHOP_INFORMATION } = getUserInformationEndpoints;

export async function getRole(token, setRole) {
  try {
    const response = await apiConnector(
      'POST',
      getUserInformationEndpoints.GET_USER_ROLE,
      undefined,
      { Authorization: `Bearer ${token}` }
    );
    if (setRole) setRole(response?.data?.role);
    else {
      return response?.data?.role;
    }
  } catch (error) {
    // toast.error(error?.response?.data?.message || "Unable to fetch role. Please try again later.");
  }
}

export async function getShopStatus(token, vendorId, setIsShopOpen, ) {

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      'POST',
      getUserInformationEndpoints.GET_SHOP_STATUS,
      { vendorId : "b53bc873-91d4-4028-bde6-f67eabab6c83" },
      { Authorization: `Bearer ${token}` }
    );
    setIsShopOpen(response?.data?.shopStatus);
    toast.dismiss(toastId);
    return response?.data?.shopStatus;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(
      error?.response?.data?.message ||
        'Unable to fetch shop status. Please try again later.'
    );
  }
}

export async function getUserDetails(setUser, token, setLoading) {
  setLoading(true);
  try {
    const response = await apiConnector('POST', GET_USER_DETAILS, undefined, {
      Authorization: `Bearer ${token}`,
    });
    setLoading(false);
    setUser(response?.data?.data);
  } catch (error) {
    setLoading(false);
    toast.error(
      error?.response?.data?.message ||
        'Unable to fetch your details. Please try again later.'
    );
  }
}

export function getShopDetails(dispatch, setShopDetails, shopCode, setLoading) {
  return async () => {
    setLoading(true);
    try {
      const response = await apiConnector('POST', GET_SHOP_INFORMATION, {
        shopId: shopCode,
      });

      setShopDetails(response?.data?.response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };
}
