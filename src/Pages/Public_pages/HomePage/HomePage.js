import React from 'react'
import HeroSection from './Components/HeroSection.js'
import StatisticsPanel from './Components/statistisPanel.js'
import BenefitsSection from './Components/BenefitsSection.js'
import HowItWorks from './Components/HowItWorks.js'
import Testimonial from './Components/Testimonial.js'
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const HomePage = () => {

  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state)=>state.auth.role);
  return (
    <div>
      <HeroSection/>
      {/* <StatisticsPanel/> */}
      <HowItWorks/>
      <BenefitsSection/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default HomePage;