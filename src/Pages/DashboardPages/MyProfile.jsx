import React, { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../Services/operations/GetUserInformation.jsx';
import { 
  User, Mail, Phone, School, Badge,StopCircle,
  Building, Calendar, MapPin, Settings ,History , Clock , HelpCircle ,Tag ,CreditCard ,AlertCircle
} from 'lucide-react';



const MyProfile = () => {

  const[user , setUser] = useState("");
  const token = useSelector((state)=>state.auth.token);
  const[loading , setLoading] = useState(false);


  const actions = [
    {
      name: 'Order History',
      icon: History,
      path: '/dashboard/order-history',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Ongoing Orders',
      icon: Clock,
      path: '/dashboard/ongoing-orders',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Help',
      icon: HelpCircle,
      path: '/faqs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  useEffect(()=>
  {
      getUserDetails(setUser,token,setLoading);
  },[])


  const ProfileSection = ({ title, children }) => (
    <div className="bg-white rounded-md p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  );

  const InfoCard = ({ icon: Icon, label, value ,property="",pricingMethod=""}) => (
    <div className="flex items-start space-x-4 p-4 overflow-auto rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ">
      <div className="p-2 bg-white rounded-md shadow">
        <Icon size={20} className="text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-base font-normal text-gray-900 mt-1 ${property}`}>{value ? value : (value===0 ? value :'Not Available')}<span className='text-gray-500 text-[13px]'>{!pricingMethod?"":`( ${pricingMethod} )`}</span></p>
      </div>
    </div>
  );

  return (
    <div>
      {
          loading ? 
          (
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )
          :
          (
              <div>
                <div className="bg-gray-50 cursor-default ">
                  <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="flex justify-between items-center gap-4 mb-12">
                      <div className="flex items-center gap-5">
                        <svg 
                          width="40" 
                          height="40" 
                          viewBox="0 0 40 40" 
                          className="text-blue-600"
                        >
                          <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="2"/>
                          <path 
                            d="M20 11c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 12c-5.3 0-10 2.7-10 6v2h20v-2c0-3.3-4.7-6-10-6z"
                            fill="currentColor"
                          />
                          <path 
                            d="M35 20c0-8.3-6.7-15-15-15"
                            fill="none"
                            stroke="#93c5fd"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <h1 className="text-3xl font-normal max-390:text-2xl text-gray-900">Profile Dashboard</h1>
                      </div>

                      <NavLink
                        to="/dashboard/settings"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white max-390:text-[10px] rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4 max-390:w-[14px] max-390:w-[14px] max-390:mr-1 mr-2" />
                        Settings
                      </NavLink>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Profile Card */}
                      <div className="lg:col-span-1">
                        <ProfileSection title="Profile">
                          <div className="flex flex-col items-center text-center">
                            <div className="relative mb-6">
                              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                                <img
                                  src={user?.profileImage}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900"><span className='capitalize'>{user?.firstName}</span> <span className='capitalize'>{user?.lastName}</span> </h3>
                            <p className="text-gray-500 mt-1 capitalize">{user?.role === "customer" ? "user" : "vendor"}</p>
                            <div className="mt-4 flex items-center justify-center space-x-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{user?.collegeCode?.collegeName}</span>
                            </div>
                            <NavLink
                              to="/dashboard/settings"
                              className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                              Edit Profile
                            </NavLink>
                          </div>
                        </ProfileSection>
                      </div>

                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Contact Information */}
                        <ProfileSection title="Contact Information">
                          <div className="grid md:grid-cols-2 gap-4">
                            <InfoCard
                              icon={Mail}
                              label="Email Address"
                              value={user?.email}
                            />
                            <InfoCard
                              icon={Phone}
                              label="Phone Number"
                              value={user?.mobileNumber}
                            />
                          </div>
                        </ProfileSection>

                        {/* Personal Details */}
                        <ProfileSection title="Personal Details">
                          <div className="grid md:grid-cols-2 gap-4">
                            <InfoCard
                              icon={User}
                              label="First Name"
                              value={user?.firstName}
                              property='capitalize'
                            />
                            <InfoCard
                              icon={User}
                              label="Last Name"
                              value={user?.lastName}
                              property='capitalize'
                            />
                            <InfoCard
                              icon={Building}
                              label="Institution"
                              value={user?.collegeCode?.collegeName}
                              property='capitalize'
                            />
                            <InfoCard
                              icon={Badge}
                              label="Role"
                              value={user?.role}
                              property='capitalize'
                            />
                          </div>
                        </ProfileSection>

                        {/* Shop Information */}
                        {
                          user?.role === "vendor" ? 
                          (
                            <ProfileSection title="Shop Information">
                              <div className="grid md:grid-cols-2 gap-4">
                                <InfoCard
                                  icon={Tag}
                                  label="Shop Name"
                                  value={user?.vendorAdditionalDetails?.shopName}
                                  property="capitalize"
                                />
                                <InfoCard
                                  icon={MapPin}
                                  label="Shop Land Mark"
                                  value={user?.vendorAdditionalDetails?.shopLandMark}
                                  property="capitalize"
                                />
                              </div>
                            </ProfileSection>
                          )
                          :
                          (<div></div>)
                        }
                        

                        {/* Price Details */}
                        {/* {
                          user?.role === "vendor" ? 
                          (
                            <ProfileSection title="Pricing Details (All in INR)">
                              <div className="grid md:grid-cols-2 gap-4">
                              {
                                  user?.vendorAdditionalDetails?.priceSchema?.priceSchema?.map((priceSchema,idx)=>
                                  {
                                    return(
                                      <InfoCard
                                        key={idx}
                                        icon={CreditCard}
                                        // "Single Side | B&W | Page Range : (2-5) "
                                        label={
                                                `${priceSchema?.colour==="blackAndWhite"? "B&W" :(priceSchema?.colour==="colour" ? "Colour" : "Invalid")} | 
                                                ${priceSchema?.printingMethod==="singleSide"? "Single-side" :(priceSchema.printingMethod==="backToBack" ? "Back-to-Back" : "Invalid")} |
                                                ${priceSchema?.rangeType ==="above"? 
                                                        `Above ${priceSchema?.aboveValue} Pages` 
                                                        : 
                                                        (
                                                          priceSchema?.rangeType ==="range" ?
                                                              (
                                                                priceSchema?.startingRange === priceSchema?.endingRange ? 
                                                                        `For ${priceSchema?.startingRange} Pages` 
                                                                        : 
                                                                `Range: (${priceSchema?.startingRange}-${priceSchema?.endingRange}) Pages`
                                                              )
                                                              :
                                                              "Invalid"
                                                        )
                                                  }`
                                              }
                                              
                                        value={`₹ ${priceSchema?.price} `}
                                        pricingMethod={priceSchema?.pricingMethod}
                                        property='capitalize'
                                      />
                                    );
                                  })
                              }
                                
                              </div>
                            </ProfileSection>
                          )
                          :
                          (
                            <div></div>
                          )
                        } */}
                        

                        {/* Fine Information */}
                        {/* {
                          user?.role ==="vendor"? (
                            <ProfileSection title="Fine Information">
                              <div className="grid md:grid-cols-2 gap-4">
                                <InfoCard
                                  icon={AlertCircle}
                                  label="Fine Enforcement Time (in minutes)"
                                  value={user?.vendorAdditionalDetails?.fineSchema?.fineEnforcementTimeInMinutes}
                                />
                                <InfoCard
                                  icon={StopCircle}
                                  label="Fine Rate (per minute)"
                                  value={"₹ "+user?.vendorAdditionalDetails?.fineSchema?.fineRatePerMinute}
                                />
                              </div>
                            </ProfileSection>
                          )
                          :(
                            <div></div>
                          )
                        } */}

                        {/* {
                          user?.role ==="vendor"? (
                            <ProfileSection title="Waiting Time For Offline Students">
                              <div className="grid md:grid-cols-2 gap-4">
                                <InfoCard
                                  icon={Clock}
                                  label="Waiting Time (in minutes)"
                                  value={user?.vendorAdditionalDetails?.waitingTime}
                                />
                              </div>
                            </ProfileSection>
                          )
                          :(
                            <div></div>
                          )
                        } */}
                        

                        {/* Quick Actions */}

                        {
                           user?.role !== "admin" ? 
                           (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {actions.map(({ name, icon: Icon, path, color, bgColor }) => (
                                  <NavLink
                                    key={name}
                                    to={path}
                                    className={({ isActive }) => `
                                      p-4 bg-white rounded-md shadow-lg hover:shadow-xl 
                                      transition-all duration-200 flex flex-col items-center 
                                      justify-center space-y-2 group
                                      ${isActive ? 'ring-2 ring-blue-500 shadow-md' : ''}
                                    `}
                                  >
                                    <div className={`p-2 ${bgColor} rounded-md group-hover:scale-110 transition-transform duration-200`}>
                                      <Icon className={`w-5 h-5 ${color}`} />
                                    </div>
                                    <span className="text-sm font-normal text-gray-700 text-center">{name}</span>
                                  </NavLink>
                                ))}
                                </div>
                           )
                           :
                           (
                              <div></div>
                           )
                        }
                        
                      </div>
                    </div>
                  </div>
                </div>
    
              </div>
          )
      }
    </div>
    
  );
};

export default MyProfile;