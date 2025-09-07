import React, { useState, useEffect } from 'react';
import NavLinks from '../../../../Data/Navlinks.js';
import { useLocation, matchPath, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropDown from '../../../../components/ProfileComponents/ProfileDropDown.jsx';
import { Menu, X } from 'lucide-react';
import { MdHistory, MdInbox, MdPayment } from 'react-icons/md';
import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillBuildingsFill } from 'react-icons/bs';
import krishna_footprints from '../../../../Assets/Images/krishna_footprints.webp';
import './navbar.css';
import { FaDroplet } from 'react-icons/fa6';
import { MdPrint, MdSend } from 'react-icons/md';
import { MdDelete , MdWarning , MdSchool , MdList } from 'react-icons/md';

const Navbar = ({ setShowInkletInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    const handleBodyScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px'; // Prevent layout shift
      } else {
        // Use requestAnimationFrame to avoid ResizeObserver conflicts
        requestAnimationFrame(() => {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        });
      }
    };

    handleBodyScroll();
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMenuOpen]);

  // Navigation structures for different roles remain the same as in your code
   const userNavigation = [
      {
        to: '/dashboard/easer-outbox',
        icon: <MdSend />, // Represents "sent" or "outbox"
        label: 'Outbox',
        type: 'single',
      },
  
      {
        label: 'Remote Prints',
        icon: <MdList />,
        type: 'category',
        items: [
          {
            to: '/dashboard/ongoing-orders',
            icon: <MdSchool />,
            label: 'Place & Track Orders',
          },
          {
            to: '/dashboard/unreceived-orders',
            icon: <MdWarning />,
            label: 'Unreceived Orders',
          },
          {
            to: '/dashboard/cancelled-refunds-orders',
            icon: <MdDelete />,
            label: 'Cancelled & Refunds',
          },
          {
            to: '/dashboard/order-history',
            icon: <MdHistory />,
            label: 'Order History',
          },
        ],
      },
  
      {
        to: '/dashboard/print-summary',
        icon: <MdPrint />, // Represents cloud-based or remote printing
        label: 'Summary',
        type: 'single',
      },
  
      {
        to: '/dashboard/college-shops',
        icon: <MdPrint />, // Represents cloud-based or remote printing
        label: 'Campus Shops',
        type: 'single',
      },
    ];
  
    const vendorNavigation = [
      {
        to: '/dashboard/easer-inbox',
        icon: <MdInbox />,
        label: 'Inbox',
        type: 'single',
      },
  
      {
        label: 'Remote Prints',
        icon: <MdList />,
        type: 'category',
        items: [
          {
            to: '/dashboard/vendor/ongoing-orders',
            icon: <MdSchool />,
            label: 'Ongoing Orders',
          },
          {
            to: '/dashboard/unreceived-orders',
            icon: <MdWarning />,
            label: 'Unreceived Orders',
          },
          {
            to: '/dashboard/cancelled-refunds-orders',
            icon: <MdDelete />,
            label: 'Cancelled & Refunds',
          },
          {
            to: '/dashboard/order-history',
            icon: <MdHistory />,
            label: 'Order History',
          },
        ],
      },
  
      {
        to: '/dashboard/print-summary',
        icon: <MdPrint />, // Represents cloud-based or remote printing
        label: 'Summary',
        type: 'single',
      },
  
      {
        to: '/dashboard/college-shops',
        icon: <MdPrint />, // Represents cloud-based or remote printing
        label: 'Campus Shops',
        type: 'single',
      },
    ];

  const adminNavigation = [
    {
      to: '/dashboard/add-college',
      icon: <BsFillBuildingsFill />,
      label: 'Add College',
      type: 'single',
    },
    {
      to: '/dashboard/add-vendor',
      icon: <IoMdPersonAdd />,
      label: 'Add Vendor',
      type: 'single',
    },
  ];

  // Helper function to get navigation items based on user role
  const getNavigationItems = (token, role) => {
    if (!token) return [];
    switch (role) {
      case 'customer':
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
    return matchPath({ path: route }, location.pathname);
  }

  const toggleMenu = () => {
    // Use requestAnimationFrame to prevent ResizeObserver conflicts
    requestAnimationFrame(() => {
      setIsMenuOpen(!isMenuOpen);
    });
  };

  // Render navigation items recursively
  const renderNavItems = (items) => {
    return items?.map((item, index) => {
      if (item?.type === 'category') {
        return (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-3 text-white font-medium pl-2">
              <span className="text-lg">{item?.icon}</span>
              <span className="text-base">{item?.label}</span>
            </div>
            <div className="pl-8 space-y-3">
              {item.items.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  to={subItem.to}
                  className="flex items-center gap-3 text-white hover:text-blue-500 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{subItem.icon}</span>
                  <span className="text-base">{subItem.label}</span>
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
          className={`flex items-center gap-4 text-base py-3 px-2 rounded-lg transition-all duration-200 ${
            matchRoute(item.to) 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-white hover:text-blue-500 hover:bg-gray-50'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      );
    });
  };

  return (
    <>
      <nav
        className={`bg-white py-1 w-full backdrop-blur-sm bg-white/90 sticky top-0 z-100 transition-all duration-300 ${token ? 'border-b border-gray-200' : 'shadow-sm'}`}
      >
        <div className="flex mx-[20px] max-w-maxContent mx-auto justify-between items-center py-2">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-[15px] md:gap-4 group max-870:ml-[1.2rem] max-1100:gap-3 max-870:gap-2 mx-[1.5rem]"
          >
            <img
              src={krishna_footprints}
              alt="Easer"
              className="w-10 h-10 max-1100:w-8 max-1100:h-8 max-870:w-6 max-870:h-6 transition-transform group-hover:scale-110"
            />
            <div className="text-xl max-1100:text-lg max-870:text-base font-semibold text-black ">
              <span className="text-black specialCharacter">E</span>aser
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 max-1100:gap-6 max-870:gap-[1.2rem]">
            {location.pathname?.split('/')[1] !== 'dashboard' &&
              NavLinks?.map((entry, index) => (
                <Link
                  to={entry?.path}
                  className={`${
                    matchRoute(entry?.path) ? 'text-blue-600' : 'text-gray-600'
                  } hover:text-blue-500 transition-colors max-1100:text-[0.85rem] max-1100:py-[0.5rem] max-870:text-[0.8rem] relative group py-2`}
                  key={index}
                >
                  {entry?.title}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform ${
                      matchRoute(entry?.path) ? 'scale-x-100' : ''
                    }`}
                  ></span>
                </Link>
              ))}
          </div>

          {/* Desktop Auth Buttons and Mobile Controls */}
          <div className="flex items-center gap-4 mx-[1.5rem]">
            {/* Profile Dropdown - Visible on all screen sizes */}
            {token !== null && (

                <ProfileDropDown image={user} />
            )}

            {/* Desktop Auth Buttons */}
            {token === null && (
              <div className="hidden md:flex items-center gap-4 max-1100:gap-3 max-870:gap-0">
                <Link
                  to="/signup/user"
                  className="px-6 py-2 text-blue-600 hover:text-blue-700 max-1100:text-[0.85rem] max-1100:py-2 max-1100:px-4 max-870:text-[0.8rem] font-medium transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-2 mr-[1.5rem] max-870:mr-[1.2rem] bg-blue-600 text-white rounded-full 0 max-870:text-[0.8rem] max-870:px-4 max-870:py-2 max-1100:text-[0.85rem] max-1100:py-2 max-1100:px-4 hover:bg-blue-700 font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className={`absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-[#000033] opacity-[0.9] shadow-xl transform transition-transform duration-300 ease-in-out will-change-transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link
                to="/"
                className="flex items-center gap-3 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={krishna_footprints}
                  alt="Easer"
                  className="w-8 h-8 transition-transform group-hover:scale-110"
                />
                <div className="text-lg font-semibold text-white">
                  <span className="specialCharacter text-white">E</span>aser
                </div>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex-1 p-4 space-y-4">
                {/* User Info Section (if logged in) */}
                {token && user && (
                  <div className="pb-4 border-b border-gray-200">
                    {/* Inklets for customer */}
                    {role === 'customer' && (
                      <div
                        className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-700 cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => {
                          setShowInkletInfo(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        <FaDroplet className="text-sm" />
                        <span className="text-sm font-medium">10 Inklets</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Role-based Navigation Items */}
                {token && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
                      Navigation
                    </h3>
                    {renderNavItems(getNavigationItems(token, role))}
                  </div>
                )}

                {/* General Navigation Links */}
                {location.pathname?.split('/')[1] !== 'dashboard' && NavLinks?.length > 0 && (
                  <div className="space-y-2">
                    {NavLinks?.map((entry, index) => (
                      <Link
                        to={entry?.path}
                        className={`flex items-center gap-3 text-base py-3 px-2 rounded-lg transition-all duration-200 ${
                          matchRoute(entry?.path)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-white hover:text-blue-500 hover:bg-gray-50'
                        }`}
                        key={index}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{entry?.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Auth Buttons at Bottom (if not logged in) */}
              {token === null && (
                <div className="p-4 border-t border-gray-200 space-y-3 bg-gray-50">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
                    Get Started
                  </h3>
                  <Link
                    to="/signup/user"
                    className="w-full px-4 py-3 text-blue-600 hover:text-blue-700 font-medium text-center border border-blue-600 rounded-lg transition-colors block hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-center transition-colors shadow-sm block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );


};

export default Navbar;