// import React, { useEffect, useState } from 'react';
// import { setShowOrderModel } from '../../Slices/PlaceOrderModelSlice';
// import { useDispatch } from 'react-redux';

// const SuccessfulPayment = (props) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setTimeout(() => {
//       dispatch(setShowOrderModel(false));
//       props.setAddDocumentsWindow(true);
//       props.setPaymentWindow(false);
//       props.setFiles([]);
//       props.setFileConfigs([]);
//       props.setDisplayCross(true);
      
//     }, 5000); // Hide message after 3 seconds
//   }, [dispatch]);

//   return (
//     <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg w-[100%] h-[100%] text-center">
//       <h1 className="text-2xl font-semibold mb-2">Order is Successfully Placed</h1>
//       <p className="text-lg font-medium">Thank you for using our services!</p>
//     </div>
//   );
// };

// export default SuccessfulPayment;
