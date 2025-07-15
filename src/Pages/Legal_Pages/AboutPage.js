import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import creatorImage from '../../Images/shyam.png';
import { IoLogoLinkedin } from "react-icons/io5";
import Footer from "../Public_pages/HomePage/Components/Footer.js"

const About = () => {
  return (
    <div>
      <div className="min-h-screen bg-white from-gray-50 to-white py-16 px-6 flex flex-col items-center">
        {/* Hero Section */}
        <motion.div
          className="bg-white shadow-lg rounded-[4px] border-b-4 border-blue-500 flex flex-col items-center w-full md:w-4/5 lg:w-3/4 p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Image Section */}
          <motion.div
            className=" w-full flex justify-center  mb-6 "
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src={creatorImage}
              alt="Shyam Agarwal"
              className="w-36 h-36 object-cover rounded-full shadow-xl border-4 border-blue-500"
            />
          </motion.div>

          {/* Text Section */}
          <div className=" flex flex-col  items-center text-center">
            <motion.h2
              className="text-3xl font-semibold text-gray-900 mb-2"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Shyam Agarwal
            </motion.h2>
            <motion.p
              className="text-gray-700 text-base mb-4 italic "
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              B.Tech in Information Technology 
            </motion.p>

            <motion.p
              className="text-center"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
            <Link to='https://www.linkedin.com/in/shyam-agarwal-926521273/' target="_blank" rel="noopener noreferrer" className="text-blue-500 text-[30px] "><IoLogoLinkedin /></Link>
            </motion.p>

            
            <motion.p
              className="text-gray-600 mt-4 text-center"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              I have always been passionate about solving real-life problems using technology. During Practical Exams, I experienced how frustrating the process of printing documents can be. This inspired me to build a platform that simplifies document printing for students.
            </motion.p>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="w-full md:w-4/5 lg:w-3/4 mt-12 space-y-8">

          {/* What we do*/}
          <motion.div
            className="bg-white p-6 shadow-lg rounded-[4px] border-l-4 border-blue-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What we do</h3>
            <p className="text-gray-700 leading-relaxed">
            Easer is an online printing platform designed to help students, educators, and professionals place printing orders remotely. Whether it's assignments, reports, or official documents, users can upload, customize, and get their documents printed without physically visiting a shop and get notification when it is done.
            </p>
          </motion.div> 

          {/* Vision Section */}
          <motion.div
            className="bg-white p-6 shadow-lg rounded-[4px] border-l-4 border-blue-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              We aim to transform the document printing experience for students and professionals. Our vision is to make the printing process easy and effortless, ensuring that users can handle all their printing needs remotely without stress.
            </p>
          </motion.div>

          {/* Goal Section */}
          <motion.div
            className="bg-white p-6 shadow-lg rounded-[4px] border-l-4 border-blue-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Goal</h3>
            <p className="text-gray-700 leading-relaxed">
              Our goal is to create a seamless printing platform that allows students to focus more on their studies and less on logistical hassles. We believe that by reducing hassles and simplifying the process, we can make a real difference in the daily lives of students and professionals.
            </p>
          </motion.div>

          {/* Future Plans Section */}
          <motion.div
            className="bg-white p-6 shadow-lg rounded-[4px] border-l-4 border-blue-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Future Plans</h3>
            <p className="text-gray-700 leading-relaxed">
              While our current focus is on serving students in schools , colleges and universities. we have plans to expand our services to larger institutions in the future. We are also developing a mobile app that will make the process even more convenient, allowing users to place and track their orders on the go.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-8">
            Join us on this journey to make printing more accessible!
          </h3>
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-8 py-3 rounded-[4px] hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      <Footer/>
    </div>
  );
};

export default About;
