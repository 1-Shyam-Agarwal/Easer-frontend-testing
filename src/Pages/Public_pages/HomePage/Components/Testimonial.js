import React from 'react'
import { FaStar } from 'react-icons/fa';
import kartik from '../../../../Images/kartikPhoto.png';
import prachi from '../../../../Images/prachi.png';
import naman from '../../../../Images/naman.png';
import palak from '../../../../Images/palak.jpg';
import Testimonialcards from './testimonialcards';

// const Testimonial = () => {
//   return (
//     <div className='flex flex-row gap-18 max-w-full mt-30 gap-30 ml-[20px]'>
//         {/* Text part of the testimonial */}
//         <div className='w-[35%]' >
//           <h2 className="font-bold text-3xl p-2">Don't just take our word for it  Hear what our satisfied customers have to say!</h2>
//           <p className='p-2'>Trusted by students , teachers and professors alike – find out how our service has transformed the way they handle their printing tasks</p>
//         </div >

//         {/* Image Part of the testimonial */}
//         <div className="w-[65%] flex flex-row gap-6"> 
//           {/* First column */}
//           <div className="w-[45%] flex flex-col justify-start items-center"> 
//             {/* First testimonial */}
//             <div className="w-[85%] h-[25rem] mb-8 rounded-[10px] relative" 
//                  style={{ backgroundImage: `url(${kartik})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//               <div className="absolute inset-0 bg-black opacity-40 rounded-[10px]"></div> {/* Fade overlay */}
//               <Testimonialcards 
//                   message="As a college student, I always have last-minute print jobs, and this service has been a lifesaver."
//                   photo={kartik}
//                   name="Kartik Gupta"
//               />
//             </div>

//             {/* Second testimonial */}
//             <div className="w-[85%] h-[25rem] mb-8 rounded-[10px] relative" 
//                  style={{ backgroundImage: `url(${prachi})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//               <div className="absolute inset-0 bg-black opacity-40 rounded-[10px]"></div> {/* Fade overlay */}
//               <Testimonialcards 
//                   message="This service saved me time and effort during my Practical exams!"
//                   photo={prachi}
//                   name="Prachi Agarwal"
//               />
//             </div>
//           </div>

//           {/* Second column */}
//           <div className="w-[45%] flex flex-col justify-start items-center mt-16"> 
//             {/* Third testimonial */}
//             <div className="w-[85%] h-[25rem] mb-8 rounded-[10px] relative" 
//                  style={{ backgroundImage: `url(${naman})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//               <div className="absolute inset-0 bg-black opacity-40 rounded-[10px]"></div> {/* Fade overlay */}
//               <Testimonialcards 
//                   message="I was impressed with the quick turnaround time! My prints were ready in no time, and the quality exceeded my expectations."
//                   photo={naman}
//                   name="Naman Jain"
//               />
//             </div>

//             {/* Fourth testimonial */}
//             <div className="w-[85%] h-[25rem] mb-8 rounded-[10px] relative" 
//                  style={{ backgroundImage: `url(${palak})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//               <div className="absolute inset-0 bg-black opacity-40 rounded-[10px]"></div> {/* Fade overlay */}
//               <Testimonialcards 
//                   message="I love how easy it is to place an order online!"
//                   photo={palak}
//                   name="Palak Chaurasia"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// }

// export default Testimonial;




const TestimonialCard = ({ message, photo, name }) => (
  <div className="relative w-[85%] h-96 rounded-lg mb-8">
    <div 
      className="absolute inset-0 rounded-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div className="absolute inset-0 bg-black/40 rounded-lg" />
    </div>
    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-3">
      <p className="text-sm">{message}</p>
      <div className="flex gap-2 my-2">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-amber-300" />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <img src={photo} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <p className="font-medium">{name}</p>
      </div>
    </div>
  </div>
);

const Testimonial = () => {
  const testimonials = [
    {
      message: "As a college student, I always have last-minute print jobs, and this service has been a lifesaver.",
      photo: kartik,
      name: "Kartik Gupta"
    },
    {
      message: "This service saved me time and effort during my Practical exams!",
      photo: prachi,
      name: "Prachi Agarwal"
    },
    {
      message: "I was impressed with the quick turnaround time! My prints were ready in no time, and the quality exceeded my expectations.",
      photo: naman,
      name: "Naman Jain"
    },
    {
      message: "I love how easy it is to place an order online!",
      photo: palak,
      name: "Palak Chaurasia"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center max-w-full bg-[#FAFAFA] py-[40px] mt-8 px-6 ">
      <div className="lg:w-2/5 md:w-4/5 flex flex-col md:items-center lg:self-start mb:8 md:mb-8">
        <h2 className="font-semibold text-3xl mb-4 text-center lg:text-start">
          Don't just take our word for it - Hear what our satisfied customers have to say!
        </h2>
        <p className="text-gray-600 text-center lg:text-start">
          Trusted by students, teachers and professors alike – find out how our service has transformed the way they handle their printing tasks
        </p>
      </div>

      <div className="md:w-4/5 lg:w-3/5 range-480-640:w-4/5 sm:w-3/5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <TestimonialCard {...testimonials[0]} />
            <TestimonialCard {...testimonials[1]} />
          </div>
          <div className="flex flex-col items-center mt-0 md:mt-16">
            <TestimonialCard {...testimonials[2]} />
            <TestimonialCard {...testimonials[3]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;