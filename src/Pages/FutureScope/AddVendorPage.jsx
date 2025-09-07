// import React, { useEffect ,useState} from 'react';
// import {getAllVendorRequests} from "../Services/operations/AdminApis.js";
// import { useDispatch, useSelector } from 'react-redux';
// import RequestCard from '../components/FuturesScope/AdminUI/RequestCard.jsx';

// const AddVendorPage = () => {

//   const [loading , setLoading] = useState(true);
//   const [request , setRequest] = useState([]);
//   const token = useSelector((state)=>state.auth.token);
//   const dispatch = useDispatch();

//   useEffect(()=>
//   {
//         dispatch(getAllVendorRequests(setRequest , setLoading , token))
//   },[])

//   return (
//     <div>
//         {
//             loading?
//             (
//                 <div className="min-h-screen flex items-center justify-center">
//                     <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//             )
//             :
//             (
//                 <div>

//                     <h1 className='p-6 pl-8 font-normal text-[1.5rem]'>Vendor Requests</h1>
//                     {
//                         request.map((ele)=>
//                         {
//                             return <RequestCard

//                                 />
//                         })
//                     }
//                 </div>
//             )
//         }
//     </div>

//   )
// }

// export default AddVendorPage
