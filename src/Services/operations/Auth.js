import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiconnect.js';
import { authEndpoints } from '../apis';
import { setToken } from '../../Slices/AuthSlice.js';
import { setUser } from '../../Slices/profileSlice.js';

//<------------------------------------------- GENERAL AUTH HANDLERS ------------------------------------------>

//Resend OTP APIs
const { RESEND_OTP } = authEndpoints;

export async function resendOTP(
  dispatch,
  setSecondaryDisable,
  email,
  setTimer,
  type
) {
  const toastId = toast.loading('Resending the OTP ...');
  dispatch(setSecondaryDisable(true));
  try {
    const response = await apiConnector('POST', RESEND_OTP, {
      email: email,
      type,
    });

    toast.dismiss(toastId);
    toast.success('The OTP has been resent successfully.');
    setTimer(30);
  } catch (error) {
    toast.dismiss(toastId);
    dispatch(setSecondaryDisable(false));
    toast.error(
      error?.response?.data?.message ||
        'Unable to resend OTP.Please try again later.'
    );
  }
}
//<--------------------------------------------------------END---------------------------------------------->

//<-----------------------------------CUSTOM SIGNUP RELATED Handlers-------------------------------->

//Custom signup APIs
const { PRE_CUSTOM_SIGNUP_CHECK_AND_SEND_OTP, VERIFY_OTP_AND_CREATE_ACCOUNT } =
  authEndpoints;

//Handles preCustomSignup Check and also send the signup otp after validation
export function handlePreCustomSignupCheckAndSendOtp(
  email,
  mobileNumber,
  collegeCode,
  setDisable,
  setShowOTPSection,
  dispatch
) {
  //Disabling the submit button
  dispatch(setDisable(true));
  const toastId = toast.loading('Loading...');

  //Making network call
  apiConnector('POST', PRE_CUSTOM_SIGNUP_CHECK_AND_SEND_OTP, {
    email: email,
    collegeCode: collegeCode,
    mobileNumber: mobileNumber,
  })
    .then((data) => {
      toast.success('OTP is sent successfully');

      //Replacing the input fields section with OTP input section
      setShowOTPSection(true);
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message || 'Please try again.');
    })
    .finally(() => {
      toast.dismiss(toastId);

      //Enabling the submit button if network call fails and enable verify button of next OTP field section
      dispatch(setDisable(false));
    });
}

//Handles verification of OTP at signup and also handles creation of account
export async function handleVerifyOtpAndCreateAccount(
  otpValue,
  data,
  setVerifyOTPDisabled,
  navigate,
  dispatch
) {
  //Disabling the verifyOTP button to avoid customer to make multiple calls
  setVerifyOTPDisabled(true);
  const toastId = toast.loading('Verfying...');

  let response;
  try {
    // Make the API call to verify OTP
    response = await apiConnector('POST', VERIFY_OTP_AND_CREATE_ACCOUNT, {
      otp: otpValue,
      email: data?.email,
      collegeCode: data?.collegeCode,
      mobileNumber: data?.mobileNumber,
    });

    //Storing the JWT_Token at the localStorage
    localStorage.setItem('user', JSON.stringify(response?.data?.profileImage));
    localStorage.setItem(
      'token',
      JSON.stringify(response?.data?.easerSecurityTicket)
    );

    //Storing the JWT_Token at the Redux store
    dispatch(setToken(response?.data?.easerSecurityTicket));
    dispatch(setUser(response?.data?.profileImage));

    //Indicating user that you account is created successfully and you are logged in successfully.
    toast.success('Successfully logged in!');

    //Navigating the customer to the easer-inbox for placing the order.
    navigate('/dashboard/easer-outbox');
  } catch (error) {
    //Enabling verifyOTP button for making subsequent requests in case of fails
    setVerifyOTPDisabled(false);
    toast.error(
      error?.response?.data?.message ||
        'Unable to create account. Please try again later.'
    );
  } finally {
    toast.dismiss(toastId);
  }
}

//<---------------------------------------The End ---------------------------------------------------------->

//<------------------------------------SIGNUP THROUGH GOOGLE HANDLERS ----------------------------------------------->

const { PRE_GOOGLE_SIGNUP_CHECK, SAVE_GOOGLE_SIGNUP_DETAILS } = authEndpoints;

//GET REQUEST
//Used for verification of the google token and email (whether it is already registered or not)
export async function handleGooglePreSignupCheck(googleToken) {
  const toastId = toast.loading('Loading...');
  try {
    let url = `${PRE_GOOGLE_SIGNUP_CHECK}/${encodeURIComponent(googleToken)}`;
    const response = await apiConnector('GET', url);

    toast.dismiss(toastId);

    console.log('response.data.userData : ', response.data.userData);

    //This indicates that token is verified successfully
    return response.data.userData;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error?.response?.data?.message || 'Please try again.');

    //This indicates that token is not verified successfully.
    return 0;
  }
}

//Used to save the details gathered via a google signup to the db to create customer account
export async function handleSaveGoogleSignupAllDetails(
  information,
  setGoogleSignupAdditionalDetailsDialogBox,
  navigate,
  dispatch
) {
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector(
      'POST',
      SAVE_GOOGLE_SIGNUP_DETAILS,
      information
    );

    //Storing the JWT_Token at the localStorage
    localStorage.setItem('user', JSON.stringify(response?.data?.profileImage));
    localStorage.setItem(
      'token',
      JSON.stringify(response?.data?.easerSecurityTicket)
    );

    //Storing the JWT_Token at the Redux store
    dispatch(setToken(response?.data?.easerSecurityTicket));
    dispatch(setUser(response?.data?.profileImage));

    //Indicating user that you account is created successfully and you are logged in successfully.
    toast.success('Account created successfully.');

    //Navigating the customer to the easer-inbox for placing the order.
    navigate('/dashboard/easer-outbox');
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        'Unable to create account. Please try again later.'
    );
  } finally {
    toast.dismiss(toastId);
    setGoogleSignupAdditionalDetailsDialogBox(false);
  }
}

//<-------------------------------------------------THE END-------------------------------------------------->

//<------------------------------------------------CUSTOM LOGIN HANDLERS-------------------------------------->

//importing APIs
const {
  PRE_CUSTOM_LOGIN_CHECK_AND_SEND_OTP,
  VERIFY_LOGIN_OTP,
  VERIFY_PASSWORD,
} = authEndpoints;

//Used for checking whether the entered eamil is already registered or not and if user is customer then send otp also.
export async function handlePreCustomLoginChecksAndSendOtp(
  email,
  setDisable,
  setData,
  setWindowSwitch,
  dispatch
) {
  dispatch(setDisable(true));
  const toastId = toast.loading('Loading');

  try {
    const url = `${PRE_CUSTOM_LOGIN_CHECK_AND_SEND_OTP}/${encodeURIComponent(email)}`;
    const response = await apiConnector('GET', url);

    //Switching the window either to OTP section or password section
    setWindowSwitch(true);

    let data;
    if (response?.data?.data?.role) {
      //This indicates that user is admin or vendor
      data = { ...response?.data?.data, email: email };
    } // This means user is customer
    else {
      data = { role: 'customer', email: email };
    }

    setData(data);
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error?.response?.data?.message || 'Please try again later.');
  } finally {
    toast.dismiss(toastId);
    dispatch(setDisable(false));
  }
}

//In case of customer , it is used to verify otp and helps in logging the customer
export async function handleVerifyLoginOtp(
  email,
  otp,
  setVerifyOTPDisabled,
  dispatch,
  navigate
) {
  //Disabling the verifyOTP button to avoid customer to make multiple calls
  setVerifyOTPDisabled(true);
  const toastId = toast.loading('Verfying...');

  let response;
  try {
    // Make the API call to verify OTP
    response = await apiConnector('POST', VERIFY_LOGIN_OTP, {
      otp,
      email,
    });

    //Storing the JWT_Token at the localStorage
    localStorage.setItem('user', JSON.stringify(response?.data?.profileImage));
    localStorage.setItem(
      'token',
      JSON.stringify(response?.data?.easerSecurityTicket)
    );

    //Storing the JWT_Token at the Redux store
    dispatch(setToken(response?.data?.easerSecurityTicket));
    dispatch(setUser(response?.data?.profileImage));

    //Indicating user that you account is created successfully and you are logged in successfully.
    toast.success('Successfully logged in!');

    //Navigating the customer to the easer-inbox for placing the order.
    navigate('/dashboard/easer-outbox');
  } catch (error) {
    //Enabling verifyOTP button for making subsequent requests in case of fails
    setVerifyOTPDisabled(false);
    toast.error(
      error?.response?.data?.message ||
        'Unable to login. Please try again later.'
    );
  } finally {
    toast.dismiss(toastId);
  }
}

//In case of admin and vendor , it is used to verify password and helps in logging the admin/vendor
export async function verifyPasswordHandler(
  email,
  password,
  navigate,
  setDisable,
  dispatch
) {
  dispatch(setDisable(true));
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector('POST', VERIFY_PASSWORD, {
      email,
      password,
    });

    //Storing the JWT_Token at the localStorage
    localStorage.setItem('user', JSON.stringify(response?.data?.profileImage));
    localStorage.setItem(
      'token',
      JSON.stringify(response?.data?.easerSecurityTicket)
    );

    //Storing the JWT_Token at the Redux store
    dispatch(setToken(response?.data?.easerSecurityTicket));
    dispatch(setUser(response?.data?.profileImage));

    //Indicating user that you account is created successfully and you are logged in successfully.
    toast.success('Successfully logged in!');

    //Navigating the customer to the easer-inbox for placing the order.
    navigate('/dashboard/easer-inbox');
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        'Unable to login. Please try again later.'
    );
  } finally {
    toast.dismiss(toastId);
    dispatch(setDisable(false));
  }
}

//<----------------------------------------------THE END----------------------------------------------------->

//<------------------------------------------------GOOGLE LOGIN HANDLERS--------------------------------------

//Importing APIs
const { GOOGLE_PRE_LOGIN_CHECK } = authEndpoints;

//Login with Google : Pre-checks (if user is customer : login otherwise move to admin/vendor password section.)
export async function handleGooglePreLoginCheck(
  googleToken,
  dispatch,
  navigate
) {
  const toastId = toast.loading('Loading...');
  try {
    let url = `${GOOGLE_PRE_LOGIN_CHECK}/${encodeURIComponent(googleToken)}`;
    const response = await apiConnector('GET', url);

    //if easerSecurityTicket is not undefined , this indicates the user is customer.hence login him.
    if (response?.data?.easerSecurityTicket) {
      //Storing the JWT_Token at the localStorage
      localStorage.setItem(
        'user',
        JSON.stringify(response?.data?.profileImage)
      );
      localStorage.setItem(
        'token',
        JSON.stringify(response?.data?.easerSecurityTicket)
      );

      //Storing the JWT_Token at the Redux store
      dispatch(setToken(response?.data?.easerSecurityTicket));
      dispatch(setUser(response?.data?.profileImage));

      //Indicating user that you account is created successfully and you are logged in successfully.
      toast.success('Successfully logged in!');

      //Navigating the customer to the easer-inbox for placing the order.
      navigate('/dashboard/easer-outbox');
    } else {
      return response?.data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Please try again.');
    return undefined;
  } finally {
    toast.dismiss(toastId);
  }
}

//<----------------------------------------------THE END----------------------------------------------------->

const { RESETPASSTOKEN_API, RESETPASSWORD_API } = authEndpoints;

//This function will send the reset password token to the email
export async function getPasswordResetToken(email, setEmailSent, setLoading) {
  setLoading(true);
  try {
    const response = await apiConnector('POST', RESETPASSTOKEN_API, { email });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success('Reset Email Sent');
    setEmailSent(true);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        'Unable to send reset token. Please try again later.'
    );
  } finally {
    setLoading(false);
  }
}

//This function will update the password
//It will take password , confirmPassword , setLoading , token and navigate as parameters
export async function updatePassword(
  password,
  confirmPassword,
  setLoading,
  token,
  navigate
) {
  setLoading(true);
  try {
    const response = await apiConnector('POST', RESETPASSWORD_API, {
      password,
      confirmPassword,
      token,
    });
    toast.success('Password is reset successfully');
    navigate('/', { replace: true });
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        'Unable to reset the password. Please try again later.'
    );
  }
  setLoading(false);
}
