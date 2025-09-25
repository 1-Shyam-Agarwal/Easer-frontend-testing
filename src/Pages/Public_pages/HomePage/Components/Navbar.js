import React, { useState, useEffect } from 'react';
import Navlinks from '../../../../Data/navlinks.js';
import { useLocation, matchPath, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropDown from '../../../../components/ProfileComponents/ProfileDropDown.jsx';
import { Menu, X } from 'lucide-react';
import { MdHistory, MdInbox, MdSend, MdSchool, MdList, MdWarning, MdPayment } from 'react-icons/md';
import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillBuildingsFill } from 'react-icons/bs';
import krishna_footprints from '../../../../Assets/Images/krishna_footprints.webp';
import './navbar.css';

const Navbar = ({ setShowInkletInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Manage body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Navigation configurations
  const navigationConfig = {
    customer: [
      {
        to: '/dashboard/easer-outbox',
        icon: <MdSend />,
        label: 'Outbox'
      },
      {
        label: 'Remote Prints',
        icon: <MdList />,
        children: [
          {
            to: '/dashboard/ongoing-orders',
            icon: <MdSchool />,
            label: 'Place & Track Orders'
          },
          {
            to: '/dashboard/order-history',
            icon: <MdHistory />,
            label: 'Order History'
          }
        ]
      }
    ],
    vendor: [
      {
        to: '/dashboard/easer-inbox',
        icon: <MdInbox />,
        label: 'Inbox'
      },
      {
        label: 'Remote Prints',
        icon: <MdList />,
        children: [
          {
            to: '/dashboard/vendor/ongoing-orders',
            icon: <MdSchool />,
            label: 'Ongoing Orders'
          },
          {
            to: '/dashboard/unreceived-orders',
            icon: <MdWarning />,
            label: 'Unreceived Orders'
          },
          {
            to: '/dashboard/order-history',
            icon: <MdHistory />,
            label: 'Order History'
          }
        ]
      }
    ],
    admin: [
      {
        to: '/dashboard/add-college',
        icon: <BsFillBuildingsFill />,
        label: 'Add College'
      },
      {
        to: '/dashboard/add-vendor',
        icon: <IoMdPersonAdd />,
        label: 'Add Vendor'
      }
    ]
  };

  const getNavigation = () => {
    if (!token) return [];
    return navigationConfig[role] || [];
  };

  const isActiveRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={krishna_footprints}
                alt="Easer"
                className="w-8 h-8 transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-semibold text-gray-900">
                <span className="text-blue-600 specialCharacter">E</span>aser
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {!isDashboard && Navlinks?.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative group py-2 ${
                    isActiveRoute(link.path) 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.title}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform ${
                    isActiveRoute(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Desktop Auth/Profile */}
            <div className="flex items-center gap-4">
              {token ? (
                <ProfileDropDown image={user} />
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    to="/signup/user"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Login
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={closeMenu}
          />
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-slate-900 shadow-xl">
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
                <img
                  src={krishna_footprints}
                  alt="Easer"
                  className="w-8 h-8"
                />
                <span className="text-lg font-semibold text-white">
                  <span className="text-blue-600 specialCharacter">E</span>aser
                </span>
              </Link>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex-1 p-4 space-y-6">
                
                {/* Dashboard Navigation */}
                {token && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Dashboard
                    </h3>
                    {getNavigation().map((item, index) => (
                      <div key={index}>
                        {item.children ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-white font-medium py-2">
                              <span className="text-lg">{item.icon}</span>
                              <span>{item.label}</span>
                            </div>
                            <div className="pl-8 space-y-2">
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  to={child.to}
                                  onClick={closeMenu}
                                  className="flex items-center gap-3 text-gray-300 hover:text-white py-2 transition-colors"
                                >
                                  <span>{child.icon}</span>
                                  <span>{child.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            to={item.to}
                            onClick={closeMenu}
                            className={`flex items-center gap-3 py-3 px-2 rounded-lg transition-colors ${
                              isActiveRoute(item.to)
                                ? 'text-blue-400 bg-slate-800'
                                : 'text-gray-300 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* General Navigation */}
                {!isDashboard && Navlinks?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Menu
                    </h3>
                    {Navlinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.path}
                        onClick={closeMenu}
                        className={`block py-3 px-2 rounded-lg transition-colors ${
                          isActiveRoute(link.path)
                            ? 'text-blue-400 bg-slate-800'
                            : 'text-gray-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Auth Buttons (if not logged in) */}
              {!token && (
                <div className="p-4 border-t border-slate-700 space-y-3">
                  <Link
                    to="/signup/user"
                    onClick={closeMenu}
                    className="block w-full py-3 px-4 text-blue-400 border border-blue-400 rounded-lg text-center font-medium hover:bg-blue-400 hover:text-white transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
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