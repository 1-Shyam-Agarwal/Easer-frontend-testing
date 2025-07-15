import dots from '../../../../Images/dots.png';
import realTimeTracker from '../../../../Images/RealTimeTracker.jpg';
import interfacePhoto from '../../../../Images/InterfacePhoto.png';
import printOptions from '../../../../Images/printOptions.jpg';
import price from '../../../../Images/price.jpg';
import SecurePayments from '../../../../Images/SecurePayment.png'


// const BenefitsSection = () => {
//   return (
//     <div className='flex flex-col justify-start items-center mb-[30px] mb-16'>

//       <div className='flex flex-col justify-start items-center'>
//         <h3 className='text-4xl font-semibold text-center p-4'>Why Choose Us?</h3>
//         <p className="p-4 text-center">Our website offers numerous benefits designed to provide a seamless <br/>and convenient printing experience for users</p>
//         <div className='w-[30px] h-[8px] rounded-full bg-[#E0299C]'></div>
//       </div>
      
//       <div className='flex flex-row justify-center max-w-600 gap-[30px]  '>
//       <div className='flex flex-col items-start bg-[#FAFAFA] p-6 mt-10 hover:shadow-lg w-[600px] hover:shadow-grey-300 rounded-[10px] transition-shadow duration-300 '>
//           <img src={realTimeTracker} alt="Unable to Load due to some issue" className='mix-blend-multiply self-center aspect-square max-w-200'/>
//           <h4 className='font-semibold mb-2'>Real-Time Order Tracking</h4>
//           <p>Stay informed with live updates on your order status. You’ll receive notifications once your order is ready, keeping you in the loop every step of the way.</p>        
//         </div>

//         <div className='flex flex-col items-start bg-[#FAFAFA] p-6 mt-10 w-[600px] hover:shadow-lg hover:shadow-green-300 rounded-[10px] transition-shadow duration-300 '>
//           <img src={printOptions} alt="Unable to Load due to some issue" className='mix-blend-multiply mt-12 self-center aspect-[3/2] max-w-200'/>
//           <h4 className='font-semibold mb-2 mt-16' >Customizable Printing Options</h4>
//           <p>Get exactly what you need by specifying details like paper type, color vs. black & white, number of copies, and more. Tailor your order to your preferences with just a few clicks.</p>        
//         </div>
//       </div>

//       <div className='flex flex-row justify-center items-center gap-[10px] flex-wrap'>

//         <div className='flex flex-col  w-[320px] bg-lightOrange rounded-[10px] p-6 gap-[5px] mt-[20px] '>
//           <img src={price} alt="" className='mix-blend-multiply self-center aspect-sqaure w-[200px]'/>
//           <h4 className='font-semibold mb-2'>Affordable and Transparent Pricing</h4>
//           <p>We offer competitive pricing with no hidden fees. Review the cost breakdown before placing your order, ensuring clarity and affordability.</p>        
//         </div>

//         <div className='flex flex-col w-[320px] bg-white rounded-[10px] p-6 gap-[5px] mt-[20px] '>
//           <img src={interfacePhoto} alt="" className='mix-blend-multiply '/>
//           <h4 className='font-semibold mb-2'>User-Friendly Interface</h4>
//           <p>Our website is built with ease of use in mind, ensuring that even first-time users can quickly create an account, upload documents, and place orders without any hassle.</p>        
//         </div>

//         <div className='flex flex-col w-[320px] bg-lightOrange rounded-[10px] h-600  gap-[5px] mt-[20px] '>
//           <img src={SecurePayments} alt="" className='mix-blend-multiply rounded-[10px]  '/>
          
                  
//         </div>

        

//       </div>

//     </div>
//   );
// }

// export default BenefitsSection;


import React from 'react';

const BenefitsSection = () => {
  return (
    <div className="flex flex-col justify-start items-center mt-12 px-4 md:px-6 lg:px-8 mb-8 md:mb-24">
      {/* Header Section */}
      <div className="flex flex-col justify-start items-center mb-12 md:mb-20">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center p-2 md:p-4">
          Why Choose Us?
        </h3>
        <p className="p-2 md:p-4 text-center text-sm md:text-base range-450-768:w-[77%]">
          Our website offers numerous benefits designed to provide a seamless
          <br className="hidden md:block" />
          and convenient printing experience for users
        </p>
        <div className="w-[30px] h-[8px] rounded-full bg-[#E0299C]"></div>
      </div>

      {/* First Row - Two Columns */}
      <div className="flex flex-col items-center range-768-940:items-center range-768-940:flex-col  md:items-stretch md:flex-row lg:flex-row justify-center w-full gap-6 md:gap-8 lg:gap-8">
        <div className="flex flex-col items-center bg-[#FAFAFA] p-8 md:p-10 range-450-768:w-4/5 md:w-6/13 range-768-940:w-4/5 lg:w-2/5 hover:shadow-lg hover:shadow-gray-300 rounded-[10px] transition-shadow duration-300">
          <img 
            src={realTimeTracker}
            alt="Real Time Tracker"
            className="mix-blend-multiply self-center w-32 md:w-48 lg:w-52 aspect-square object-contain"
          />
          <h4 className="font-semibold mb-4 text-center text-lg md:text-xl">Real-Time Order Tracking</h4>
          <p className="text-sm md:text-base text-center">Stay informed with live updates on your order status. You'll receive notifications once your order is ready, keeping you in the loop every step of the way.</p>
        </div>

        <div className="flex flex-col items-center bg-[#FAFAFA] p-8 md:p-10 range-450-768:w-4/5 md:w-6/13 range-768-940:w-4/5 lg:w-2/5 hover:shadow-lg hover:shadow-gray-300 rounded-[10px] transition-shadow duration-300">
          <img 
            src={printOptions}
            alt="Print Options"
            className="mix-blend-multiply self-center w-32 md:w-48 lg:w-52 aspect-square object-contain"
          />
          <h4 className="font-semibold mb-4 text-center text-lg md:text-xl">Customizable Printing Options</h4>
          <p className="text-sm md:text-base text-center">Get exactly what you need by specifying details like paper type, color vs. black & white, number of copies, and more. Tailor your order to your preferences with just a few clicks.</p>
        </div>

        {/* <div className="flex flex-col items-center bg-[#FAFAFA] p-8 md:p-10 range-450-768:w-4/5 md:w-6/13 range-768-940:w-4/5 lg:w-2/5 hover:shadow-lg hover:shadow-gray-300 rounded-[10px] transition-shadow duration-300">
          <img 
            src={printOptions}
            alt="Print Options"
            className="mix-blend-multiply self-center w-32 md:w-48 lg:w-52 aspect-[3/2] object-contain mt-4 md:mt-8"
          />
          <h4 className="font-semibold mb-4 mt-8 text-lg md:text-xl text-center">Customizable Printing Options</h4>
          <p className="text-sm md:text-base text-center"></p>
        </div> */}
      </div>

      {/* Second Row - Three Columns */}
      <div className="flex flex-col md:flex-row  justify-center range-450-767:w-4/5 range-768-940:flex-col range-768-940:w-4/5 items-stretch gap-6 md:gap-6 mt-6 md:mt-8 w-full ">

        <div className="flex flex-col md:w-1/3 bg-blue-50 range-768-940:w-full rounded-[10px] p-8 md:p-8">
          <img 
            src={interfacePhoto}
            alt="Interface"
            className="mix-blend-multiply self-center w-32 md:w-40 aspect-square object-contain"
          />
          <h4 className="font-semibold mb-2 text-lg text-center">User-Friendly Interface</h4>
          <p className="text-sm md:text-base text-center">Our website is built with ease of use in mind, ensuring that even first-time users can quickly create an account, upload documents, and place orders without any hassle.</p>
        </div>

        <div className="flex flex-col w-full md:w-1/3 range-768-940:w-full bg-lightOrange rounded-[10px] p-8 md:p-8">
          <img 
            src={price}
            alt="Price"
            className="mix-blend-multiply self-center w-32 md:w-40 aspect-square object-contain"
          />
          <h4 className="font-semibold mb-2 text-lg text-center">Affordable and Transparent Pricing</h4>
          <p className="text-sm md:text-base text-center">We offer competitive pricing with no hidden fees. Review the cost breakdown before placing your order, ensuring clarity and affordability.</p>
        </div>

        <div className="flex flex-col w-full md:w-1/3 bg-yellow-100 range-768-940:w-full rounded-[10px] p-8 md:p-8">
          <img 
            src={SecurePayments}
            alt="Price"
            className="mix-blend-multiply self-center w-32 md:w-40 aspect-square object-contain"
          />
          <h4 className="font-semibold mb-2 text-lg text-center">Secure Payments</h4>
          <p className="text-sm md:text-base text-center">We use advanced encryption and trusted payment gateways to ensure that every transaction is safe, secure, and hassle-free, so you can place your orders with confidence.</p>
        </div>

      </div>
    </div>
  );
};

export default BenefitsSection;