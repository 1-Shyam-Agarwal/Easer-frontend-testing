// import React, { useContext, useEffect, useState } from 'react'
// import { priceCalculator } from '../../Services/operations/PriceCalculation';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import ConfirmationModal from './ConfirmationModal';
// import { validatingOrder , creatingOrder } from '../../Services/operations/PrintOrderVendor';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import { Eye, Download, Share2 } from 'lucide-react';
// import PricingSchema from './PriceCard';
// import PaymentInvoiceWindow from './PaymentInvoiceWindow';
// import { apiConnector } from '../../Services/apiconnect';
// import {printOrderVendorEndpoints} from "../../Services/apis.js"
// import {load} from "@cashfreepayments/cashfree-js";
// import { socketContext } from '../../ContextApi/SocketContext.js';
// import { useRef } from 'react';

// const PaymentModel = (props) => {

//   const fileConfigs = props?.fileConfigs
//   const files = props?.files
//   const token = useSelector((state)=>(state.auth.token));
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {socket , setSocket} = useContext(socketContext);
//   const [displayConfirmationWindow , setDisplayConfirmationWindow] = useState(false);
//   const [loading , setLoading] = useState(false);
//   const [invoice , setInvoice] = useState({});
//   const [paymentMode , setPaymentMode] = useState("");
//   let orderId = useRef("");

//   let cashfree;

//   let insitialzeSDK = async function () {

//     cashfree = await load({
//       mode: "production",
//     })
//   }

//   insitialzeSDK();



//   useEffect(()=>
//   {
//       // Extract the vendorId from the URL using the pathname
//       const pathParts = location.pathname.split('/'); // Split the URL by "/"
//       const vendorId = pathParts[pathParts.length - 1]; // The vendorId is the last part of the URL 
//       dispatch(priceCalculator(fileConfigs , setInvoice , setLoading, vendorId , token ,dispatch , navigate , socket , setSocket ));
//   },[socket]);

//   async function getSessionId(setLoading,setDisplayCross ,vendorId,userId,price)
//   {
//       try{
//         let res = await apiConnector("POST",printOrderVendorEndpoints.CREATE_PG_ORDER,{
//           vendorId,
//           userId,
//           price
//         });

//         if(res?.data && res?.data?.data?.payment_session_id)
//         {
//             orderId.current = res?.data?.data?.order_id;
//             return res?.data?.data?.payment_session_id;
//         }
//         else
//         {
//           setLoading(false);
//           setDisplayCross(true);
//           toast.error("We are unable to place the order.Please try again later.")
//         }

//       }catch(error)
//       {
//         setLoading(false);
//         setDisplayCross(true);
//         toast.error("We are unable to place the order.Please try again later.")
//         console.log(error);
//       }
//   }

//   const verifyPayment = async (orderId , vendorId ,setLoading ,setDisplayCross) => {
//     try {
      
//       let res = await apiConnector("POST" ,printOrderVendorEndpoints.VERIFY_PAYMENT, {
//         orderId,
//         vendorId
//       });
//       return res;

//     } catch (error) {
//       setLoading(false);
//       setDisplayCross(true);
//       toast.error("Error occured while verifying your payment.")
//       console.log(error)
//     }
//   }

//   async function OrderValidationAndCreationHandler(paymentMode)
//   {
//     // Extract the vendorId from the URL using the pathname
//     const pathParts = location.pathname.split('/'); // Split the URL by "/"
//     const vendorID = pathParts[pathParts.length - 1]; // The vendorId is the last part of the URL 
//     props?.setDisplayCross(false);
//     setDisplayConfirmationWindow(false);
//     setLoading(true);
    
//     const isOrderValid = await dispatch(validatingOrder(token , vendorID , files , fileConfigs, invoice?.price ,setLoading , props?.setDisplayCross,dispatch , navigate , socket , setSocket));

//     if(isOrderValid )
//     {

//       if(paymentMode==="offline")
//       {

//         const isOrderCreated = await dispatch(creatingOrder( 
//           setLoading,
//           props?.setDisplayCross,
//           files ,
//            fileConfigs ,
//            isOrderValid ,
//            vendorID ,
//             invoice?.price ,
//            "offline" ,
//            "pending" ))

//           socket.emit("update-all-user-ongoing-orders" ,{ isOrderCreated , roomCode : vendorID});
//         if(isOrderCreated)
//         {
//           props.setAddDocumentsWindow(false);
//           props.setPaymentWindow(false);
//         } 
//       }
//       else
//       {
//         let session_id = await getSessionId(setLoading,props?.setDisplayCross , vendorID , isOrderValid , invoice?.price);
        
//         let checkoutOptions = {
//           paymentSessionId : session_id,
//           redirectTarget:"_modal",
//         }
  
//         cashfree.checkout(checkoutOptions).then(async(res) => {
  
          
//           const result = await verifyPayment(orderId.current,vendorID,setLoading ,props?.setDisplayCross);
//           if(result?.data?.response?.paymentStatus === "SUCCESS")
//           {
            
//             const isOrderCreated = await dispatch(creatingOrder(
//               setLoading,
//               props?.setDisplayCross,
//               files,
//               fileConfigs,
//               isOrderValid,
//               vendorID,
//               invoice?.price,
//               "online",
//               "paid",
//               orderId.current,
//               result?.data?.response?.paymentId,
//               result?.data?.response?.bankReferenceNumber
//             ))
            
//             socket.emit("update-all-user-ongoing-orders" ,{ isOrderCreated , roomCode : vendorID});

//             if(isOrderCreated)
//             {
//               props.setAddDocumentsWindow(false);
//               props.setPaymentWindow(false);
//               props.setDisplayCross(false);
//             } 

//           }else if(result?.data?.response?.paymentStatus === "FAILED")
//           {
//             setLoading(false);
//             props?.setDisplayCross(true);
//             toast.error("Transaction Failed.Please try again.")
//           }
//           else
//           {
//             setLoading(false);
//             props?.setDisplayCross(true);
//             toast.error("Transaction Failed.");
//           }
         
//         })
//       }
    
//     }
//     else
//     {
//       setLoading(false);
//       props?.setDisplayCross(true);
//     }
//   }

//   function payOfflineHandler()
//   {
//     setPaymentMode("offline");
//     setDisplayConfirmationWindow(true);
//   }

//   function payOnlineHandler()
//   {
//     setPaymentMode("online");
//     setDisplayConfirmationWindow(true);
//   }

//   return (
//     <div >
//       {
//           loading ?
//           (
//             <div className="min-h-screen flex items-center justify-center">
//               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )
//           :
//           (
//             <div>
//                 <PaymentInvoiceWindow invoice={invoice}/>
//                 {/* orderSummary */}
//                 <div className="sm:m-4 mx-1 my-4 ">
//                     <div className='p-2 text-[20px]'>Order Summary</div>
//                     {/* Header Section */}
//                     <div className="grid grid-cols-6 max-640:gap-2 gap-4 max-640:text-[10px] bg-gray-800 text-white rounded-[5px] max-640:p-2 p-4 text-sm font-medium">
//                       <div className="text-left flex items-center justify-center">Docs. Name</div>
//                       <div className="text-center flex items-center justify-center ">Pages</div>
//                       <div className="text-center flex items-center justify-center ">Color</div>
//                       <div className="text-center flex items-center justify-center ">Layout</div>
//                       <div className="text-center flex items-center justify-center ">B-T-B</div>
//                       <div className="text-right flex items-center justify-center " >Copies</div>
//                     </div>

//                     {/* Content Section */}
//                     <div className="divide-y divide-gray-200">
//                       {fileConfigs?.map((ele, index) => (
//                         <div
//                           key={index}
//                           className={`grid grid-cols-6 max-640:text-[10px] max-640:gap-2 gap-4 p-2 rounded-[5px] bg-gray-50 px-2 text-sm hover:bg-gray-200 
//                             transition-all duration-200 ease-in-out  group rounded-[5px]`}
//                         >
//                           {/* Filename with Tooltip */}
//                           <div className="text-left text-gray-700">
//                             <div className="flex items-center justify-center relative">
//                               <span className="truncate">{files?.[index]?.fileName}<img src="djnkjsdnj" title={files?.[index]?.fileName} className='absolute top-0 left-0 opacity-0'/></span>
//                             </div>
//                           </div>

//                           {/* Other Cells with Hover Effects */}
//                           <div className="text-right text-gray-700 group-hover:text-gray-900 font-medium flex justify-center items-center">
//                             {ele?.numberOfPages}
//                           </div>
                        
//                           <div className="text-center text-gray-700 group-hover:text-gray-900 flex justify-center items-center">
//                             <span className={`max-640:px-1 px-3 py-1 rounded-full ${ele?.color==="colored"? "bg-blue-200 group-hover:bg-blue-300" : "bg-gray-200 group-hover:bg-gray-300"}  flex justify-center items-center`}>
//                               {ele?.color!=="colored" ? "B&W" : "Color"}
//                             </span>
//                           </div>
//                           <div className="text-center text-gray-700 capitalize group-outer-hover:text-gray-900 flex justify-center items-center">
//                             {ele?.orientation}
//                           </div>
//                           <div className="text-center text-gray-700 group-hover:text-gray-900 flex justify-center items-center">
//                             <span className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center ${
//                               ele?.backToBack 
//                                 ? 'bg-green-100 text-green-800 group-hover:bg-green-200' 
//                                 : 'bg-red-100 text-red-800 group-hover:bg-red-200'
//                             }`}>
//                               {ele?.backToBack ? "Yes" : "No"}
//                             </span>
//                           </div>
//                           <div className="text-center text-gray-700 group-hover:text-gray-900 flex justify-center items-center">
//                             {ele?.copies}
//                           </div>
                          
//                         </div>
//                       ))}
//                     </div>

//                     {/* Empty State */}
//                     {fileConfigs?.length === 0 && (
//                       <div className="text-center py-8 text-gray-500">
//                         No documents available
//                       </div>
//                     )}

//                     {/* Footer Summary */}
//                     <div className="p-4 text-sm max-640:text-[12px] text-gray-500 flex justify-between items-center  border-y-2 rounded-[2px]">
//                       <span>Total Documents: {fileConfigs?.length}</span>
//                       <span>Pages Required: {
//                                           (invoice?.pages?.numberofColoredPrints_SingleSide ===undefined ? 0 : invoice?.pages?.numberofColoredPrints_SingleSide )+ 
//                                           (Math.ceil(((invoice?.pages?.numberofBlackAndWhitePrints_BackToBack===undefined ? 0 : invoice?.pages?.numberofBlackAndWhitePrints_BackToBack)/2)))+
//                                           (invoice?.pages?.numberofBlackAndWhitePrints_SingleSide  ===undefined ? 0 : invoice?.pages?.numberofBlackAndWhitePrints_SingleSide ) +
//                                           (Math.ceil(((invoice?.pages?.numberofColoredPrints_backToBack===undefined ? 0 : invoice?.pages?.numberofColoredPrints_backToBack)/2)))
                                          
//                                         }</span>
//                     </div>
//                   </div>
                
//                 {/* pricing Schema
//                 <PricingSchema invoice={invoice}></PricingSchema> */}


//                 <div>
//                 <div className="flex max-420:flex-col gap-4 max-450:gap-3 justify-center mt-[30px] sticky bottom-[0px] left-[0px]">
                  

//                   {/* <button
//                     className={`bg-green-600 text-white font-normal px-6 py-2 rounded-[5px] shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all ${loading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-default"}`}
//                     onClick={()=>{
//                       payOfflineHandler()
//                     }}
//                     disabled={loading}
//                   >
//                     Pay Offline
//                   </button> */}

//                   <button className={`bg-blue-600 text-white font-normal px-6 py-2 rounded-[5px] shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${loading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-default"}`}
//                           onClick={payOnlineHandler}
//                           disabled={loading}>
//                     Pay Now
//                   </button>

//                   <button
//                     onClick={() => {
//                       props.setAddDocumentsWindow(true);
//                       props.setPaymentWindow(false);
//                     }}
//                     className={`bg-red-600 text-white font-normal px-6 py-2 rounded-[5px] shadow-lg transition-all ${
//                       loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
//                     }`}
//                   >
//                     Back
//                   </button> 
//                 </div>

                
//                 {
//                   displayConfirmationWindow && 
//                   <ConfirmationModal setDisplayConfirmationWindow = {setDisplayConfirmationWindow}
//                                   setAddDocumentsWindow = {props.setAddDocumentsWindow}
//                                   setPaymentWindow = {props.setPaymentWindow}
//                                   setDisplayCross = {props.setDisplayCross}
//                                   OrderValidationAndCreationHandler={OrderValidationAndCreationHandler}
//                                   paymentMode={paymentMode}/>
//                 }
                
//                 </div>
//             </div>
//           )
//       }
//     </div>
        
//   )
// }

// export default PaymentModel;
