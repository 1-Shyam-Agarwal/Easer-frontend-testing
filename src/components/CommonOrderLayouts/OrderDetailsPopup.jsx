import React from "react";
import { X, FileText, User, Store, CreditCard, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useSelector } from "react-redux";

const OrderDetailsPopup = ({ order, setSelectedOngoingOrder }) => {
  const role = useSelector((state) => state.auth.role);
  const [showExtraInfo, setShowExtraInfo] = React.useState(false);
  if (!order) return null;

  
  

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'pending': return 'bg-gray-50 text-gray-700 border border-gray-200';
      case 'processing': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border border-gray-300';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-6xl max-h-[95vh] bg-white rounded-lg shadow-xl border overflow-hidden">
        {/* Header */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-black mb-2">Order Details</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-600 text-sm break-all">Order ID: {order.orderId}</span>
                <div className={`px-2 py-1 rounded text-xs font-medium self-start ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedOngoingOrder({})}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-3 sm:px-6 pb-6 overflow-y-auto max-h-[calc(95vh-120px)] space-y-6 sm:space-y-8">

          {/* Documents Section */}
          <div className="pt-4 sm:pt-6">
            <h3 className="flex items-center text-sm  font-semibold text-gray-900 mb-3 sm:mb-4">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
              Documents ({order.documents?.length || 0})
            </h3>
            <div className="space-y-3">
              {order.documents?.map((doc, idx) => (
                <div key={idx} className="bg-gray-50 border p-3 rounded-lg">
                  
                    
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-normal text-gray-900 text-sm break-words mb-1">{doc.name}</h4>
                        <div className="flex items-center flex-wrap gap-3 text-xs text-gray-600">
                          {role === "customer" ? <span>{doc.pageCount} pages</span> : null}
                          <span>• {doc.fileConfigs?.copies || 1} copies</span>
                          <span>• {doc.fileConfigs?.color || 'B&W'}</span>
                          <span>• {doc.fileConfigs?.orientation || 'Portrait'}</span>
                          <span>• {doc.fileConfigs?.backToBack ? "Double-sided" : "Single-sided"}</span>
                        </div>
                      </div>
                      <a
                        href={doc?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white font-medium text-xs rounded hover:bg-blue-700 transition-colors shrink-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View
                      </a>
                    </div>
                  </div>
                  
              ))}
          </div>
        </div>

          {/* Toggle Button for Extra Info */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowExtraInfo(!showExtraInfo)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-colors"
            >
              {showExtraInfo ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show More Details
                </>
              )}
            </button>
          </div>

          {/* Extra Information - Collapsible */}
          {showExtraInfo && (

            <>

              {/* Payment Section */}
              <div>
                <h3 className="flex items-center text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  Payment Information
                </h3>
                <div className="bg-gray-50 border p-3 sm:p-4 rounded-[2px]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b">
                    <div className="text-xl sm:text-2xl font-semibold text-gray-900">₹{order.price}</div>
                    <div className={`px-3 py-1 rounded text-sm font-medium self-start ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payment Mode</p>
                      <p className="text-gray-900">{order.paymentMode}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Bank Ref No</p>
                      <p className="text-gray-900 font-mono text-xs sm:text-sm break-all">{order.bankReferenceNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payment ID</p>
                      <p className="text-gray-900 font-mono text-xs sm:text-sm break-all">{order.paymentId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payment Time</p>
                      <p className="text-gray-900 text-sm">{order.paymentTime ? new Date(order.paymentTime).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Meta Info */}
              <div className="bg-gray-50 border p-3 sm:p-4 rounded-[2px]">
                <h3 className="text-base font-semibold text-gray-900 mb-3 sm:mb-4">Order Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Ordered At</p>
                    <p className="text-gray-900 text-sm">{order?.orderedAt ? new Date(order?.orderedAt).toLocaleString() : 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Received At</p>
                    <p className="text-gray-900 text-sm">{order?.timeOfRecieving ? new Date(order?.timeOfRecieving).toLocaleString() : 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Order OTP</p>
                    <p className="text-gray-900 text-sm">{order?.otp ? order?.otp :  'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* User Section */}
              {/* <div>
                <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-3 sm:mb-4">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  Customer Information
                </h3>
                <div className="bg-gray-50  border p-3 sm:p-4 rounded-[1px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-normal text-gray-500 uppercase mb-[4px]">Name</p>
                      <p className="text-gray-900 font-normal text-sm sm:text-base  break-words">{order.user?.firstName} {order.user?.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-[4px]">Email</p>
                      <p className="text-gray-900 break-all text-sm sm:text-base">{order.user?.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-[4px]">Mobile</p>
                      <p className="text-gray-900 text-sm sm:text-base">{order.user?.mobileNumber}</p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Vendor Section */}
              {/* <div>
                <h3 className="flex items-center text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                  <Store className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  Vendor Information
                </h3>
                <div className="bg-gray-50 border p-3 sm:p-4 rounded-[1px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-normal text-gray-500 uppercase mb-[4px]">Shop Name</p>
                      <p className="text-gray-900 font-normal break-words text-sm sm:text-base">{order.vendor?.vendorAdditionalDetails?.shopName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-normal text-gray-500 uppercase mb-[4px]">Landmark</p>
                      <p className="text-gray-900 break-words text-sm sm:text-base">{order.vendor?.vendorAdditionalDetails?.shopLandMark}</p>
                    </div>
                  </div>
                </div>
              </div> */}

              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPopup;