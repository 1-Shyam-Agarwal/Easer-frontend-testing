import React, { useState, useEffect } from 'react';
import {
  MdPerson,
  MdList,
  MdWarning,
  MdDelete,
  MdHistory,
  MdSchool,
  MdInbox,
  MdPayment,
} from 'react-icons/md';
import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';
import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from '../../Services/operations/GetUserInformation';
import { MdPrint, MdSend } from 'react-icons/md';

// ✅ Hook to detect mobile screen
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

const DashboardSidebar = () => {
  const isMobile = useIsMobile();
  const [expandSidebar, setExpandSidebar] = useState(!isMobile);
  const [role, setRole] = useState('');
  const token = useSelector((state) => state.auth.token);

  const toggleHandler = () => setExpandSidebar(!expandSidebar);

  // Initialize all categories as open
  const [openCategories, setOpenCategories] = useState(['Remote Prints']);
  
  const toggleCategory = (category) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    if (token) {
      getRole(token, setRole);
    }
  }, [token]);

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
        // {
        //   to: '/dashboard/unreceived-orders',
        //   icon: <MdWarning />,
        //   label: 'Unreceived Orders',
        // },
        // {
        //   to: '/dashboard/cancelled-refunds-orders',
        //   icon: <MdDelete />,
        //   label: 'Cancelled & Refunds',
        // },
        {
          to: '/dashboard/order-history',
          icon: <MdHistory />,
          label: 'Order History',
        },
      ],
    },

    // {
    //   to: '/dashboard/print-summary',
    //   icon: <MdPrint />, // Represents cloud-based or remote printing
    //   label: 'Summary',
    //   type: 'single',
    // },

    // {
    //   to: '/dashboard/college-shops',
    //   icon: <MdPrint />, // Represents cloud-based or remote printing
    //   label: 'Campus Shops',
    //   type: 'single',
    // },
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
        // {
        //   to: '/dashboard/cancelled-refunds-orders',
        //   icon: <MdDelete />,
        //   label: 'Cancelled & Refunds',
        // },
        {
          to: '/dashboard/order-history',
          icon: <MdHistory />,
          label: 'Order History',
        },
      ],
    },

    // {
    //   to: '/dashboard/print-summary',
    //   icon: <MdPrint />, // Represents cloud-based or remote printing
    //   label: 'Summary',
    //   type: 'single',
    // },

    // {
    //   to: '/dashboard/college-shops',
    //   icon: <MdPrint />, // Represents cloud-based or remote printing
    //   label: 'Campus Shops',
    //   type: 'single',
    // },
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

  const getNavigation = () => {
    switch (role) {
      case 'admin':
        return adminNavigation;
      case 'vendor':
        return vendorNavigation;
      default:
        return userNavigation;
    }
  };

  const renderNavItem = (item) => {
    if (item?.type === 'category') {
      return (
        <div key={item?.label} className="space-y-1 overflow-x-hidden">
          <button
            onClick={() => toggleCategory(item?.label)}
            className={`w-full flex items-center px-3 py-4 rounded-lg
              ${expandSidebar ? 'justify-between' : 'justify-center'}
              text-gray-300 hover:bg-gray-700 transition-colors`}
          >
            <div className="flex items-center">
              <span className="text-xl">{item?.icon}</span>
              {expandSidebar && (
                <span className="ml-3 font-normal">{item?.label}</span>
              )}
            </div>
            {expandSidebar && (
              <span
                className={`transform transition-transform duration-100 ${openCategories.includes(item?.label) ? 'rotate-90' : ''}`}
              >
                ›
              </span>
            )}
          </button>

          <div
            className={`space-y-1 transition-all duration-100 ${openCategories.includes(item?.label) ? 'block' : 'hidden'} ${expandSidebar ? 'ml-4' : ''}`}
          >
            {item?.items?.map((subItem , index) => (
              <NavLink
                key={index}
                to={subItem?.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-700'} transition-colors duration-100`
                }
              >
                <span className={`text-xl ${!expandSidebar ? 'mx-auto' : ''}`}>
                  {subItem?.icon}
                </span>
                {expandSidebar && (
                  <span className="ml-3 text-sm">{subItem?.label}</span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      );
    }

    return (
      <NavLink
        key={item?.to}
        to={item?.to}
        className={({ isActive }) =>
          `flex items-center px-3 py-3 overflow-x-hidden rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-700'} transition-colors duration-100`
        }
      >
        <span className={`text-xl ${!expandSidebar ? 'mx-auto' : ''}`}>
          {item?.icon}
        </span>
        {expandSidebar && (
          <span className="ml-3 font-normal text-[0.9rem] text-nowrap">
            {item?.label}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <div>
      {/* Overlay for mobile */}
      {isMobile && expandSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleHandler}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-[#000033] shadow-lg overflow-x-hidden transition-all duration-300 ease-in-out z-40
          h-screen
          ${expandSidebar ? 'w-64' : 'w-16'}
          ${
            isMobile
              ? `fixed top-0 left-0 ${expandSidebar ? 'translate-x-0' : '-translate-x-full'}`
              : 'relative'
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center h-16 px-4 border-b border-gray-700 text-white">
          {expandSidebar && (
            <div className="flex-1">
              <h2 className="text-lg font-normal text-gray-100">Dashboard</h2>
            </div>
          )}
          <button
            onClick={toggleHandler}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {expandSidebar ? (
              <RiExpandLeftLine className="w-5 h-5 text-gray-300" />
            ) : (
              <RiExpandRightLine className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {role === '' ? (
            <p></p>
          ) : (
            getNavigation()?.map((item) => renderNavItem(item))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;