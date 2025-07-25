import React, { useState, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { Camera, Eye, EyeOff, Save, Upload } from "lucide-react";
import { useEffect } from "react";
import { getUserDetails } from "../../Services/operations/GetUserInformation.jsx";
import {
  resetName,
  resetPassword,
  updateDisplayPicture,
  resetMobileNumber
} from "../../Services/operations/resetDeatils";
import toast from "react-hot-toast";

const UserSettings = () => {

  const token = useSelector((state) => state.auth.token);
  const fileInputRef = useRef();
  const [user , setUser] = useState("");
  const [loading , setLoading] = useState(true);
  const[disabled , setDisabled] = useState(false);

  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });


  const [mobileNumber , setMobileNumber] = useState("");

  const [imageState, setImageState] = useState({
    preview: "",
    file: "",
    loading: false,
  });

  useEffect(()=>
  {
      getUserDetails(setUser,token,setLoading );
  },[]);

  useEffect(()=>
  {
    setName((prev)=>
    (
      {...prev,
        ["firstName"] : user?.firstName || "",
        ["lastName"] : user?.lastName || ""
      }
    ))

    setMobileNumber(user?.mobileNumber || "");

  },[user])

  const handleNameChange = (e) => {
    setName((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleMobilenumberChange = (e) =>
  {
    setMobileNumber(e.target.value);
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageState((prev) => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageState((prev) => ({ ...prev, preview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    try {

      setImageState((prev) => ({ ...prev, loading: true }));
      const formData = new FormData();
      formData.append("displayPicture", imageState.file);
      await updateDisplayPicture(token,formData,setUser );
      fileInputRef.current.value = "";

    } catch (error) {

      toast.error("Upload failed.");

    } finally {
      setImageState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    resetName(name.firstName, name.lastName,token,setUser, setDisabled);
  };

  const handleSubmitMobilenumber=(e)=>
  {
      e.preventDefault();
      resetMobileNumber(mobileNumber,token,setUser, setDisabled);
  }

  return (
    <div>
      {
        loading ?
        (
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )
        :
        (
          <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-16 ">
            <h1 className="text-3xl font-normal text-gray-800 mb-12 scale-95 ">User Settings</h1>

            {/* <div className="space-y-8 max-w-4xl mx-auto "> */}
              {/* Profile Image Section */}
              {/* <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Picture</h2>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <img
                      src={imageState?.preview || user?.profileImage}
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Name</h2>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        pattern="^[A-Za-z]*$"
                        title="Only alphabets are allowed."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={disabled}
                  >
                    Save Changes
                  </button>
                </form>
              </div>

              {/* Change Mobile Number */}
              <div className="bg-white shadow-lg rounded-lg p-6 scale-95">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Mobile number</h2>
                <form onSubmit={handleSubmitMobilenumber} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="mobileNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        
                      </label>
                      <input
                        id="mobileNumber"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={handleMobilenumberChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        pattern="^\d{10}$"
                        title="Invalid mobile number."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${disabled ? "opacity-50 cursor-not-allowed" : "" }`}
                    disabled={disabled}
                  >
                    Update mobile number
                  </button>
                </form>
              </div>

            </div>
        )
      }
    </div>
  );
};

export default UserSettings;
