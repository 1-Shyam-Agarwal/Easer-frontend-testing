// import React, { useState } from 'react';
// // import { getCollegeList } from '../Services/operations/CollegeApi.jsx';
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { FaStarOfLife } from "react-icons/fa6";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
// import {FaEye, FaEyeSlash } from "react-icons/fa";
// import { validatingVendorInfo } from '../Services/operations/Auth.js';
// import VendorPriceForm from '../components/VendorSignup/VendorPriceForm.jsx';
// import PriceSchemaCard from '../components/VendorSignup/PriceSchemaCard.jsx';
// import { Plus } from 'lucide-react';
// import PriceSchemaHeader from '../components/VendorSignup/PriceSchemaHeader.jsx';
// import toast from 'react-hot-toast';
// import OTPPage from './OTPPage.js';
// import { CheckCircle } from 'lucide-react';


// const ApplicationReviewMessage = () => {
//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-[4px] shadow-lg max-w-xl mx-auto mt-[9rem] text-center animate-fade-in">
//       <div className="flex flex-col items-center space-y-4">
//         <div className="bg-blue-200 rounded-full p-3 shadow-inner">
//           <CheckCircle className="text-blue-600 w-8 h-8" />
//         </div>
//         <h2 className="text-2xl font-normal text-blue-900">Thank you for showing interest.</h2>
//         <p className="text-base text-blue-800">
//            Your application is currently under review.
//         </p>
//         <p className="text-base text-blue-800">
//           You'll receive updates via <span className="font-semibold">email</span> or <span className="font-semibold">phone</span> within <span className="font-semibold">2 days</span>.
//         </p>
//         <p className="text-base text-blue-800">
//           We might contact you for further verification. Please stay tuned!
//         </p>
//       </div>
//     </div>
//   );
// };



// const VendorSignup = ()=>
// {

//     const [collegeData, setCollegeData] = useState([]);

//     const [priceSchema , setPriceSchema] = useState([]); 
//     const [singlePriceScheme , setSinglePriceScheme] = useState(null);

//     const [showPassword, setShowPassword] = useState(false);

//     const [showPriceModel , setShowPriceModel] = useState(false);

//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const [createAccountEnabled , setCreateAccountEnabled] = useState(true);
//     const [showSignupPage , setShowSignupPage] = useState(true);
//     const [showOTPPage , setShowOTPPage] = useState(true);
//     const [loading , setLoading] =useState(false);
//     const vendorData = useSelector((state)=>state.account.account)

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const location = useLocation();

//     const plan =  location.pathname.split("/").pop();
//     if(!["Free%20Trial","1-Month%20Plan","6-Month%20Plan","12-Month%20Plan"].includes(plan))
//     {
//         navigate("/pricing");
//     }


//     const { register, handleSubmit, reset,formState: { errors ,isSubmitSuccessful}, watch } = useForm({
//         defaultValues: {
//           role:"vendor",
//           firstName: "",
//           lastName: "",
//           email: "",
//           mobileNumber: "",
//           collegeCode: "",
//           password: "",
//           confirmPassword: "",
//           shopName : "",
//           shopLandMark : "",
//           fineEnforcementTimeInMinutes :10,
//           fineRatePerMinute:0,
//           // waitingTime : 10,
//           // merchantId : "",
//           // saltKey:""
//         }
//       });

      

//     // useEffect(() => {
  
//     //   const fetchCollegeData = async () => {
//     //     try {
//     //       dispatch(getCollegeList(setCollegeData , setLoading));
//     //     } catch (error) {
//     //       console.error("Error fetching data:", error);
//     //     }
//     //   };
//     //   fetchCollegeData();
//     // }, []);

//     function onSubmit(data)
//     {
//       if(data.password.includes(" "))
//       {
//           toast.error("Password must not contain any spaces.");
//           return;
//       }
//       if(priceSchema?.length<=0)
//       {
//           toast.error("Please add price schema");
//           return;
//       }
//       const finalData={...data , "priceSchema" : priceSchema};
//        dispatch(validatingVendorInfo(finalData,dispatch,navigate,setCreateAccountEnabled,setLoading,setShowSignupPage));
//     }

//     function addPriceHandler()
//     {
//         setShowPriceModel(true);
//     }

//     function deleteHandler(idx)
//     {
//         let temp = [...priceSchema];
//         temp?.splice(idx,1);
//         setPriceSchema(temp);
//     }

//     function editHandler(idx)
//     {
        
//         setSinglePriceScheme({...priceSchema[idx] , "idx":idx});
//         setShowPriceModel(true);
//         toast.success("edit successfully");
//     }

//       const ErrorMessage = ({ message }) => (
//         <p className="text-red-500 text-xs mt-1">{message}</p>
//       );


//       return (
//         <div>
//           {
//               loading ?
//               (
//                 <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
//                   <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                   <div>Kindly wait for a while...</div>
//                 </div>
//               )
//               :
//               (
//                   showSignupPage ? 
//                   (
//                       <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 flex flex-col item-center">
//                         <div className="text-center mb-12">
//                           <h1 className="text-3xl font-normal text-gray-900 mb-4"> Vendor Signup</h1>
                          
//                           <p className="text-gray-600 max-w-2xl mx-auto mb-4">
//                             Elevate Your Business to New Heights
//                           </p>
//                           <div className="w-18 h-1 bg-blue-500 mx-auto rounded-full "></div>
//                         </div>
              
//                         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
              
//                           <div className="p-4">
//                             <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
//                               {/* Basic Details Section */}
//                               <section className="space-y-6">
              
//                                 <h3 className="text-lg font-normal text-blue-700 border-gray-700 border-b py-2 ">Basic Details</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
//                                   {/* firstName */}
//                                   <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='firstName'>
//                                       First Name  <sup><FaStarOfLife className="text-red-600 text-[5px] inline"/></sup>
//                                     </label>
//                                     <input
//                                       {...register("firstName", { 
//                                         required: "First name is required",
//                                         minLength: { value: 2, message: "First name must be between 2 and 20 characters long." },
//                                         maxLength: { value:20 ,message: "First name must be between 2 and 20 characters long." },
//                                         pattern: { 
//                                           value: /^[A-Za-z]+$/,
//                                           message: "First Name must contain alphabetic characters only."
//                                         }
//                                       })}
//                                       id = "firstName"
//                                       className={`w-full px-4 py-2 rounded-md border ${errors?.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter First Name"
//                                     />
//                                     {errors?.firstName && <ErrorMessage message={errors?.firstName?.message} />}
//                                   </div>
                  
//                                   {/* lastName */}
//                                   <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='lastName'>
//                                       Last Name
//                                     </label>
//                                     <input
//                                       {...register("lastName", { 
//                                         maxLength: { value: 20, message: "Last name must be no more than 20 characters long." },
//                                         pattern: { 
//                                           value: /^[A-Za-z]*$/,
//                                           message: "Last Name must contain alphabetic characters only."
//                                         }
//                                       })}
//                                       className={`w-full px-4 py-2 rounded-md border ${errors?.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter Last Name"
//                                       id="lastName"
//                                     />
//                                     {errors?.lastName && <ErrorMessage message={errors?.lastName?.message} />}
//                                   </div>
                  
//                                   {/* email */}
//                                   <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='email'>
//                                       Email <sup><FaStarOfLife className="text-red-600 text-[5px] inline"/></sup>
//                                     </label>
//                                     <input
//                                       type="email"
//                                       id="email"
//                                       {...register("email", { 
//                                         required: "Email is required",
//                                         pattern: { 
//                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                           message: "Invalid Email Format."
//                                         }
//                                       })}
//                                       className={`w-full px-4 py-2 rounded-md border ${errors?.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter Email"
//                                     />
//                                     {errors?.email && <ErrorMessage message={errors?.email?.message} />}
//                                   </div>
                                      
//                                   {/* mobileNumber */}
//                                   <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='mobileNumber'>
//                                       Mobile Number <sup><FaStarOfLife className="text-red-600 text-[5px] inline"/></sup>
//                                     </label>
              
//                                     <input
//                                       type="number"
//                                       id="mobileNumber"
//                                       className={`w-full px-4 py-2 rounded-md border ${errors?.mobileNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter Mobile Number"
//                                       {...register("mobileNumber", { 
//                                         valueAsNumber: true,
//                                         required: "Mobile number is required",
//                                         validate: (value) =>
//                                             value.toString().length === 10 || "Invalid mobile number"
//                                       })}
                                      
//                                     />
//                                     {errors?.mobileNumber && <ErrorMessage message={errors?.mobileNumber?.message} />}
//                                     {
//                                       location?.pathname?.split('/')?.[2] === 'vendor' && (
//                                         <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
//                                             <p className="text-sm text-gray-700">
//                                             <span className='font-normal'>Please enter your number correctly so that our team can contact and assist you in future</span>
//                                             </p>
//                                         </div>
//                                       )
//                                     }
//                                   </div>
                                      
//                                   {/* select College */}
//                                   <div className="space-y-2 md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='collegeCode'>
//                                       Select Your College <span className="text-red-500">*</span>
//                                     </label>
//                                     <select
//                                       {...register("collegeCode", { required: "Please select your college" })}
//                                       className={`w-full px-4 py-2 rounded-md border ${errors?.collegeCode ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       id="collegeCode"
//                                     >
//                                       <option value="">Select college</option>
//                                       {collegeData?.map((element) => (
//                                         <option key={element?.collegeCode} value={element?.collegeCode}>
//                                           {element?.collegeName}
//                                         </option>
//                                       ))}
//                                     </select>
//                                   </div>
//                                   {errors?.collegeCode && <ErrorMessage message={errors?.collegeCode?.message} />}
              
//                                   {location?.pathname?.split('/')?.[2] === 'vendor' && (
//                                     <div className=" p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
//                                       <p className="text-sm text-gray-700">
//                                         Can't find your college?{' '}
//                                         <NavLink to="/add-college-form"
//                                           className="text-blue-600 font-medium underline hover:text-blue-800 transition duration-200"
//                                         >
//                                           Click here
//                                         </NavLink>
//                                       </p>
//                                     </div>
//                                   )}
//                                 </div>
//                               </section>
                  
//                               {/* Shop Details Section */}
//                               <section className="space-y-6 ">
//                                 <h3 className="text-lg font-normal text-blue-700 border-gray-700 border-b pb-2  mt-[50px]">Shop Details</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
//                                   <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor="shopName">
//                                       Shop Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                       {...register("shopName", { required: "Shop name is required" })}
//                                       className={`w-full px-4 py-2 rounded-md border ${errors?.shopName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter shop name"
//                                       id="shopName"
//                                     />
//                                     {errors?.shopName && <ErrorMessage message={errors?.shopName?.message} />}
//                                   </div>
                  
//                                   <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='shopLandMark'>
//                                       Shop Landmark <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                       {...register("shopLandMark", { required: "Shop Landmark is required" })}
//                                       className={`w-full px-4 py-2 rounded-md border ${errors?.shopLandMark ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter shop landmark"
//                                       id="shopLandMark"
//                                     />
//                                     {errors?.shopLandMark && <ErrorMessage message={errors?.shopLandMark?.message} />}
//                                   </div>
//                                 </div>
//                               </section>
                  
//                               {/* Price Schema Section */}
//                               <section className="space-y-6">
//                                 <h3 className="text-lg font-normal text-blue-700 border-gray-700 mt-[50px] border-b pb-2">Price Schema (All in INR)</h3>
//                                 <div className='h-[30px] bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer group rounded-[3px] border border-gray-200 text-gray-600 hover:text-blue-600'
//                                     onClick={addPriceHandler}>
//                                   <Plus className='w-[14px] h-[14px] text-gray-500 group-hover:text-blue-500 transition-colors'/>
//                                   <div className='text-xs font-medium group-hover:text-blue-600'>Click to add Price Structure</div>
//                                 </div>
              
//                                 <div>
//                                   {
//                                     priceSchema?.length>0 && (
//                                       <PriceSchemaHeader/>
//                                     )
//                                   }
              
//                                   {
//                                     priceSchema?.map((schema,idx)=>
//                                     {
//                                         return(
//                                           <PriceSchemaCard
//                                               key={idx}
//                                               idx={idx}
//                                               colour={schema?.colour}
//                                               printingMethod={schema?.printingMethod}
//                                               rangeType={schema?.rangeType}
//                                               aboveValue={schema?.aboveValue}
//                                               startingRange={schema?.startingRange}
//                                               endingRange={schema?.endingRange}
//                                               pricingMethod={schema?.pricingMethod}
//                                               price={schema?.price}
//                                               deleteHandler={deleteHandler}
//                                               editHandler = {editHandler}
//                                           />
//                                         );
//                                     })
//                                   }
//                                 </div>
//                                 <div className=" p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
//                                     <p className="text-sm text-gray-700">
//                                     In the case of a range, the endpoints will be included.
//                                     </p>
//                                   </div>
//                               </section>
                  
//                               {/* Fine Details Section */}
//                               <section className="space-y-6">
//                                 <h3 className="text-lg font-normal text-blue-700 border-gray-700 mt-[50px] border-b pb-2">Fine Details</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='fineEnforcementTimeInMinutes'>
//                                       Fine Enforcement Time (in minutes) <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                       type="number"
//                                       step="any"
//                                       id="fineEnforcementTimeInMinutes"
//                                       {...register("fineEnforcementTimeInMinutes" , {required : "Required",
//                                         valueAsNumber: true,
//                                         min : {value : 10 , message : "Value should be greater or equal to 10"}
//                                       })}
//                                       className=  {`w-full px-4 py-2 rounded-md border ${errors?.fineEnforcementTimeInMinutes ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter the fine enforcement time"
//                                     />
//                                     {errors?.fineEnforcementTimeInMinutes && <ErrorMessage message={errors?.fineEnforcementTimeInMinutes?.message} />}
//                                   </div>
                  
//                                   <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='fineRatePerMinute'>
//                                       Fine Rate (per minute) <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                       type="number"
//                                       step="any"
//                                       id="fineRatePerMinute"
//                                       {...register("fineRatePerMinute" , {required : "Required",
//                                         valueAsNumber: true,
//                                         min : {value : 0 , message : "Value should be greater or equal to Zero"}
//                                       })}
//                                       className=  {`w-full px-4 py-2 rounded-md border ${errors?.fineRatePerMinute ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter the fine rate"
//                                     />
//                                     {errors?.fineRatePerMinute && <ErrorMessage message={errors?.fineRatePerMinute?.message} />}
//                                   </div>
//                                 </div>
//                                 {location?.pathname?.split('/')?.[2] === 'vendor' && (
//                                     <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
//                                       <p className="text-sm text-gray-700">
//                                       If you do not want to charge a fine to the user, set the fine rate to 0 and assign any value to the fine enforcement time greater than or equal to 10 .
//                                       </p>
//                                     </div>
//                                   )}
//                               </section>
              
//                               {/* Payment Gateway Details Section */}
//                               {/* <section className="space-y-6">
//                                 <h3 className="text-lg font-normal text-blue-700 border-gray-700 mt-[50px] border-b pb-2">Payment Gateway Details ( Accept only Cashfree issued credentials )</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='merchantId'>
//                                       x-client-id <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                       id="merchantId"
//                                       {...register("merchantId" , {required : "Required"})}
//                                       className=  {`w-full px-4 py-2 rounded-md border ${errors?.merchantId ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter x-client-id"
//                                     />
//                                     {errors?.merchantId && <ErrorMessage message={errors?.merchantId?.message} />}
//                                 </div>
                  
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='saltKey'>
//                                       x-client-secret
//                                      <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                       id="saltKey"
//                                       {...register("saltKey" , {required : "Required"})}
//                                       className=  {`w-full px-4 py-2 rounded-md border ${errors?.saltKey ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter x-client-secret"
//                                     />
//                                     {errors?.saltKey && <ErrorMessage message={errors?.saltKey?.message} />}
//                                 </div>
              
//                               </div>
//                               {location?.pathname?.split('/')[2] === 'vendor' && (
//                                     <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
//                                       <p className="text-sm text-gray-700">
//                                         Please ensure that you carefully specify the x-client-id and x-client-secret. Failure to do so will prevent you from receiving payments from users, and these details cannot be updated in the future. Only Cashfree's x-client-id and x-client-secret is allowed.
//                                       </p>
//                                     </div>
//                                 )}
//                               </section> */}
              
//                               {/* Fine Details Section */}
//                               {/* <section className="space-y-6">
//                                 <h3 className="text-lg font-normal text-blue-700 border-gray-700 mt-[50px] border-b pb-2">Waiting Details</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700"
//                                           htmlFor='waitingTime'>
//                                       Minimum Waiting Time for Offline Students (In minutes) <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                       type="number"
//                                       id="waitingTime"
//                                       step="any"
//                                       {...register("waitingTime" , {
//                                         required : "Required",
//                                         min: { value: 10, message: "Value should be atleast 10" },
//                                         valueAsNumber:true
//                                       })}
//                                       className=  {`w-full px-4 py-2 rounded-md border ${errors?.waitingTime ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                                       placeholder="Enter waiting time"
//                                     />
//                                     {errors?.waitingTime && <ErrorMessage message={errors?.waitingTime?.message} />}
//                                 </div>
              
//                                 </div>
//                               </section> */}
              
              
//                               {/* Password Details */}
//                               <section className="space-y-6">
//                                 <h3 className="text-lg font-normal text-blue-700 border-gray-700 mt-[50px] border-b pb-2">Password</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 w-full">
//                                   <div className="flex flex-col">
//                                     <label 
//                                       className="text-sm font-semibold p-[4px]"
//                                       htmlFor="password"
//                                     >
//                                       Create Password <sup><FaStarOfLife className="text-red-600 text-[5px] inline"/></sup>
//                                     </label>
//                                     <div className="flex flex-row justify-center items-center gap-[10px] w-full">
//                                       <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         className={`p-2 px-4 rounded-md border ${errors?.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 w-full`}
//                                         placeholder="Create Password"
//                                         id="password"
//                                         {...register("password", {
//                                           required: "Password is required",
//                                           minLength: { value: 8, message: "Password must have at least 8 characters" },
//                                         })}
//                                       />
//                                       <button
//                                         type="button"
//                                         className="text-gray-600 text-[20px] flex-shrink-0"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                       >
//                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                       </button>
//                                     </div>
//                                     {errors?.password && <ErrorMessage message={errors?.password?.message} />}
//                                   </div>
                    
//                                   {/* Confirm Password */}
//                                   <div className="flex flex-col">
//                                     <label 
//                                       className="text-sm font-semibold p-[4px]"
//                                       htmlFor="confirmPassword"
//                                     >
//                                       Confirm Password <sup><FaStarOfLife className="text-red-600 text-[5px] inline"/></sup>
//                                     </label>
//                                     <div className="flex flex-row justify-center items-center gap-[10px] w-full">
//                                       <input
//                                         type={showConfirmPassword ? 'text' : 'password'}
//                                         className={`p-2 px-4 rounded-md border ${errors?.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 w-full`}
//                                         placeholder="Confirm Password"
//                                         id="confirmPassword"
//                                         {...register("confirmPassword", {
//                                           required: "Please confirm your password",
//                                           validate: value => value === watch('password') || "Confirm Password is not matching"
//                                         })}
//                                       />
//                                       <button
//                                         type="button"
//                                         className="text-gray-600 text-[20px] flex-shrink-0"
//                                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                       >
//                                         {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                                       </button>
//                                     </div>
//                                     {errors?.confirmPassword && <ErrorMessage message={errors?.confirmPassword?.message} />}
//                                   </div>
//                                 </div>
//                               </section>
      
//                               <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
//                                     <p className="text-sm text-gray-700">
//                                       Password must be atleast 8 characters long.
//                                     </p>
//                               </div>
      
//                               <p className="text-sm text-gray-600 text-center">
//                                 By signing up, you agree to our{" "}
//                                 <a href="/terms-and-conditions" className="text-blue-600 hover:underline">
//                                   Terms & Conditions
//                                 </a>{" "}
//                                 and{" "}
//                                 <a href="/privacy-policy" className="text-blue-600 hover:underline">
//                                   Privacy Policy
//                                 </a>.
//                               </p>
      
              
              
//                               {/* Create Button */}
//                               <div className='flex justify-center items-center'>
//                                 <button 
//                                   className={` mt-2 px-4 py-[14px] mb-4 ${createAccountEnabled ? "bg-blue-500 cursor-pointer hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed hover:bg-gray-400"} text-white rounded-md transition duration-300 `}
//                                   disabled = {!createAccountEnabled}
//                                   type="submit"
//                                 >
//                                   Create Account
//                                 </button>
//                               </div>
                              
//                             </form>
//                           </div>
//                         </div>
//                         {
//                             showPriceModel && <VendorPriceForm 
//                             setShowPriceModel={setShowPriceModel}
//                             priceSchema={priceSchema}
//                             setPriceSchema={setPriceSchema}
//                             singlePriceScheme={singlePriceScheme}
//                             setSinglePriceScheme = {setSinglePriceScheme}
//                             />
//                         }
//                       </div>
//                   )
//                   :
//                   (
//                     showOTPPage ?
//                     (
//                         <OTPPage  setShowOTPPage={setShowOTPPage} />
//                     )
//                     :
//                     (
//                         <ApplicationReviewMessage/>
//                     )
//                   )
//               )
//             }
//         </div>
        
//       );
    

// }

// export default VendorSignup;