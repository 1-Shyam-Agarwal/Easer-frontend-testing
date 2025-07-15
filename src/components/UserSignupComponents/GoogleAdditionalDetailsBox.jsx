import React from 'react'
import { googleSignup } from '../../Services/operations/Auth';
import { useDispatch } from 'react-redux';

const GoogleAdditionalDetailsBox = ({collegeData , setGoogleSignupData , googleSignupData , saveGoogleSignupAllDetailsHandler}) => {

  const dispatch = useDispatch();
  return (
    <div className='fixed inset-0 bg-black/20 backdrop-blur-[5px] z-[2000] flex justify-center items-center'>
        <form className='max-870:w-[70%]  max-640:w-[90%] w-1/2 bg-gray-800 rounded-[5px] max-480:p-4 p-8 flex flex-col items-center'
              onSubmit={
                (e)=>
                {
                    e.preventDefault();
                    saveGoogleSignupAllDetailsHandler(googleSignupData);
                }
              }>

            <div className='mb-[0.5rem] flex flex-col items-center'>
                <div className="text-2xl font-semibold text-center text-white">
                <span className="text-white specialCharacter">E</span>aser
                </div>
            </div>

            <div className='text-gray-200 mb-[4px] text-[12px] sm:text-[14px]'>Please fill to complete signup process.</div>
            <div class="relative w-full mt-3">
                
                <select 
                type="text" 
                id="collegeCode"  
                class=" peer block w-full rounded-sm border invalid:text-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                required
                value={setGoogleSignupData?.collegeCode}
                onChange={(e)=>(setGoogleSignupData((prev)=>(
                    {
                        ...prev,
                        ["collegeCode"] : e.target.value
                    }
                )))}
                >
                    <option value="" disabled selected>Select College</option>
                    {collegeData?.map((element) => (
                    <option key={element?.collegeCode} value={element?.collegeCode}>
                        {element?.collegeName}
                    </option>
                    ))}
                </select>

                <label 
                    htmlFor="collegeCode" 
                    class="absolute left-4 top-[-0.6rem] bg-white px-1 text-base transition-all opacity-0
                        peer-placeholder-shown:text-base
                        peer-focus:opacity-100 
                        peer-focus:top-[-0.7rem]
                        peer-focus:opacity-100 
                        peer-focus:text-sm 
                        peer-focus:text-blue-600">
                    College
                </label>
            </div>

            {/* Mobile Number Field */}
            <div class="relative w-full mt-4">

                <input 
                type="text" 
                id="mobileNum"  
                class="peer block w-full rounded-sm border placeholder-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                placeholder='Mobile Number'
                required
                pattern="^[6-9]\d{9}$"
                title="Enter a valid indian mobile number."
                value={googleSignupData?.mobileNumber}
                onChange={(e)=>
                {
                    setGoogleSignupData((prev)=>(
                        {
                            ...prev,
                            ["mobileNumber"]  :e.target.value
                        }
                    ))
                }
                }
                />

                <label 
                htmlFor="mobileNum" 
                class="absolute left-4 top-[-0.6rem] bg-white px-1 text-gray-500 text-base transition-all opacity-0
                        peer-placeholder-shown:text-base 
                        peer-focus:top-[-0.7rem]
                        peer-focus:opacity-100 
                        peer-focus:text-sm 
                        peer-focus:text-blue-600">
                Mobile Number
                </label>
            </div>

            <button className='p-2 px-6 mt-4 rounded-sm bg-white hover:bg-gray-400'>
                Submit
            </button>
        </form>

    </div>
  )
}

export default GoogleAdditionalDetailsBox