import { apiConnector } from '../apiconnect';
import toast from 'react-hot-toast';
import { resetEndpoints } from '../apis';

const {
  VALIDATE_AND_UPDATE_NAME,
  VALIDATE_AND_UPDATE_PASSWORD,
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_MOBILE_NUMBER,
  UPDATE_SHOP_DETAILS,
  UPDATE_FINE_DETAILS,
  UPDATE_WAITING_TIME,
  ALTER_REFUND_STATUS,
  ALTER_SHOP_STATUS,
} = resetEndpoints;

export async function resetName(
  firstName,
  lastName,
  token,
  setUser,
  setDisabled
) {
  const toastId = toast.loading('Loading...');
  setDisabled(true);
  try {
    const response = await apiConnector(
      'POST',
      VALIDATE_AND_UPDATE_NAME,
      {
        firstName,
        lastName,
      },
      { Authorization: `Bearer ${token}` }
    );

    setUser((prev) => {
      return {
        ...prev,
        firstName: response?.data?.data?.firstName,
        lastName: response?.data?.data?.lastName,
      };
    });

    toast.dismiss(toastId);
    toast.success('Name is updated successfully.');
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(
      error?.response?.data?.message ||
        'Unable to update name. Please try again.'
    );
  } finally {
    setDisabled(false);
  }
}

export async function resetPassword(currentPassword, newPassword, token) {
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector(
      'POST',
      VALIDATE_AND_UPDATE_PASSWORD,
      {
        currentPassword,
        newPassword,
      },
      { Authorization: `Bearer ${token}` }
    );

    toast.dismiss(toastId);
    toast.success('Password is successfully Changed');
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(
      error?.response?.data?.message ||
        'Unable to update password. Please try again.'
    );
  }
}

export async function updateDisplayPicture(token, formData, setUser) {
  const toastId = toast.loading('Loading...');
  try {
    // Make API call to update the display picture
    const response = await apiConnector(
      'POST',
      UPDATE_DISPLAY_PICTURE_API,
      formData,
      { Authorization: `Bearer ${token}` }
    );

    // Notify user of success
    toast.success('Profile photo updated successfully');
    localStorage.setItem('user', JSON.stringify(response?.data?.profileImage));
    setUser((prev) => ({
      ...prev,
      profileImage: response?.data?.profileImage,
    }));
  } catch (error) {
    toast.error(
      error?.response?.data?.message || 'Unable to update profile photo.'
    );
  } finally {
    // Dismiss the loading toast
    toast.dismiss(toastId);
  }
}

export async function resetMobileNumber(
  mobileNumber,
  token,
  setUser,
  setDisabled
) {
  const toastId = toast.loading('Loading...');
  setDisabled(true);
  try {
    const response = await apiConnector(
      'POST',
      UPDATE_MOBILE_NUMBER,
      {
        mobileNumber,
      },
      { Authorization: `Bearer ${token}` }
    );

    toast.dismiss(toastId);
    setUser((prev) => {
      return {
        ...prev,
        mobileNumber: mobileNumber,
      };
    });
    toast.success('Mobile number is updated successfully.');
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(
      error?.response?.data?.message || 'Unable to update mobile number.'
    );
  } finally {
    setDisabled(false);
  }
}

export async function resetShopDetails(shopName, shopLandmark, token) {
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector(
      'POST',
      UPDATE_SHOP_DETAILS,
      {
        shopName,
        shopLandmark,
      },
      { Authorization: `Bearer ${token}` }
    );

    toast.success('Shop details updated successfully');
  } catch (error) {
    toast.error(
      error?.response?.data?.messgae || 'Unable to update the shop details.'
    );
  }
  toast.dismiss(toastId);
}

// export function resetFineDetails(fineRate , fineEnforcementTime , token)
// {
//   return async()=>
//   {
//     const toastId = toast.loading("Loading...")
//     try
//     {
//       const response = await apiConnector("POST",UPDATE_FINE_DETAILS ,
//         {
//           fineRate,
//           fineEnforcementTime
//         },
//         {'Authorization': `Bearer ${token}`}
//       )

//       toast.success("Fine details updated successfully.");

//     }catch(error)
//     {
//         toast.error(error?.response?.data?.message || "Unable to update fine details");
//     }
//     toast.dismiss(toastId);
//   }

// }

// export function resetWaitingTime(waitingTime , token)
// {
//   return async()=>
//   {
//     const toastId = toast.loading("Loading...")
//     try
//     {
//         const response = await apiConnector("POST",UPDATE_WAITING_TIME,{
//           waitingTime
//         },
//         {'Authorization': `Bearer ${token}`}
//         );

//         toast.success("Waiting time is updated successfully.")

//     }catch(error)
//     {
//       toast.error(error?.response?.data?.message || "Unable to update waiting time.")
//     }
//     toast.dismiss(toastId);
//   }
// }

// export function changeShopStatus(token)
// {
//     return async()=>
//     {
//         const toastId = toast.loading("Loading...");
//         try
//         {
//             const response = await apiConnector("POST" , ALTER_SHOP_STATUS , undefined , {'Authorization': `Bearer ${token}`});
//             toast.dismiss(toastId);
//             toast.success("Shop status is updated successfully.")
//             return 1;
//         }
//         catch(error)
//         {
//             toast.error(error?.response?.data?.message || "Unable to update the shop status.");
//             toast.dismiss(toastId);
//             return 0;
//         }
//     }
// }

// export function updateRefundStatus(token , orderId)
// {
//     return async()=>
//     {
//         const toastId = toast.loading("Loading...")
//         try{
//             const response =await apiConnector("POST",ALTER_REFUND_STATUS,{
//               orderId : orderId
//               },
//               {'Authorization': `Bearer ${token}`}
//             )

//             toast.dismiss(toastId);
//             toast.success("Refund status is updated successfully.")

//         }catch(error)
//         {
//             toast.dismiss(toastId);
//             toast.error(error?.response?.data?.message || "Unable to update refund status.")
//         }
//     }
// }
