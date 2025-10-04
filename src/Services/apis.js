const BASE_URL = 'http://135.235.137.235:5000/api/v1';
//https://easer-official-backend-production.up.railway.app/api/v1
//https://easer-2-0-backend.onrender.com/api/v1

// AUTH ENDPOINTS
export const authEndpoints = {
  PRE_CUSTOM_SIGNUP_CHECK_AND_SEND_OTP:
    BASE_URL + '/auth/custom/pre-signup-check-and-send-otp',
  VERIFY_OTP_AND_CREATE_ACCOUNT:
    BASE_URL + '/auth/otp-verify-and-create-account',

  RESEND_OTP: BASE_URL + '/auth/resend-otp',
  VERIFY_LOGIN_OTP: BASE_URL + '/auth/verify-login-otp',
  VERIFY_PASSWORD: BASE_URL + '/auth/verify-login-password',

  PRE_GOOGLE_SIGNUP_CHECK: BASE_URL + '/auth/pre-google-signup-check',
  PRE_CUSTOM_LOGIN_CHECK_AND_SEND_OTP:
  BASE_URL + '/auth/custom/pre-login-checks-and-send-otp',
  SAVE_GOOGLE_SIGNUP_DETAILS: BASE_URL + '/auth/save-google-signup-details',

  GOOGLE_PRE_LOGIN_CHECK: BASE_URL + '/auth/google/pre-login-checks',
  RESETPASSTOKEN_API: BASE_URL + '/reset-password-token',
  RESETPASSWORD_API: BASE_URL + '/reset-password',

  TOKEN_VALIDATION_API : BASE_URL + '/validate-token',

  LOGOUT_API : BASE_URL + '/logout'
};

export const getInTouchEndpoints = {
  GET_IN_TOUCH_API: BASE_URL + '/get-in-touch',
};

export const collegeDetailsEndpoints = {
  GET_ALL_COLLEGE_DETAILS: BASE_URL + '/get-all-colleges',
};

export const getVendorEndpoints = {
  GET_FILTERED_VENDORS: BASE_URL + '/get-filtered-vendors',
  GET_FILTERED_VENDORS_WITH_MINIMUM_DETAILS:
    BASE_URL + '/get-filtered-vendors-with-minimum-details',
  GET_VENDOR_REQUESTS: BASE_URL + '/get-vendor-requests',
};

export const outboxOrdersEndpoints = {
  CREATE_OUTBOX_MAIL: BASE_URL + '/create-outbox-mail',
  FETCH_OUTBOX_MAIL_FOR_CUSTOMER: BASE_URL + '/fetch-customer-mails',
  FETCH_INBOX_MAIL_FOR_VENDOR: BASE_URL + '/fetch-vendor-mails',
  FETCH_FILTERED_MAILS_BY_FILE_NAME:
    BASE_URL + '/fetch-filtered-mails-by-filename',
  FETCH_SPECIFIC_MAIL_DETAILS: BASE_URL + '/fetch-specific-mail-details',
  FETCH_FILTERED_MAILS_BY_CUSTOMER_NAME:
    BASE_URL + '/fetch-filtered-mails-by-customer-name',
};

export const printOrderVendorEndpoints = {
  VALIDATE_PRINT_ORDER_VENDOR: BASE_URL + '/validate-print-order-vendor',
  VALIDATE_FILE_FORMAT_AND_SIZE_AND_UPLOAD:
    BASE_URL + '/validate-file-format-and-size-and-upload',
  GET_VENDOR_PRICE_DETAILS_AND_FINAL_AMOUNT:
    BASE_URL + '/get-all-vendor-price-details-and-final-amount',
  VALIDATE_ORDER: BASE_URL + '/validate-order',
  CREATE_ORDER: BASE_URL + '/create-order',
  CREATE_PG_ORDER: BASE_URL + '/create-pg-order',
  VERIFY_PAYMENT: BASE_URL + '/verify-payment',
  DELETE_DOCUMENT: BASE_URL + '/delete-document',
  CANCEL_DOCUMENT: BASE_URL + '/cancel-document',
};

export const resetEndpoints = {
  VALIDATE_AND_UPDATE_NAME: BASE_URL + '/validate-and-update-name',
  VALIDATE_AND_UPDATE_PASSWORD: BASE_URL + '/validate-and-update-password',
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + '/reset-profile-image',
  UPDATE_MOBILE_NUMBER: BASE_URL + '/update-mobile-number',
  UPDATE_SHOP_DETAILS: BASE_URL + '/update-shop-details',
  UPDATE_FINE_DETAILS: BASE_URL + '/update-fine-details',
  UPDATE_WAITING_TIME: BASE_URL + '/update-waiting-time',
  ALTER_SHOP_STATUS: BASE_URL + '/change-shop-status',
  ALTER_REFUND_STATUS: BASE_URL + '/alter-refund-status',
};

export const getOrdersEndpoints = {
  GET_VENDOR_ORDERS: BASE_URL + '/get-all-orders-of_vendor',
  GET_ALL_CANCELLED_ORDERS: BASE_URL + '/get-all-cancelled-orders',
  GET_ALL_SPECIFIC_USER_ONGOING_ORDERS:
    BASE_URL + '/get_all_specific_user_on_going_orders',
  GET_SPECIFIC_ONLINE_ORDER: BASE_URL + '/get-specific-online-order',
  GET_ALL_SPECIFIC_UNRECEIVED_ORDERS:
    BASE_URL + '/get-all-specific-unreceived-orders',
  GET_SPECIFIC_ORDER_HISTORY: BASE_URL + '/fetch-order-history',
  GET_SPECIFIC_UNRECEIVED_ORDER : BASE_URL + '/fetch-unreceived-order'
};

export const cancellationEndpoints = {
  SET_CANCELLATION_INDICATORS: BASE_URL + '/set-cancellation-indicators',
  DESET_CANCELLATION_INDICATORS: BASE_URL + '/deset-cancellation-indicators',
  ORDER_CANCELLATION: BASE_URL + '/order-cancellation',
};

export const orderOperationsEndpoints = {
  SET_NOTIFY_CUSTOMER_INDICATOR: BASE_URL + '/set-notify-customer-indicator',
  SEND_MESSAGE_TO_CUSTOMER: BASE_URL + '/send-message-to-customer',
  SET_PROCESS_ORDER_INDICATOR: BASE_URL + '/set-process-order-indicator',
  DESET_PROCESS_ORDER_INDICATOR: BASE_URL + '/deset-process-indicator',
  COMPLETE_USER_ORDER: BASE_URL + '/complete-user-order',
  GET_TIME_ESTIMATE_AND_ORDERS_COUNT : BASE_URL + '/get-time-estimate-and-orders-count',
  RECEIVE_USER_ORDER: BASE_URL + '/create-order-history',
  VALIDATE_ORDER_AND_GENERATE_PRICE : BASE_URL + '/validate-order-and-generate-price',
  ONGOING_ORDER_COUNT : BASE_URL + '/get-order-count'
};

export const getUserInformationEndpoints = {
  GET_USER_DETAILS: BASE_URL + '/get-user-information',
  GET_USER_ROLE: BASE_URL + '/get-user-role',
  GET_SHOP_STATUS: BASE_URL + '/get-shop-status',
  GET_USER_ID: BASE_URL + '/get-user-id',
  GET_ROOMS_FOR_USER: BASE_URL + '/get-rooms-for-users',
  GET_SHOP_INFORMATION: BASE_URL + '/get-shop-information',
};

export const NotificationEndpoints = {
  STORE_FCM_TOKEN : BASE_URL + '/store-fcm-token'
}
