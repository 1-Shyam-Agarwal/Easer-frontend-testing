import React, { useState, useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Camera, Eye, EyeOff, Save, Upload } from 'lucide-react';
import { getUserDetails } from '../../Services/operations/GetUserInformation.jsx';
import {
  resetName,
  resetPassword,
  updateDisplayPicture,
  resetMobileNumber,
  resetShopDetails,
  // resetFineDetails,
  // resetWaitingTime
} from '../../Services/operations/resetDeatils';
import ConfirmationModal from '../Core/Auth/GeneralConfirmationWindow';
import { changeShopStatus } from '../../Services/operations/resetDeatils';
import toast from 'react-hot-toast';

const VendorSettings = () => {
  const token = useSelector((state) => state.auth.token);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationWindow, setConfirmationWindow] = useState(false);
  const roomCode = useSelector((state) => state.auth.roomCode);

  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
  });

  const [mobileNumber, setMobileNumber] = useState('');

  const [shopDetails, setShopDetails] = useState({
    shopName: '',
    shopLandmark: '',
  });

  const [fineDetails, setFineDetails] = useState({
    fineRate: '',
    fineEnforcementTime: '',
  });

  const [imageState, setImageState] = useState({
    preview: null,
    file: null,
    loading: false,
  });

  const [waitingTime, setWaitingTime] = useState('');

  useEffect(() => {
    getUserDetails(setUser, token, setLoading);
  }, []);

  useEffect(() => {
    setName(() => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    }));

    setIsShopOpen(
      user?.vendorAdditionalDetails?.isShopOpen === false ||
        user?.vendorAdditionalDetails?.isShopOpen === true
        ? user?.vendorAdditionalDetails?.isShopOpen
        : ''
    );

    setMobileNumber(user?.mobileNumber || '');

    setShopDetails({
      shopLandmark: user?.vendorAdditionalDetails?.shopLandMark || '',
      shopName: user?.vendorAdditionalDetails?.shopName || '',
    });

    setFineDetails({
      fineRate: user?.vendorAdditionalDetails?.fineSchema?.fineRatePerMinute
        ? user?.vendorAdditionalDetails?.fineSchema?.fineRatePerMinute
        : user?.vendorAdditionalDetails?.fineSchema?.fineRatePerMinute === 0
          ? 0
          : '',
      fineEnforcementTime:
        user?.vendorAdditionalDetails?.fineSchema
          ?.fineEnforcementTimeInMinutes || '',
    });

    setWaitingTime(user?.vendorAdditionalDetails?.waitingTime || '');
  }, [user]);

  // const isShopOpenHandler=()=>
  // {
  //   setConfirmationWindow(true);
  // }

  // const agreeController=async()=>
  // {
  //     setConfirmationWindow(false);

  //     if(isShopOpen === true || isShopOpen===false)
  //     {
  //       const response = await dispatch(changeShopStatus(token));
  //       if(response){setIsShopOpen(!isShopOpen);}

  //     }
  //     else
  //     {
  //         toast.error("Please reload the page.Then try again.");
  //     }
  // }

  // const disagreeController=()=>
  // {
  //    setConfirmationWindow(false);
  // }

  const handleNameChange = (e) => {
    setName((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handlePasswordChange = (e) => {
  //   setPassword((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleMobilenumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  // const handleShopChange =(e)=>
  // {
  //     setShopDetails((prev)=>
  //     (
  //       {
  //         ...prev ,
  //         [e.target.name]:e.target.value
  //       }
  //     ))
  // }

  // const handleFineChange =(e)=>
  // {
  //     setFineDetails((prev)=>
  //     {
  //       return {
  //         ...prev,
  //         [e.target.name]:e.target.value
  //       }
  //     })
  // }

  // const handleWaitingTimeChange = (e)=>
  // {
  //     setWaitingTime(e.target.value);
  // }

  // const handleImageSelect = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageState((prev) => ({ ...prev, file }));
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageState((prev) => ({ ...prev, preview: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleImageUpload = async () => {
  //   try {

  //     setImageState((prev) => ({ ...prev, loading: true }));
  //     const formData = new FormData();
  //     formData.append("displayPicture", imageState.file);
  //     await updateDisplayPicture(token,formData,setUser);
  //     fileInputRef.current.value = "";

  //   } catch (error) {



  //   } finally {
  //     setImageState((prev) => ({ ...prev, loading: false }));
  //   }
  // };

  const handleSubmitName = (e) => {
    e.preventDefault();
    resetName(name.firstName, name.lastName, token, setUser, setDisabled);
  };

  // const handleSubmitPassword = (e) => {
  //   e.preventDefault();

  //   if(password.newPassword.length<8)
  //   {
  //       toast.error("New password must be atleast 8 characters long.");
  //       return;
  //   }

  //   if(password.newPassword.includes(" "))
  //   {
  //       toast.error("New password should not contain spaces.");
  //       return;
  //   }

  //   resetPassword(password?.currentPassword, password?.newPassword, token);
  // };

  const handleSubmitMobilenumber = (e) => {
    e.preventDefault();
    resetMobileNumber(mobileNumber, token, setUser, setDisabled);
  };

  // const handleSubmitShop=(e)=>
  // {
  //     e.preventDefault();
  //     resetShopDetails(shopDetails?.shopName,shopDetails?.shopLandmark , token);
  // }

  // const handleSubmitFine=(e)=>
  // {
  //     e.preventDefault();
  //     dispatch(resetFineDetails(fineDetails?.fineRate , fineDetails?.fineEnforcementTime , token));
  // }

  // const handleSubmitWaitingTime = (e)=>
  // {
  //     e.preventDefault();
  //     dispatch(resetWaitingTime(waitingTime , token));
  // }

  return (
    <div>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-16 ">
          <h1 className="text-3xl font-normal text-gray-800 mb-12 scale-95 ">
            User Settings
          </h1>

          <div className="space-y-8 max-w-4xl mx-auto ">
            {/* Profile Image Section */}
            {/* <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Picture</h2>
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                      <img
                        src={imageState.preview || user?.profileImage}
                        alt={`${user?.firstName} ${user?.lastName}`}
                        className="h-28 w-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
                      />
                      <button
                        className={`absolute bottom-0 right-0 p-2 ${imageState.loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-pointer hover:bg-blue-700"} text-white rounded-full `}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={imageState.loading}
                      >
                        <Camera className={`h-5 w-5`} />
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      className="hidden"
                      accept="image/png, image/gif, image/jpeg"
                    />
                    {imageState.file && (
                      <button
                        onClick={handleImageUpload}
                        disabled={imageState.loading}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {imageState.loading ? "Uploading..." : "Upload"}
                      </button>
                    )}
                  </div>
                </div> */}

            {/* Name Form Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Name
              </h2>
              <form onSubmit={handleSubmitName} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={name?.firstName}
                      onChange={handleNameChange}
                      className="w-full px-3 py-2 border capitalize border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      pattern="^[A-Za-z]+$"
                      title="Only alphabets are allowed."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={name?.lastName}
                      onChange={handleNameChange}
                      className={`w-full px-3 py-2 border capitalize border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                      pattern="^[A-Za-z]*$"
                      title="Only alphabets are allowed."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
                  disabled={disabled}
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* Shop Section */}
            {/* <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Shop Details</h2>
                  <form onSubmit={handleSubmitShop} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="shopName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Shop Name
                        </label>
                        <input
                          id="shopName"
                          name="shopName"
                          value={shopDetails?.shopName}
                          onChange={handleShopChange}
                          className="w-full px-3 py-2 border capitalize border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="shopLandmark"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Shop Landmark
                        </label>
                        <input
                          id="shopLandmark"
                          name="shopLandmark"
                          value={shopDetails?.shopLandmark}
                          onChange={handleShopChange}
                          className="w-full px-3 py-2 capitalize border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Update Shop Details
                    </button>
                  </form>
                </div> */}

            {/* Fine Form Section */}
            {/* <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fine Details</h2>
                  <form onSubmit={handleSubmitFine} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="fineRate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fine Rate <span className="text-[10px] text-gray-600">(Per Minute in ₹)</span>
                        </label>
                        <input
                          id="fineRate"
                          name="fineRate"
                          value={fineDetails?.fineRate}
                          onChange={handleFineChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          pattern="^([0-9]\d*)$"
                          title="Fine rate should be a number and should be equal to or greater than zero."
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="fineEnforcementTime"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fine Enforcement Time <span className="text-[10px] text-gray-600">(In Minutes)</span>
                        </label>
                        <input
                          id="fineEnforcementTime"
                          name="fineEnforcementTime"
                          value={fineDetails?.fineEnforcementTime}
                          onChange={handleFineChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          pattern="^(1\d|[2-9]\d+)$"
                          title="It should be a number and must have a minimum value of 10."
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Update Fine Details
                    </button>
                  </form>
                </div> */}

            {/* Waiting Time Form Section */}
            {/* <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Waiting Time</h2>
                  <form onSubmit={handleSubmitWaitingTime} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="waitingTime"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Waiting Time <span className="text-[10px] text-gray-600">(In Minutes)</span>
                        </label>
                        <input
                          id="waitingTime"
                          name="waitingTime"
                          value={waitingTime}
                          onChange={handleWaitingTimeChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          pattern="^(1\d|[2-9]\d+)$"
                          title="It should be a number and must have a minimum value of 10."
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Update Waiting Time
                    </button>
                  </form>
                </div>
   */}
            {/* Change Mobile Number */}
            <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Mobile number
              </h2>
              <form onSubmit={handleSubmitMobilenumber} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-medium text-gray-700"
                    ></label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      value={mobileNumber}
                      onChange={handleMobilenumberChange}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                      pattern="^\d{10}$"
                      title="Invalid mobile number."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
                  disabled={disabled}
                >
                  Update mobile number
                </button>
              </form>
            </div>

            {/* Password Form Section */}
            {/* <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
                  <form onSubmit={handleSubmitPassword} className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="currentPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            id="currentPassword"
                            name="currentPassword"
                            type={showPasswords?.current ? "text" : "password"}
                            value={password?.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() =>
                              setShowPasswords((prev) => ({ ...prev, current: !prev?.current }))
                            }
                          >
                            {showPasswords?.current ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>
  
                      <div className="space-y-2">
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            id="newPassword"
                            name="newPassword"
                            type={showPasswords?.new ? "text" : "password"}
                            value={password?.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() =>
                              setShowPasswords((prev) => ({ ...prev, new: !prev?.new }))
                            }
                          >
                            {showPasswords?.new ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Update Password
                    </button>
                  </form>
                </div> */}
          </div>

          {/* Change shop status */}
          {/* <div className="max-w-4xl mx-auto mt-12 text-center px-4">
                <div className={`${isShopOpen ? "bg-red-100" : "bg-green-100"} rounded-[5px] p-8`}>

                  <p className="text-gray-600 mb-4 font-medium">
                    {
                      isShopOpen ? "Click below button to close the shop." : "Click below button to open the shop."
                    }
                  </p>

                  <button type="button" 
                          className={`px-4 py-2 text-sm font-medium text-white ${isShopOpen ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"} rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200`}
                          onClick={isShopOpenHandler}
                    >
                  {isShopOpen ? "Close Shop" : "Open Shop"}
                  </button>

                </div>
              </div> */}
        </div>
      )}
      {/* {
      confirmationWindow && 
      <ConfirmationModal 
                agreeText = "Yes" 
                disagreeText="Go Back"
                heading="Final Confirmation"
                description={`Are you sure you want to ${isShopOpen ? "close" : "open"} the shop ?`}
                agreeController={agreeController}
                disagreeController={disagreeController} />
    } */}
    </div>
  );
};

export default VendorSettings;
