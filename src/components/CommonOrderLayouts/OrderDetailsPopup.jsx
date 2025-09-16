import React from "react";
import { X, FileText, User, Store, CreditCard, ExternalLink } from "lucide-react";

const OrderDetailsPopup = ({ order, setSelectedOngoingOrder }) => {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="w-full sm:w-[95%] md:w-[85%] lg:w-[75%] xl:w-[65%] max-h-[95vh] bg-white rounded-lg shadow-xl border overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Order Details</h2>
              <div className="flex items-center gap-3">
                <span className="text-blue-100 text-sm">Order ID: {order.orderId}</span>
                <div className={`px-2 py-1 rounded text-xs font-medium bg-white/20 text-white border border-white/30`}>
                  {order.orderStatus}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedOngoingOrder({})}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)] space-y-8">
          {/* User Section */}
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Customer Information
            </h3>
            <div className="bg-gray-50 border p-4 rounded-lg">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Name</p>
                  <p className="text-gray-900 font-medium">{order.user.firstName} {order.user.lastName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-gray-900">{order.user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Mobile</p>
                  <p className="text-gray-900">{order.user.mobileNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Section */}
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Store className="w-5 h-5 mr-2 text-blue-600" />
              Vendor Information
            </h3>
            <div className="bg-gray-50 border p-4 rounded-lg">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Shop Name</p>
                  <p className="text-gray-900 font-medium">{order.vendor.vendorAdditionalDetails.shopName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Landmark</p>
                  <p className="text-gray-900">{order.vendor.vendorAdditionalDetails.shopLandMark}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Vendor ID</p>
                  <p className="text-gray-900">{order.vendor.userId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Documents ({order.documents.length})
            </h3>
            <div className="space-y-4">
              {order.documents.map((doc, idx) => (
                <div key={idx} className="bg-gray-50 border p-4 rounded-lg">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{doc.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-500 uppercase">Pages</p>
                        <p className="text-lg font-semibold text-gray-900">{doc.pageCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-500 uppercase">Copies</p>
                        <p className="text-lg font-semibold text-gray-900">{doc.fileConfigs.copies}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-500 uppercase">Color</p>
                        <p className="text-sm font-semibold text-gray-900">{doc.fileConfigs.color}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-500 uppercase">Orientation</p>
                        <p className="text-sm font-semibold text-gray-900">{doc.fileConfigs.orientation}</p>
                      </div>
                      <div className="text-center col-span-2">
                        <p className="text-xs font-medium text-gray-500 uppercase">Back-to-Back</p>
                        <p className="text-lg font-semibold text-gray-900">{doc.fileConfigs.backToBack ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Document
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
              Payment Information
            </h3>
            <div className="bg-gray-50 border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="text-2xl font-bold text-gray-900">₹{order.price}</div>
                <div className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payment Mode</p>
                  <p className="text-gray-900">{order.paymentMode}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Bank Ref No</p>
                  <p className="text-gray-900 font-mono text-sm">{order.bankReferenceNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payment ID</p>
                  <p className="text-gray-900 font-mono text-sm">{order.paymentId}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payment Time</p>
                  <p className="text-gray-900 text-sm">{new Date(order.paymentTime).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Meta Info */}
          <div className="bg-gray-50 border p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Ordered At</p>
                <p className="text-gray-900">{new Date(order.orderedAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">User Cancellation</p>
                <p className="text-gray-900 font-medium">{order.userOrderCancellation ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Vendor Cancellation</p>
                <p className="text-gray-900 font-medium">{order.vendorOrderCancellation ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPopup;