import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from '../../Data/navlinks.js';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropDown from '../ProfileComponents/ProfileDropDown.jsx';
import { Menu, X } from 'lucide-react';
import { MdPerson, MdList, MdWarning, MdDelete, MdHistory, MdSchool } from 'react-icons/md';
import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';
import { IoMdPersonAdd } from "react-icons/io";
import { BsFillBuildingsFill } from "react-icons/bs";
import krishna_footprints from "../../Images/krishna_footprints.png";
import "./navbar.css";
import { getRole } from '../../Services/operations/GetUserInformation.jsx';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector(state=> state.user.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);

  // Navigation structures for different roles remain the same as in your code
  const userNavigation = [
      { 
        to: '/dashboard/my-profile', 
        icon: <MdPerson />, 
        label: 'My Profile',
        type: 'single'
      },
      { 
        to: '/dashboard/college-shops', 
        icon: <MdSchool />, 
        label: 'College Shops',
        type: 'single'
      },

          { to: '/dashboard/ongoing-orders', icon: <MdSchool />, label: 'Ongoing Orders' },
          { to: '/dashboard/unreceived-orders', icon: <MdWarning />, label: 'Unreceived Orders' },
          { to: '/dashboard/cancelled-orders', icon: <MdDelete />, label: 'Cancelled Orders' },
          { to: '/dashboard/order-history', icon: <MdHistory />, label: 'Order History' },
      ,
      { 
        to: '/dashboard/place-order', 
        icon: <MdList />, 
        label: 'Place Order',
        type: 'single'
      },
    ];
  
    const vendorNavigation = [
      { 
        to: '/dashboard/my-profile', 
        icon: <MdPerson />, 
        label: 'View Profile',
        type: 'single'
      },
      { 
        to: '/dashboard/college-shops', 
        icon: <MdSchool />, 
        label: 'College Shops',
        type: 'single'
      },
      {
        label: 'Orders',
        icon: <MdList />,
        type: 'category',
        items: [
          { to: '/dashboard/ongoing-orders', icon: <MdSchool />, label: 'Ongoing Orders' },
          { to: '/dashboard/unreceived-orders', icon: <MdWarning />, label: 'Unreceived Orders' },
          { to: '/dashboard/cancelled-orders', icon: <MdDelete />, label: 'Cancelled Orders' },
          { to: '/dashboard/order-history', icon: <MdHistory />, label: 'Order History' },
        ]
      },
    ];
  
    const adminNavigation = [
      { 
        to: '/dashboard/add-college', 
        icon: <BsFillBuildingsFill />, 
        label: 'Add College',
        type: 'single'
      },
      { 
        to: '/dashboard/add-vendor', 
        icon: <IoMdPersonAdd />, 
        label: 'Add Vendor',
        type: 'single'
      },
    ];

  // Helper function to get navigation items based on user role
  const getNavigationItems = (token,role) => {
    if (!token) return [];
    switch (role) {
      case 'user':
        return userNavigation;
      case 'vendor':
        return vendorNavigation;
      case 'admin':
        return adminNavigation;
      default:
        return [];
    }
  };

  function matchRoute(route) {
    return matchPath({path:route}, location.pathname);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Render navigation items recursively
  const renderNavItems = (items) => {
    return items.map((item, index) => {
      if (item.type === 'category') {
        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 font-medium pl-4">
              {item.icon}
              {item.label}
            </div>
            <div className="pl-8 space-y-2">
              {item.items.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  to={subItem.to}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {subItem.icon}
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        );
      }
      return (
        <Link
          key={index}
          to={item.to}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          {item.icon}
          {item.label}
        </Link>
      );
    });
  };

  return (
    <nav className={`bg-white w-full backdrop-blur-sm bg-white/90 sticky top-0 z-50 transition-all duration-300 ${token ? "border-b border-gray-200" : "shadow-sm"}`}>
      <div className="flex mx-[20px] max-w-maxContent mx-auto justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-[15px] md:gap-4 group max-1100:gap-3 max-870:gap-2">
          <img src={krishna_footprints} alt="Easer" className="w-10 h-10 max-1100:w-8 max-1100:h-8 max-870:w-6 max-870:h-6 transition-transform group-hover:scale-110"/>
          <div className="text-xl max-1100:text-lg max-870:text-base font-semibold text-black ">
            <span className="text-black specialCharacter">E</span>aser
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 max-1100:gap-6 max-870:gap-5">
          {location.pathname.split("/")[1] !== "dashboard" && 
            NavLinks.map((entry, index) => (
              <Link 
                to={entry?.path} 
                className={`${
                  matchRoute(entry?.path) 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-600'
                } hover:text-blue-500 transition-colors max-1100:text-[0.85rem] max-1100:py-[0.5rem] max-870:text-[0.8rem] relative group py-2`} 
                key={index}
              >
                {entry.title}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform ${
                  matchRoute(entry?.path) ? 'scale-x-100' : ''
                }`}></span>
              </Link>
            ))
          }
        </div>

        {/* Desktop Auth Buttons and Mobile Controls */}
        <div className="flex items-center gap-4">
          {/* Profile Dropdown - Visible on all screen sizes */}
          {token!==null && <ProfileDropDown image={user}/>}
          
          {/* Desktop Auth Buttons */}
          {token === null && (
            <div className="hidden md:flex items-center gap-4 max-1100:gap-3">
              <Link 
                to="/signup/user" 
                className="px-6 py-2 text-blue-600 hover:text-blue-700 max-1100:text-[0.85rem] max-1100:py-2 max-1100:px-4 max-870:text-[0.8rem] font-medium transition-colors"
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="px-6 py-2 bg-blue-600 text-white rounded-full 0 max-1100:text-[0.85rem] max-1100:py-2 max-1100:px-4 hover:bg-blue-700 font-medium transition-colors shadow-sm hover:shadow-md"
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg md:hidden animate-fadeIn">
          <div className="flex flex-col p-4 space-y-2 text-[13px]">
            {/* Role-based Navigation Items */}
            {token && (
              <div className="space-y-2 font-md border-b border-gray-100 pb-2">
                {renderNavItems(getNavigationItems(token,role))}
              </div>
            )}

            {/* General Navigation Links */}
            {location.pathname.split("/")[1] !== "dashboard" && 
              NavLinks.map((entry, index) => (
                <Link 
                  to={entry?.path} 
                  className={`${
                    matchRoute(entry?.path) 
                      ? 'text-blue-600' 
                      : 'text-gray-600'
                  } hover:text-blue-500 transition-colors text-[13px]`} 
                  key={index}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {entry.title}
                </Link>
              ))
            }

            {/* Mobile Auth Buttons */}
            {token === null && (
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <Link 
                  to="/signup/user" 
                  className="w-full px-6 py-3 text-blue-600 hover:text-blue-700 font-medium text-center border border-blue-600 rounded-full transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link 
                  to="/login" 
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-medium text-center transition-colors shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;