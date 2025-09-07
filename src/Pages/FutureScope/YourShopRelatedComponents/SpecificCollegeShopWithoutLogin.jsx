// import React, { useState,useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getShopDetails } from '../Services/operations/GetUserInformation';
// import { useDispatch, useSelector } from 'react-redux';
// import LoginDialogBox from '../components/FuturesScope/AnotherLoginPage/LoginDialogBox.jsx';

// const SpecificCollegeShopWithoutLogin = () => {

//   const location = useLocation();
//   const shopCode = location.pathname.split("/").pop();
//   const[shopDetails , setShopDetails] = useState({});
//   const dispatch = useDispatch();
//   const[loading , setLoading] = useState(false);
//   const[showLoginDialogBox , setShowLoginDialogBox] = useState(false);
//   const token = useSelector((state)=>(state.auth.token));
//   const navigate = useNavigate();

//   useEffect(()=>
//   {
//       dispatch(getShopDetails(dispatch , setShopDetails , shopCode , setLoading));
//   },[])

//   return (
//     <div className='p-2 sm:p-6 bg-gray-50 min-h-screen'>
//       {
//         loading ?
//         <div>
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         </div>
//         :
//         (
//           <div className="min-h-screen w-full flex flex-col gap-6 items-center p-6 bg-gray-50">
//             {/* Title with styling */}
//             <h1 className="text-3xl font-normal text-black mb-6 mt-6 flex flex-col jusitfy-center items-center gap-[8px]">
//               <p className='text-center capitalize'>{shopDetails?.vendorAdditionalDetails?.shopName}</p>
//               <p className='text-center text-sm capitalize'>{shopDetails?.collegeCode?.collegeName}</p>
//             </h1>

//             {/* Order Box */}
//             <div className="w-[70vw] h-[40vh] max-w-lg border-2 border-dashed border-blue-700 flex justify-center items-center bg-gray-50
//                             rounded-[7px] shadow-lg transition-transform transform hover:scale-105"
//                  onClick={()=>{token? navigate(`/dashboard/place-order/shop/${location.pathname.split("/").pop()}`) : setShowLoginDialogBox(true)}}>
//               <span className="text-md font-semibold text-blue-700">+ Place Order</span>
//             </div>
//           </div>
//         )
//       }

//       {
//         showLoginDialogBox && <LoginDialogBox  setShowLoginDialogBox={setShowLoginDialogBox} shopCode={shopCode}/>
//       }
//       </div>
//   )
// }

// export default SpecificCollegeShopWithoutLogin
