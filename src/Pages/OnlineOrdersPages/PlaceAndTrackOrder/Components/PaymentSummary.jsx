import React, { useState, useEffect } from 'react';
import { Receipt, Printer, AlertCircle } from 'lucide-react';
import { load } from '@cashfreepayments/cashfree-js';
import {
  creatingOrder,
} from '../../../../Services/operations/PrintOrderVendor';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../../Services/apiconnect';
import { printOrderVendorEndpoints } from '../../../../Services/apis';
import { useRef } from 'react';




const PaymentSummary = ({
  invoice,
  filesWithConfigs,
  setAddDocumentsModelVisibility,
  setPaymentSummaryModelVisibility,
  setDisplayCheckoutModel,
  setDisplaySpinner
}) => {
  const token = useSelector((state) => state.auth.token);
  const orderIdRef = useRef("");
  const [displayNoCancellationWarning,setDisplayNoCancellationWarning] = useState(false);
  const [disable , setDisable] = useState(false);

  let cashfree;

  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: 'sandbox',
    });
  };

  insitialzeSDK();

  async function getSessionId() {

    const toastId = toast.loading("Redirecting...");
    try {
      let res = await apiConnector(
        'POST',
        printOrderVendorEndpoints.CREATE_PG_ORDER,
        {
          vendorId: invoice.vendor,
          price: invoice.price.price,
          filesWithConfigs : filesWithConfigs
        },
        { Authorization: `Bearer ${token}` }
      );

      if (res?.data && res?.data?.data?.payment_session_id) {
        orderIdRef.current = res.data.data.order_id;
        return res?.data?.data?.payment_session_id;
      } else {
        toast.error('Sorry! We couldn’t place your order. Please try again shortly.');
      }
    } catch (error) {
      toast.error('Sorry! We couldn’t place your order. Please try again shortly.');
    }
    finally{
      toast.dismiss(toastId);
    }
  }

  const verifyPayment = async () => {
    try {
      let res = await apiConnector(
        'POST',
        printOrderVendorEndpoints.VERIFY_PAYMENT,
        {
          orderId : orderIdRef.current,
          vendorId: invoice?.vendor,
        },
        { Authorization: `Bearer ${token}` }
      );
      return res;
    } catch (error) {
      // setLoading(false);
      // setDisplayCross(true);
    }
  };

  async function OrderValidationAndCreationHandler() {
      let session_id = await getSessionId();

      if(!session_id)
      {
        setDisable(false);
        return;
      }

      let checkoutOptions = {
        paymentSessionId: session_id,
        redirectTarget: '_modal',
      };


      setDisplayCheckoutModel(false);
      setDisplaySpinner(true);

      cashfree.checkout(checkoutOptions).then(async (res) => {
        const result = await verifyPayment();
        if (result && result.data) {
          toast.success("Order placed successfully");
        }
        setDisplaySpinner(false);
      })
  }



  const PrintDetail = ({ icon: Icon, label, count, rate, pricingMode }) =>
    count > 0 ? (
      <div className="flex max-480:flex-col flex-row max-480:items-start items-center justify-between p-3 border border-gray-200">
        <div className="flex items-center gap-3 max-480:mb-2 mb-0">
          <Icon size={20} className="text-gray-600 flex-shrink-0" />
          <div>
            <div className="text-[14px] break-words">{label}</div>
            <div className="text-sm text-gray-600">
              {pricingMode === 'combined' ? (
                <div>
                  {`For ${count} ${count === 1 ? 'page' : 'pages'} : ₹${rate}`}
                </div>
              ) : (
                <div>
                  {count}
                  {count === 1 ? 'page' : 'pages'} X ₹{rate}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-[16px] font-semibold ml-8 sm:ml-0">
          {pricingMode === 'combined'
            ? '₹' + rate
            : '₹' + (count * rate)?.toFixed(2)}
        </div>
      </div>
    ) : null;

  return (
    <div className="mt-[20px] mx-2 sm:mx-4 max-w-4xl">
      <h1 className="text-[18px] sm:text-[20px] pl-2 flex gap-2">
        <Receipt className="text-blue-600" />
        <div className="flex flex-col justify-center items-center mb-[15px]">
          <div>Payment Summary</div>
          <div className="w-[20px] h-[5px] bg-blue-500 rounded-[5px]"></div>
        </div>
      </h1>

      <div>
        <PrintDetail
          icon={Printer}
          label="Black & White (Single Side)"
          count={invoice?.pages?.number_of_ss_prints_bw}
          rate={invoice?.priceSchema?.applicablePriceSchema_BW?.[0]}
          pricingMode={invoice?.priceSchema?.applicablePriceSchema_BW?.[1]}
        />

        <PrintDetail
          icon={Printer}
          label="Black & White (Back-To-Back)"
          count={invoice?.pages?.number_of_bb_prints_bw}
          rate={invoice?.priceSchema?.applicablePriceSchema_BW?.[0]}
          pricingMode={invoice?.priceSchema?.applicablePriceSchema_BW?.[1]}
        />

        <PrintDetail
          icon={Printer}
          label="Colour (Single Side)"
          count={invoice?.pages?.number_of_ss_prints_c}
          rate={invoice?.priceSchema?.applicablePriceSchema_C?.[0]}
          pricingMode={invoice?.priceSchema?.applicablePriceSchema_C?.[1]}
        />

        <PrintDetail
          icon={Printer}
          label="Colour (Back-To-Back)"
          count={invoice?.pages?.number_of_bb_prints_c}
          rate={invoice?.priceSchema?.applicablePriceSchema_C?.[0]}
          pricingMode={invoice?.priceSchema?.applicablePriceSchema_C?.[1]}
        />
      </div>

      {/* Total Amount */}
      <div className="p-4 sm:p-6 bg-gray-50 rounded-b-[5px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="text-base sm:text-lg font-semibold">Total Amount</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-600">
            ₹{invoice?.price?.price}
          </div>
        </div>

        {/* Print Details Summary */}
        <div className="mt-4 text-xs sm:text-sm text-gray-600">
          {invoice?.pages?.number_of_ss_prints_bw > 0 && (
            <div className="flex items-center gap-1 mb-1">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span className="break-words">
                Single-side B&W rate: ₹
                {invoice?.priceSchema?.applicablePriceSchema_BW?.[0]}
                {`${invoice?.priceSchema?.applicablePriceSchema_BW?.[1] === 'combined' ? ' (combined)' : '/per-print'}`}
              </span>
            </div>
          )}
          {invoice?.pages?.number_of_bb_prints_bw > 0 && (
            <div className="flex items-center gap-1 mb-1">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span className="break-words">
                Back-to-back B&W rate: ₹
                {invoice?.priceSchema?.applicablePriceSchema_BW?.[0]}
                {`${invoice?.priceSchema?.applicablePriceSchema_BW?.[1] === 'combined' ? ' (combined)' : '/per-print'}`}
              </span>
            </div>
          )}
          {invoice?.pages?.number_of_ss_prints_c > 0 && (
            <div className="flex items-center gap-1">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span className="break-words">
                Color print rate: ₹
                {invoice?.priceSchema?.applicablePriceSchema_C?.[0]}
                {`${invoice?.priceSchema?.applicablePriceSchema_C?.[1] === 'combined' ? ' (combined)' : '/per-print'}`}
              </span>
            </div>
          )}

          {invoice?.pages?.number_of_bb_prints_c > 0 && (
            <div className="flex items-center gap-1">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span className="break-words">
                Color print rate: ₹
                {invoice?.priceSchema?.applicablePriceSchema_C?.[0]}
                {`${invoice?.priceSchema?.applicablePriceSchema_C?.[1] === 'combined' ? ' (combined)' : '/per-print'}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* orderSummary */}
      <div className="sm:m-4 mx-1 my-4 ">
        <div className="p-2 text-[20px]">Order Summary</div>
        {/* Header Section */}
        <div className="grid grid-cols-6 max-640:gap-2 gap-4 max-640:text-[10px] bg-gray-800 text-white rounded-[5px] max-640:p-2 p-4 text-sm font-medium">
          <div className="text-left flex items-center justify-center">
            Docs. Name
          </div>
          <div className="text-center flex items-center justify-center ">
            Pages
          </div>
          <div className="text-center flex items-center justify-center ">
            Color
          </div>
          <div className="text-center flex items-center justify-center ">
            Layout
          </div>
          <div className="text-center flex items-center justify-center ">
            B-T-B
          </div>
          <div className="text-right flex items-center justify-center ">
            Copies
          </div>
        </div>

        {/* Content Section */}
        <div className="divide-y divide-gray-200">
          {filesWithConfigs?.map((ele, index) => (
            <div
              key={index}
              className={`grid grid-cols-6 max-640:text-[10px] max-640:gap-2 gap-4 p-2 rounded-[5px] bg-gray-50 px-2 text-sm hover:bg-gray-200 
                transition-all duration-200 ease-in-out  group rounded-[5px]`}
            >
              {/* Filename with Tooltip */}
              <div className="text-left text-gray-700">
                <div className="flex items-center justify-center relative">
                  <span className="truncate">
                    {ele.name}
                    <img
                      src="dummy"
                      title={ele.name}
                      className="absolute top-0 left-0 opacity-0"
                    />
                  </span>
                </div>
              </div>

              {/* Other Cells with Hover Effects */}
              <div className="text-right text-gray-700 group-hover:text-gray-900 font-medium flex justify-center items-center">
                {ele?.pageCount}
              </div>

              <div className="text-center text-gray-700 group-hover:text-gray-900 flex justify-center items-center">
                <span
                  className={`max-640:px-1 px-3 py-1 rounded-full ${ele?.fileConfigs?.color === 'colored' ? 'bg-blue-200 group-hover:bg-blue-300' : 'bg-gray-200 group-hover:bg-gray-300'}  flex justify-center items-center`}
                >
                  {ele?.fileConfigs?.color !== 'colored' ? 'B&W' : 'Color'}
                </span>
              </div>
              <div className="text-center text-gray-700 capitalize group-outer-hover:text-gray-900 flex justify-center items-center">
                {ele?.fileConfigs?.orientation}
              </div>
              <div className="text-center text-gray-700 group-hover:text-gray-900 flex justify-center items-center">
                <span
                  className={`max-640:px-1 px-3 py-1 rounded-full flex justify-center items-center ${
                    ele?.fileConfigs?.backToBack
                      ? 'bg-green-100 text-green-800 group-hover:bg-green-200'
                      : 'bg-red-100 text-red-800 group-hover:bg-red-200'
                  }`}
                >
                  {ele?.fileConfigs?.backToBack ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="text-center text-gray-700 group-hover:text-gray-900 flex justify-center items-center">
                {ele?.fileConfigs?.copies}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filesWithConfigs?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No documents available
          </div>
        )}

        {/* Footer Summary */}
        <div className="p-4 text-sm max-640:text-[12px] text-gray-500 flex justify-between items-center  border-y-2 rounded-[2px]">
          <span>Total Documents: {filesWithConfigs?.length}</span>
          {/* <span>
            Pages Required:{' '}
            {(invoice?.pages?.number_of_ss_prints_c === undefined
              ? 0
              : invoice?.pages?.number_of_ss_prints_c) +
              Math.ceil(
                (invoice?.pages?.number_of_bw_prints_bb === undefined
                  ? 0
                  : invoice?.pages?.number_of_bw_prints_bb) / 2
              ) +
              (invoice?.pages?.number_of_bw_prints_ss === undefined
                ? 0
                : invoice?.pages?.number_of_bw_prints_ss) +
              Math.ceil(
                (invoice?.pages?.number_of_bb_prints_c === undefined
                  ? 0
                  : invoice?.pages?.number_of_bb_prints_c) / 2
              )}
          </span> */}
        </div>
      </div>
       
      <div className='flex flex-row items-center justify-center gap-4 sm:gap-8 mb-6 '>
        <div className="mt-4 text-right">
          <button
          disabled={disable}
            className={` text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium shadow-sm transition ${disable 
                    ? 'bg-blue-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
            onClick={() => {
              setAddDocumentsModelVisibility(true);
              setPaymentSummaryModelVisibility(false);
            }}
          >
             Back
          </button>
        </div>

        {
            invoice?.price?.price &&
            <div className="mt-4 text-right">
              <button
                disabled={disable}
                onClick={() => setDisplayNoCancellationWarning(true)}
                className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium shadow-sm transition text-white
                  ${disable 
                    ? 'bg-blue-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                Pay ₹{invoice?.price?.price}
              </button>
            </div>

        }
        
        

      </div>

      {
          displayNoCancellationWarning &&
          <div className='fixed inset-0 bg-black/70 text-white z-50 flex items-center justify-center'>
            <div className='bg-white text-gray-800 rounded-[5px] shadow-2xl p-8 max-w-md mx-4 transform transition-all duration-300 border border-gray-200'>
              <div className='text-center'>
                {/* <div className='bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                  </svg>
                </div> */}

                <h2 className='text-xl font-semibold text-gray-900 mb-3'>
                  No Cancellation Policy
                </h2>

                <p class="text-sm text-gray-700 mb-6 leading-relaxed">
                  You cannot cancel the order after making payment for any reason. Please review carefully before proceeding.
                </p>
                <button class='bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-[5px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
                  onClick={() => { 
                    setDisplayNoCancellationWarning(false); 
                    setDisable(true);
                    OrderValidationAndCreationHandler();
                  }}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        }
        
    </div>
  );
};

export default PaymentSummary;
