import React, { useState } from "react";
import toast from "react-hot-toast";
import "./navbar.css"

const Footer = () => {

  const[email , setEmail]=useState("");
  
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contactus" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Refund and Cancellation Policy", href: "/refund-and-cancellation-policy" },
    { name: "Shipping and Delivery Policy", href: "/shipping-and-delivery-policy" },
  ];


  function emailChangeHandler(e)
  {
      const value = e?.target?.value;
      setEmail(value);
  }

  function subscribeHandler(e)
  {
      e.preventDefault();
      if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)))
      {
          toast.error("Invalid email");
      }
      else
      {
          toast.success("We’ll keep you updated about our latest updates and innovations. Stay tuned!");
          toast.success("Welcome to the Easer community! 😊");
          setEmail("");
      }
      
  }

  return (
    <footer className="bg-black text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section with Logo and Social */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center md:flex-row md:justify-between mb-12">

            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center gap-[15px] md:gap-4 group">
                
                <div className="text-2xl tracking-wide font-semibold text-white hover:scal-110">
                  <span className="text-white specialCharacter">E</span>aser
                </div>
              </div>

              <p className="mt-2 text-gray-400 max-w-md text-center">
                Simplifying document printing for students and professionals.
                Secure, fast, and reliable.
              </p>
          </div>
          </div>
        </div>
        

        {/* Main Content Grid */}
        <div className="grid max-640:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-16 py-4 md:justify-items-center md:items-start sm:justify-items-center max-640:justify-items-center max-640:items-center">
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4 max-640:text-center">
              Quick Links
            </h3>
            <ul className="space-y-3 max-640:text-center">
              {quickLinks?.map((link) => (
                <li key={link?.name}>
                  <a
                    href={link?.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4 max-640:text-center">
              Contact Us
            </h3>
            <div className="space-y-3 max-640:text-center">
              <p className="text-gray-400">
                <span className="font-medium text-gray-100">Email:</span>
                <br />
                <a
                  href="mailto:easer.helpdesk.india@gmail.com"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  easer.helpdesk.india@gmail.com
                </a>
              </p>
              <div className="text-gray-400">
                <span className="font-medium text-gray-100">Phone:</span>
                <br />
                <p
                  className="hover:text-blue-400 transition-colors cursor-pointer duration-200"
                >
                  +91 9311161298 
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 sm:col-span-2 justify-items-center items-center">
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4 text-center">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 mb-4 text-center">
              Stay updated with our latest features and releases.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={email}
                onChange={emailChangeHandler}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 whitespace-nowrap"
                onClick={subscribeHandler}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Easer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
