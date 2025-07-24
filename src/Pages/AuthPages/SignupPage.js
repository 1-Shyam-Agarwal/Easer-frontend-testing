import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useGoogleLogin } from "@react-oauth/google";
import GoogleAdditionalDetailsBox from '../../components/UserSignupComponents/GoogleAdditionalDetailsBox.jsx';

import OtpInput from 'react-otp-input';
import "./otpField.css";


import { 
          handlePreCustomSignupCheckAndSendOtp,
          handleVerifyOtpAndCreateAccount,
          handleGooglePreSignupCheck, 
          handleSaveGoogleSignupAllDetails

       } from "../../Services/operations/Auth.js";

import { 
          resendOTP
       } from '../../Services/operations/Auth.js';


import { getRegisteredCollegeList } from '../../Services/operations/GetInformaitonOperations/GeneralGetOperations.js';


import { setPrimaryLoading ,setPrimaryDisable , setSecondaryDisable} from '../../Slices/DisableFunctionality.jsx';





const ErrorMessage = ({children}) => (
  <p className="text-red-500 text-xs mt-1">{children}</p>
);

const SignupPage = () => {


  //<---------------------------------------UseState Variables/ Variables Declaration ----------------------------------->
  //For navigating from one page to another
      const navigate = useNavigate();

  //For dispatching handlers of redux store
      const dispatch = useDispatch();

  //Stores colleges Data
      const [collegeData, setCollegeData] = useState([]);

  //Handles OTP section
      //Stores the otp of the OTP section
      const [otp , setOtp] = useState("");

      //Hanldes the timer of the OTP section
      const [timer , setTimer] = useState(30);

      //Controls the visibiltiy of the OTP section
      const [showOTPSection , setShowOTPSection] = useState(false);
  

  //Handles Google Signup
      //Controls visibility of the googleSignupAdditionalDetailsDialogBox
      const [googleSignupAdditionalDetailsDialogBox,setGoogleSignupAdditionalDetailsDialogBox] = useState(false);

      //Stores the googleSignupData
      const [googleSignupData , setGoogleSignupData] = useState({});
  

  //Handles disabling and enabling of the buttons
      const primaryDisable = useSelector((state)=>(state.disable.primaryDisable));
      const secondaryDisable = useSelector((state)=>(state.disable.secondaryDisable));
    
  //handles Loading of the screen
      const primaryLoading = useSelector((state)=>(state.disable.primaryLoading));



  //<-------------------------------------------------------------------------------------------------------->

  const {register , 
         handleSubmit ,
         watch,
         formState : {errors,isValid},
        }
        = useForm({mode:"onChange"});

  let formData = watch();


  //Get registered Colleges for select field 
  useEffect(() => {

    getRegisteredCollegeList(setCollegeData,setPrimaryLoading)
    .then(()=>
    {
        dispatch(setSecondaryDisable(true));
        dispatch(setPrimaryDisable(false));
    })
    
  }, []);


  //Handles Timer of the OTP section
  useEffect(() => {
    if(showOTPSection)
      if (timer > 0) {
        const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(countdown);
      } else {
        dispatch(setSecondaryDisable(false));
      }
  }, [timer , showOTPSection]);


  //Handling OTP verification and account creaction
  const handleOTP = (e) => {
      e.preventDefault();

      if(otp.length === 6)
      {
        handleVerifyOtpAndCreateAccount(otp, formData, setPrimaryDisable , navigate , dispatch );
      }
      else{
        toast.error("Otp should be of length 6.")
      }
  };

  
  // Signup button : Handles validation of submitted data and sends otp if everything is right
  const SignupSubmit = (data) => {
      
      if(data?.email?.includes(" "))
      {
          toast.error("Email cannot contain spaces.");
          return;
      }

      handlePreCustomSignupCheckAndSendOtp(
            data?.email,
            data?.mobileNumber,
            data?.collegeCode,
            setPrimaryDisable,
            setShowOTPSection,
            dispatch
      )
  };


  //Resend OTP
  function resendOTPHandler()
  {
        resendOTP(dispatch , setSecondaryDisable , formData?.email , setTimer , "signup");
  }


  //Handling google preSignupCheck
  const googleSignup = useGoogleLogin({
    onSuccess: async(response) => {
        const data = await handleGooglePreSignupCheck(response?.access_token);
        console.log(data);
        if(data){
          setGoogleSignupAdditionalDetailsDialogBox(true);
          setGoogleSignupData({googleToken : response?.access_token});
        }
  },
    onError: () => {toast.error("Please try again.")},
  });


  //Handling signup through google
  const saveGoogleSignupAllDetailsHandler = (googleSignupData)=>
  {
      handleSaveGoogleSignupAllDetails(googleSignupData , setGoogleSignupAdditionalDetailsDialogBox , navigate , dispatch);
  }


  return (
    <div>
      {
        primaryLoading ? 
        (
          <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div>Kindly wait for a while...</div>
          </div>
        )
        :
        (
          <div className="flex justify-center mt-[-3rem] items-center min-h-screen bg-gray-100 overflow-y-hidden cursor-default">
            <div className='flex flex-col items-center justify-center h-[100%] w-7/8 md:w-1/2'>
                <div className="flex flex-col items-center justify-center w-[85%]">

                      <div className='mt-[-30px] mb-[2rem]'>
                        <div className="text-2xl font-semibold text-center text-black">
                          <span className="text-black specialCharacter">E</span>aser
                        </div>
                        <div className='text-gray-500'>Making life peaceful and serene</div>
                      </div>
                      
    
    
                    {/* Signup with google */}
                    <button className="w-full bg-gray-800 flex items-center justify-center gap-2 rounded-sm py-3 hover:shadow-lg transition"
                            type="button"
                            onClick={() => googleSignup()}
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"/>
                        <span className="text-white">Sign up with Google</span>
                    </button>

                    <div className='w-full flex gap-2 items-center justify-center mt-4'>
                      <div className='border-t-[1px] border-black w-[40%]'></div>
                      <div className='text-sm'>OR</div>
                      <div className='border-t-[1px] border-black w-[40%]'></div>
                    </div>
    
                    {/* Website Local Signup */}
                    <div className='w-full '>

                       <div>
                        {
                            showOTPSection ? 
                            (

                                //  OTP SECTION 
                                <form className='flex flex-col items-center cursor-default'
                                      onSubmit={handleOTP}>
                                  <div className='flex flex-col items-center'>

                                  <h5 className="mt-8 text-md w-full font-normal text-gray-700 text-center">
                                    OTP has been sent to <span className="text-blue-600 font-semibold"> {watch("email")} </span><br />
                                    <span className="text-sm px-2 text-gray-500">If you didn’t find the OTP, please check your spam.</span>
                                  </h5>


                                    <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span> </span>}
                                    renderInput={(props) => <input {...props} className="otp-input" />}
                                    containerStyle = "otp-container"
                                    />
                            
                                    <button className={` px-6 mt-[-0.25rem] text-white p-3 rounded-[5px] mt-6  ${primaryDisable ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-default hover:bg-blue-700"}`}
                                            disabled={primaryDisable}
                                            type='submit'>
                                      Verify
                                    </button>

                                    <div className='mt-[1rem]'>Didn't receive the code? 
                                      <span className='text-blue-600 hover:text-blue-700'>
                                        {
                                          secondaryDisable ?
                                           <span className='cursor-not-allowed'>&nbsp;  Wait for {timer}s</span>
                                           : 
                                            <button
                                              type='button'
                                              onClick={resendOTPHandler}
                                            >
                                              &nbsp;Resend OTP
                                            </button> 
                                        }
                                      </span> 
                                    </div>
                                </div>
                              </form>
                            )
                            :
                            (

                               //CUSTOM SIGNUP
                                <form className='flex flex-col items-center ' onSubmit={handleSubmit(SignupSubmit)}>
                                     {/* Select college field */}
                                    <div className="relative w-full mt-3" >
                                      <select 
                                        type="text" 
                                        id="collegeName"  
                                        className=" peer block w-full rounded-sm border invalid:text-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                                        required
                                        defaultValue = ""
                                        {...register("collegeCode" , {required : "Required"})}
                                      >
                                          <option value="" disabled>Select College</option>
                                          {collegeData?.map((element) => (
                                            <option key={element?.collegeCode} value={element?.collegeCode}>
                                              {element?.collegeName}
                                            </option>
                                          ))}
                                      </select>
                
                                      <label 
                                          htmlFor="collegeName" 
                                          className="absolute left-4 top-[-0.6rem] bg-white px-1 text-base transition-all opacity-0
                                                peer-placeholder-shown:text-base
                                                peer-focus:opacity-100 
                                                peer-focus:top-[-0.7rem]
                                                peer-focus:opacity-100 
                                                peer-focus:text-sm 
                                                peer-focus:text-blue-600">
                                          College
                                      </label>
                                      {errors.collegeName && <ErrorMessage>{errors.collegeName.message}</ErrorMessage>}
                                    </div>
                                        
                                    {/* Email field */}
                                    <div className="relative w-full mt-4">
                                        <input 
                                          type="email" 
                                          id="email"  
                                          className="peer block w-full rounded-sm border placeholder-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                                          {...register("email" , {
                                            required : "Required",
                                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email" }
                                          }) }
                                          placeholder='Email Address'
                                        />
                                        <label 
                                          htmlFor="email" 
                                          className="absolute left-4 top-[-0.6rem] bg-white px-1 text-base transition-all opacity-0
                                                peer-placeholder-shown:text-base 
                                                peer-focus:top-[-0.7rem] 
                                                peer-focus:opacity-100 
                                                peer-focus:text-sm 
                                                peer-focus:text-blue-600">
                                          Email Address
                                        </label>
                                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                                    </div>
                
                                    {/* Mobile Number Field */}
                                    <div className="relative w-full mt-4">

                                      <input 
                                        type="text" 
                                        id="mobileNumber"  
                                        className="peer block w-full rounded-sm border placeholder-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                                        placeholder='Mobile Number'
                                        {...register("mobileNumber" , {
                                          required : "Required",
                                          pattern :{value:/^[6-9]\d{9}$/ , message:"Invalid Number"}
                                        })}
                                      />

                                      <label 
                                        htmlFor="mobileNumber" 
                                        className="absolute left-4 top-[-0.6rem] bg-white px-1 text-gray-500 text-base transition-all opacity-0
                                              peer-placeholder-shown:text-base 
                                              peer-focus:top-[-0.7rem]
                                              peer-focus:opacity-100 
                                              peer-focus:text-sm 
                                              peer-focus:text-blue-600">
                                        Mobile Number
                                      </label>
                                      {errors.mobileNumber && <ErrorMessage>{errors.mobileNumber.message}</ErrorMessage>}
                                    </div>

                                    {
                                        isValid && 
                                        <button type="submit" className={` ${primaryDisable ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-default hover:bg-blue-700"} text-white p-3 rounded-[5px] mt-6 `}
                                                              disabled={primaryDisable}>
                                         Create Account
                                        </button>
                                    }  

                                    <div className='mt-[1rem]'>Already have an account?&nbsp; 
                                        <span className='text-blue-600 '
                                              onClick={()=>(navigate("/login"))}
                                        >
                                          Login
                                        </span>
                                    </div>
                                </form>
                            )
                        }
                       </div>
                       
                      </div>

                      {/* Terms and Condition Section */}
                      <p className="mt-4 text-sm text-gray-600 text-center">
                          By signing up, you agree to our{" "}
                          <a href="/terms-and-conditions" className="text-blue-600 hover:underline">
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a href="/privacy-policy" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>.
                      </p>

                </div>
                </div>
              </div>
              )
            }

            {/* Dialog box for gathering extra info from the customer */}
            {
                googleSignupAdditionalDetailsDialogBox && <GoogleAdditionalDetailsBox collegeData={collegeData} 
                                                                                      setGoogleSignupData={setGoogleSignupData} 
                                                                                      googleSignupData={googleSignupData} 
                                                                                      saveGoogleSignupAllDetailsHandler={saveGoogleSignupAllDetailsHandler}
                                                          />
            }
          </div>
          
    
  );
};

export default SignupPage;