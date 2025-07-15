import React from 'react';
import kartik from '../../../../Images/kartikPhoto.png'
import { FaStar } from 'react-icons/fa' // Importing star icon

const Testimonialcards = (props) => {
  return (
    <div className='bg-white w-[85%]  rounded-[10px] absolute top-[200px] left-[18px] p-[10px]' >
        <div className='text-sm'>
        {props.message}

        </div>
        <div className='flex gap-2 my-2 self-start '>
            <FaStar className='text-amber-300 '/>
            <FaStar className='text-amber-300 '/>
            <FaStar className='text-amber-300 '/>
            <FaStar className='text-amber-300 '/>
            <FaStar className='text-amber-300 '/>
        </div>
        <div className='flex gap-2 my-2 items-center'>
            <img src={props.photo} className='w-[50px] h-[50px] rounded-full'/>
            <p>{props.name}</p>
        </div>
    </div>
  )
}

export default Testimonialcards;