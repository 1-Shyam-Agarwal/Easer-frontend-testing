// import React, { useContext } from 'react';
// import { useSelector } from 'react-redux';
// import { getfilteredVendorsList } from '../../../Services/operations/VendorRelated';
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import PrintShopCard from '../../../components/FuturesScope/YourShopComponents/YourShopCard';
// import { CgMenuGridR } from "react-icons/cg";
// import { socketContext } from '../../ContextApi/SocketContext';
// import { useLocation, useNavigate } from 'react-router-dom';

// const YourShopPage = () => {
//     const token = useSelector((state=>state.auth.token));
//     const[loading , setLoading] = useState(true);
//     const [filteredVendorsData, setFilteredVendorsData] = useState([]);
//     const{socket,setSocket}=useContext(socketContext);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getfilteredVendorsList(setFilteredVendorsData, token ,setLoading,dispatch ,navigate,socket,setSocket));
//     }, [socket]); // Empty dependency array to run only once on mount

//     return (
//         <div>
//             {
//                 loading?
//                 (
//                     <div className="min-h-screen flex items-center justify-center">
//                         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                     </div>
//                 )
//                 :
//                 (
//                     <div className="max-w-screen-xl mx-auto p-6 max-480:p-2 flex flex-col">
//                         <div className="max-480:gap-2 mb-10 space-y-2 max-480:space-y-0 max-480:flex max-480:flex-col max-480:justify-center max-480:items-center">
//                             <div className="flex items-center gap-3">
                                    
//                                 <div className="flex items-center justify-center p-2 rounded-[5px] bg-blue-50 ">
//                                     <CgMenuGridR className="w-6 h-6 text-blue-500 " />
//                                 </div>
                                
//                                 <h1 className="text-2xl sm:text-3xl font-normal  text-gray-800">
//                                     Campus Shops
//                                 </h1>

//                             </div>

//                             <p className="text-gray-400 text-sm max-480:text-center ">Quick, reliable printing services right on your campus</p>

//                         </div>
//                         <div className="space-y-6">
//                             {
//                                 filteredVendorsData?.length!==0 ? (filteredVendorsData?.map((element,index) => {
//                                 return (
//                                     <PrintShopCard element={element} key={index}/>
//                                 );
//                                 }))
//                                 :
//                                 <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                                     <div className="flex flex-col items-center text-center">
//                                     <div className="mb-4 text-red-500">
//                                         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                                         </svg>
//                                     </div>
//                                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                                         No Print Shops Available
//                                     </h3>
//                                     <p className="text-sm text-gray-500 max-w-sm">
//                                         We haven't found any registered printing shops in your area yet. 
//                                         Know a print shop owner? Encourage them to join our platform for 
//                                         expanded business opportunities!
//                                     </p>
//                                     </div>
//                                 </div>
//                             }
//                         </div>
//                     </div>

//                 )
//             }
//         </div>
        
//     );
// }

// export default YourShopPage;
