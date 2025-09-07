import { apiConnector } from '../apiconnect';
import { printOrderVendorEndpoints } from '../apis.js';
import toast from 'react-hot-toast';
import {
  clearRole,
  clearRoomcode,
  clearToken,
} from '../../Slices/AuthSlice.js';
import { clearUser } from '../../Slices/profileSlice';
import { setShowModel } from '../../Slices/LogoutSlice';

const { GET_VENDOR_PRICE_DETAILS_AND_FINAL_AMOUNT } = printOrderVendorEndpoints;

export async function priceCalculator(
  filesWithConfigs,
  setInvoice,
  setLoading,
  vendorId,
  token,
  setAddDocumentsModelVisibility,
  setPaymentSummaryModelVisibility
) {
  console.log(filesWithConfigs);
  setLoading(true);
  try {
    const response = await apiConnector(
      'POST',
      GET_VENDOR_PRICE_DETAILS_AND_FINAL_AMOUNT,
      {
        vendorId,
        filesWithConfigs,
      },
      { Authorization: `Bearer ${token}` }
    );

    setAddDocumentsModelVisibility(false);
    setPaymentSummaryModelVisibility(true);
    setInvoice(response?.data?.invoice);
  } catch (error) {
    toast.error('Error occured in calculating the price.');
  } finally {
    setLoading(false);
  }
}
