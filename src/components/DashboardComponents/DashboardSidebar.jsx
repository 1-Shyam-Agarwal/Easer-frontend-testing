// import React, { useState } from 'react';
// import { MdPerson, MdList, MdWarning, MdDelete, MdHistory, MdSchool } from 'react-icons/md';
// import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';
// import { IoMdPersonAdd } from "react-icons/io";
// import { BsFillBuildingsFill } from "react-icons/bs";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// const DashboardSidebar = () => {
//   const [expandSidebar, setExpandSidebar] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);

//   const toggleHandler = () => setExpandSidebar(!expandSidebar);

//   console.log("reload : ", user);

//   // Common links for all users
//   const commonLinks = [
//     { to: '/dashboard/my-profile', icon: <MdPerson />, label: 'Profile' },
//     { to: '/dashboard/unreceived-orders', icon: <MdWarning />, label: 'Unreceived Orders' },
//     { to: '/dashboard/cancelled-orders', icon: <MdDelete />, label: 'Cancelled Orders' },
//     // { to: '/dashboard/trashed-orders', icon: <MdDelete />, label: 'Trashed Orders' },
//     { to: '/dashboard/order-history', icon: <MdHistory />, label: 'Order History' },
//     { to: '/dashboard/college-shops', icon: <MdSchool />, label: 'College Shops' },
//   ];

//   // Links specific to users
//   const userLinks = [
//     { to: '/dashboard/place-order', icon: <MdList />, label: 'Place Order' },
//     { to:'/dashboard/ongoing-orders' , icon :<MdSchool/> , label : 'Ongoing Orders'}
//   ];

//   // Links specific to vendors
//   const vendorLinks = [
//     { to: '/dashboard/print-order', icon: <MdList />, label: 'Orders' },
//   ];

//   // Links specific to admins
//   const adminLinks = [
//     { to: '/dashboard/add-college', icon: <BsFillBuildingsFill />, label: 'Add College' },
//     { to: '/dashboard/add-vendor', icon: <IoMdPersonAdd />, label: 'Add Vendor' },
//   ];

//   // Combine links based on the user's role
//   const getSidebarLinks = () => {
//     if (user?.role === 'admin') {
//       return [...adminLinks];
//     }
//     if (user?.role === 'vendor') {
//       return [...commonLinks, ...vendorLinks];
//     }
//     return [...commonLinks, ...userLinks];
//   };

//   // Render links dynamically
//   const renderSidebarItems = () => {
//     const links = getSidebarLinks();

//     return (
//       <div className='flex flex-col space-y-4'>
//         {links.map((link, index) => (
//           <NavLink
//             key={index}
//             to={link.to}
//             className='flex items-center p-2 rounded-md hover:bg-gray-300 transition-all duration-300'
//           >
//             <span className="text-gray-800 text-xl">{link.icon}</span>
//             <span
//               className={`text-gray-800 ml-3 overflow-hidden whitespace-nowrap transition-all duration-300 ${
//                 expandSidebar ? 'opacity-100 w-auto' : 'opacity-0 w-0'
//               }`}
//             >
//               {link.label}
//             </span>
//           </NavLink>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className={`bg-gray-200 h-[100vh] text-gray-800 shadow-md p-4 ${expandSidebar ? 'w-64' : 'w-16'} transition-all duration-300`}>
//       {/* Toggle Icon */}
//       <div
//         className='flex items-center justify-center mb-4 cursor-pointer'
//         onClick={toggleHandler}
//       >
//         {expandSidebar ? (
//           <RiExpandLeftLine className='text-gray-800' size={24} />
//         ) : (
//           <RiExpandRightLine className='text-gray-800' size={24} />
//         )}
//       </div>

//       {/* Sidebar Items */}
//       {renderSidebarItems()}
//     </div>
//   );
// };

// export default DashboardSidebar;


import React, { useState } from 'react';
import { MdPerson, MdList, MdWarning, MdDelete, MdHistory, MdSchool } from 'react-icons/md';
import { RiExpandRightLine, RiExpandLeftLine } from 'react-icons/ri';
import { IoMdPersonAdd } from "react-icons/io";
import { BsFillBuildingsFill} from "react-icons/bs";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from '../../Services/operations/GetUserInformation';
import { useEffect } from 'react';
import { MdInbox , MdPayment , MdStore} from 'react-icons/md';



const DashboardSidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [openCategories, setOpenCategories] = useState([]);
  const [role , setRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const toggleHandler = () => setExpandSidebar(!expandSidebar);
  const toggleCategory = (category) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  useEffect(()=>
  {
    dispatch(getRole(token,setRole));
  },[])
  

  // Navigation structures for different roles
  const userNavigation = [
  {
    to: '/dashboard/easer-outbox',
    icon: <MdInbox />,
    label: 'Outbox',
    type: 'single'
  },
  {
    to: '/dashboard/college-shops',
    icon: <MdPerson />,
    label: 'Campus Shops',
    type: 'single'
  },

  {
    to: '/dashboard/easer-store',
    icon: < MdStore />,
    label: 'Store',
    type: 'single'
  },

  {
    label: 'Prepaid Orders',
    icon: <MdPayment />,
    type: 'category',
    items: [
      { to: '/dashboard/ongoing-orders', icon: <MdSchool />, label: 'Ongoing Orders' },
      { to: '/dashboard/cancelled-orders', icon: <MdDelete />, label: 'Cancelled Orders' },
      { to: '/dashboard/order-history', icon: <MdHistory />, label: 'Order History' }
    ]
  }
  ];

  const vendorNavigation = [
    { 
      to: '/dashboard/easer-inbox', 
      icon: <MdInbox />, 
      label: 'Inbox',
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
            className={`
              w-full flex items-center px-3 py-4 rounded-lg
              ${expandSidebar ? 'justify-between' : 'justify-center'}
              text-gray-300 hover:bg-gray-700 transition-colors
            `}
          >
            <div className="flex items-center">
              <span className="text-xl">{item?.icon}</span>
              {expandSidebar && (
                <span className="ml-3 font-normal">{item?.label}</span>
              )}
            </div>
            {expandSidebar && (
              <span className={`
                transform transition-transform duration-100
                ${openCategories.includes(item?.label) ? 'rotate-90' : ''}
              `}>
                ›
              </span>
            )}
          </button>

          <div className={`
            space-y-1 transition-all duration-100
            ${openCategories.includes(item?.label) ? 'block' : 'hidden'}
            ${expandSidebar ? 'ml-4' : ''}
          `}>
            {item?.items?.map((subItem) => (
              <NavLink
                key={subItem?.to}
                to={subItem?.to}
                className={({ isActive }) => `
                  flex items-center px-3 py-3 rounded-lg 
                  ${isActive 
                    ? 'bg-blue-700 text-white' 
                    : 'text-gray-400 hover:bg-gray-700'
                  }
                  transition-colors duration-100
                `}
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
        className={({ isActive }) => `
          flex items-center px-3 py-4 rounded-lg 
          ${isActive 
            ? 'bg-blue-700 text-white' 
            : 'text-gray-400 hover:bg-gray-700'
          }
          transition-colors duration-100
        `}
      >
        <span className={`text-xl ${!expandSidebar ? 'mx-auto' : ''}`}>
          {item?.icon}
        </span>
        {expandSidebar && (
          <span className="ml-3 font-normal text-nowrap">{item?.label}</span>
        )}
      </NavLink>
    );
  };

  return (
    <div className={`
      fixed md:relative h-screen bg-[#000033] shadow-lg overflow-x-hidden
      ${expandSidebar ? 'w-64' : 'w-16'}
      transition-all duration-300 ease-in-out
      ${window.innerWidth <= 768 && !expandSidebar ? '-translate-x-full' : 'translate-x-0'}
    `}>
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-gray-700">
        {expandSidebar && (
          <div className="flex-1">
            <h2 className="text-lg font-normal text-gray-100">Dashboard</h2>
            <p className="text-sm text-gray-400 capitalize">{role}</p>
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
      <div className="flex-1 overflow-y-auto overflow-x-hidden white-space:nowrap p-3 space-y-2">
        {getNavigation()?.map(item => renderNavItem(item))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
