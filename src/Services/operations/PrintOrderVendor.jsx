import React from 'react';
import { apiConnector } from '../apiconnect.js';
import toast from 'react-hot-toast';
import { printOrderVendorEndpoints } from '../apis.js';


// export function validatePrintOrderVendor(
//   setLoading,
//   navigate,
//   token,
//   vendorId,
//   dispatch,
//   socket,
//   setSocket
// ) {
//   return async (dispatch) => {
//     if (socket) {
//       setLoading(true);
//       try {
//         const response = await apiConnector(
//           'POST',
//           printOrderVendorEndpoints.VALIDATE_PRINT_ORDER_VENDOR,
//           { vendor: vendorId },
//           { Authorization: `Bearer ${token}` }
//         );

//         setLoading(false);
//         navigate(`shop/${vendorId}`);
//       } catch (error) {
//         setLoading(false);
//         if (
//           error?.response?.data?.message ===
//             'You are logged in on another device.' ||
//           error?.response?.data?.message === 'Session is expired.'
//         ) {
//           dispatch(clearToken());
//           dispatch(clearUser());
//           dispatch(clearRole());
//           dispatch(clearRoomcode());
//           socket.disconnect();
//           setSocket(null);
//           dispatch(setShowModel(false));
//           navigate('/login', { new: true });
//         }
//         toast.error(
//           error?.response?.data?.message ||
//             'Unable to validate the vendor. Please try again.'
//         );
//       }
//     }
//   };
// }

// export function validateFileFormatAndSize(
//   file,
//   formats,
//   setFiles,
//   setLoading,
//   setDisable,
//   token,
//   dispatch,
//   navigate,
//   socket,
//   setSocket
// ) {
//   return async (dispatch) => {
//     if (socket) {
//       setDisable(true);
//       const loadingID = toast.loading('Uploading...');
//       try {
//         const fileData = new FormData();
//         fileData.append('file', file);

//         const fileFormat = file?.type?.split('/')?.pop();
//         const fileSizeInMB = file?.size / (1024 * 1024);

//         fileData.append('format', fileFormat);
//         fileData.append('size', fileSizeInMB);
//         fileData.append('formats', formats);

//         let uploadedDocument = await apiConnector(
//           'POST',
//           printOrderVendorEndpoints.VALIDATE_FILE_FORMAT_AND_SIZE_AND_UPLOAD,
//           fileData,
//           { Authorization: `Bearer ${token}` }
//         );

//         //Uploading documet to media server

//         uploadedDocument = uploadedDocument?.data?.uploadedDocument;
//         const public_id = uploadedDocument?.public_id;
//         const secure_url = uploadedDocument?.secure_url;

//         setFiles((prev) => [
//           ...prev,
//           { public_id, secure_url, fileName: file?.name },
//         ]);
//         toast.dismiss(loadingID);
//         setDisable(false);
//         return true;
//       } catch (error) {
//         if (
//           error?.response?.data?.message ===
//             'You are logged in on another device.' ||
//           error?.response?.data?.message === 'Session is expired.'
//         ) {
//           dispatch(clearToken());
//           dispatch(clearUser());
//           dispatch(clearRole());
//           dispatch(clearRoomcode());
//           socket.disconnect();
//           setSocket(null);
//           dispatch(setShowModel(false));
//           navigate('/login', { new: true });
//         }
//         toast.error(
//           error?.response?.data?.message ||
//             'Unable to upload document.Please try again.'
//         );
//         toast.dismiss(loadingID);
//         setDisable(false);
//         return false;
//       }
//     }
//   };
// }

// export function validatingOrder(
//   token,
//   vendorID,
//   files,
//   fileConfigs,
//   price,
//   setLoading,
//   setDisplayCross,
//   dispatch,
//   navigate,
//   socket,
//   setSocket
// ) {
//   return async (dispatch) => {
//     try {
//       const response = await apiConnector(
//         'POST',
//         printOrderVendorEndpoints.VALIDATE_ORDER,
//         {
//           vendorID,
//           files,
//           fileConfigs,
//           price,
//         },
//         { Authorization: `Bearer ${token}` }
//       );
//       return response?.data?.userId ? response?.data?.userId : 0;
//     } catch (error) {
//       setLoading(false);
//       setDisplayCross(true);
//       if (
//         error?.response?.data?.message ===
//           'You are logged in on another device.' ||
//         error?.response?.data?.message === 'Session is expired.'
//       ) {
//         dispatch(clearToken());
//         dispatch(clearUser());
//         dispatch(clearRole());
//         dispatch(clearRoomcode());
//         socket.disconnect();
//         setSocket(null);
//         dispatch(setShowModel(false));
//         navigate('/login', { new: true });
//       }
//       toast.error(
//         error?.response?.data?.message ||
//           'Unable to validate the order. Please try again.'
//       );
//       return 0;
//     }
//   };
// }
// //setLoading,setDisplayCross,
export async function creatingOrder(
  filesWithConfigs,
  token,
  vendorID,
  price,
  orderId,
  paymentId,
  bankReferenceNumber,
  paymentTime
) {
  try {
    // Make the API call with the formData

    const response = await apiConnector(
      'POST',
      printOrderVendorEndpoints.CREATE_ORDER,
      {
        filesWithConfigs,
        vendorID,
        price,
        orderId,
        paymentId,
        bankReferenceNumber,
        paymentTime,
      },
      { Authorization: `Bearer ${token}` }
    );

    // files,
    // fileConfigs,
    // userID,
    // vendorID,
    // price,
    // paymentMode,
    // paymentStatus,
    // orderId,
    // paymentId,
    // bankReferenceNumber

    // Handle success response
    return response?.data;
  } catch (e) {
    toast.error('Failed to create order');
    // setLoading(false);
    // setDisplayCross(true);
    return 0;
  }
}
