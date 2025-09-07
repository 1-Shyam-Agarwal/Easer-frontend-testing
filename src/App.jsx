import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

//API USED
import { getRole } from './Services/operations/GetUserInformation.jsx';
import { setRole } from './Slices/AuthSlice.js';

//Self Defined Routes
import OpenRoute from './components/Core/Auth/OpenRoute.jsx';
import ProtectedRoute from './components/Core/Auth/ProtectedRoute.jsx';

//Public Pages
import HomePage from './Pages/Public_pages/HomePage/HomePage.js';
import Sponsors from './Pages/Public_pages/Sponsors.js';
import FAQPage from './Pages/Public_pages/FAQsPage.js';
import BecomeVendor from './Pages/Public_pages/BecomeVendor.jsx';
// import VendorPricingPage from "./Pages/Public_pages/Pricing.jsx";

//Legal Pages
import AboutPage from './Pages/Legal_Pages/AboutPage.js';
import ContactUs from './Pages/Legal_Pages/ContactusPage.js';
import PrivacyPolicy from './Pages/Legal_Pages/PrivacyPolicy.jsx';
import TermsAndConditions from './Pages/Legal_Pages/TermsAndCondition.jsx';
import Disclaimer from './Pages/Legal_Pages/Disclaimer.jsx';
import RefundAndCancellationPolicy from './Pages/Legal_Pages/RefundAndCancellation.jsx';
import ShippingAndDeliveryPolicy from './Pages/Legal_Pages/ShippingAndDeliveryPolicy.jsx';

//Auth Pages
import LoginPage from './Pages/AuthPages/LoginPage.js';
import SignupPage from './Pages/AuthPages/SignupPage.js';
import ForgetPasswordPage from './Pages/AuthPages/ForgetPassword.js';
import UpdatePasswordPage from './Pages/AuthPages/UpdatePassword.js';
// import VendorSignupPage from "./Pages/FutureScope/VendorSignupPage.jsx";
// import VendorSignup from "./Pages/FutureScope/VendorSignupPage.jsx";

//General_Pages
import NotFoundPage from './Pages/General_Pages/NotFound.jsx';
// import SuccessPage from "./Pages/General_Pages/SuccessPage.jsx";

import Navbar from './Pages/Public_pages/HomePage/Components/Navbar.js';
import DashboardSidebar from './components/DashboardComponents/DashboardSidebar.jsx';

import DashboardTemplate from './components/DashboardComponents/DashboardTemplate.jsx';
import MyProfile from './Pages/DashboardPages/MyProfile.jsx';
// import  YourShopPage from "./Pages/FutureScope/YourShopRelatedComponents/YourShopPage.jsx";
// import PlaceOrderCollegeSelection from "./components/FuturesScope/PlaceOrderComponent/PlaceOrderSelect.jsx";
// import OrderDashboard from "./Pages/FutureScope/YourShopRelatedComponents/OrderDashboard.jsx";
import VendorInboxPage from './Pages/MailPages/VendorInboxPage.jsx';
import CancelledCustomer from './Pages/OnlineOrdersPages/CancelledOrders/CancelledCustomer.jsx';

import Settings from './Pages/DashboardPages/Settings.jsx';
// import CancelledOrdersDashboard from "./Pages/CancelledOrdersDashboard.jsx";
// import OngoingOrders from "./Pages/OngoingOrders.jsx";
// import UnreceivedOrders from "./Pages/UnreceivedOrders.jsx";
// import OrderHistoryDashboard from "./Pages/OrderHistoryDashboard.jsx";
import FeatureRelease from './Pages/General_Pages/ComingSoon.jsx';

import LogoutModel from './components/Core/Auth/LogoutModel.jsx';
// import SpecificCollegeShopWithoutLogin from "./Pages/SpecificCollegeShopWithoutLogin.jsx";

// import AddVendorPage from "./Pages/AddVendorPage.jsx";
import EaserOutboxPage from './Pages/MailPages/EaserOutboxPage.jsx';
import ShowInkletInfo from './Pages/Public_pages/HomePage/Components/ShowInkletInfo.jsx';
import MailDetail from './Pages/MailPages/components/Specific_mail_details.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';
import TrackAndCancelOrders from './Pages/OnlineOrdersPages/PlaceAndTrackOrder/Customer/PlaceAndTrack.jsx';
// import Store from "./Pages/DashboardPages/Store/Store.jsx";

import VendorPlaceAndTrackOrder from './Pages/OnlineOrdersPages/PlaceAndTrackOrder/Vendor/VendorPlaceAndTrackOrder.jsx';
import OnlineOrderDetails from './Pages/OnlineOrdersPages/PlaceAndTrackOrder/Common/OnlineOngoingOrders.jsx';
import VendorUnrecievedOrders from './Pages/OnlineOrdersPages/VendorUnrecievedOrders.jsx';
import OrderHistory from './Pages/OnlineOrdersPages/OrderHistory.jsx';

const GoogleAuthWrapper = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      {children}
    </GoogleOAuthProvider>
  );
};

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const location = useLocation();
  const showModel = useSelector((state) => {
    return state.logout.showModel;
  });
  const [showInkletInfo, setShowInkletInfo] = useState(false);

  useEffect(() => {
    async function setUserRole() {
      let role = '';
      if (token) {
        role = await getRole(token);
        dispatch(setRole(role));
      }
    }

    setUserRole();
  }, [token]);

  return (
    <div>
      {/* NAVBAR */}
      {location.pathname?.split('/')[1] === 'dashboard' ||
      location.pathname?.split('/')[1] === 'success' ? (
        <div></div>
      ) : (
        <Navbar setShowInkletInfo={setShowInkletInfo} />
      )}

      {/* LOGOUT MODEL */}
      {showModel && <LogoutModel></LogoutModel>}

      <Routes>
        {/*<-------------------PUBLIC PAGES-------------------------> */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/sponsors" element={<Sponsors />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/FAQs" element={<FAQPage />}></Route>
        <Route path="/become-vendor" element={<BecomeVendor />}></Route>

        {/* <--------------------BUSINESS RELATED PAGES---------------------> */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>

        <Route
          path="/shipping-and-delivery-policy"
          element={<ShippingAndDeliveryPolicy />}
        ></Route>

        <Route path="/disclaimer" element={<Disclaimer />}></Route>

        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        ></Route>

        <Route
          path="/refund-and-cancellation-policy"
          element={<RefundAndCancellationPolicy />}
        ></Route>

        {/*<------------------------AUTH PAGES-----------------------------> */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <GoogleAuthWrapper>
                <LoginPage />
              </GoogleAuthWrapper>
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/signup/user"
          element={
            <OpenRoute>
              <GoogleAuthWrapper>
                <SignupPage />
              </GoogleAuthWrapper>
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/services/printing/select-college/7540dee9-90ed-4119-af54-6740da40ae8e/b53bc873-91d4-4028-bde6-f67eabab6c83"
          element={<Navigate to="/signup/user" />}
        ></Route>

        <Route
          path="/forget-password"
          element={
            <OpenRoute>
              <ForgetPasswordPage />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePasswordPage />
            </OpenRoute>
          }
        ></Route>

        {/*<------------------DASHBOARD PAGE--------------------------->*/}
        <Route
          path="/dashboard/my-profile"
          element={
            <ProtectedRoute>
              <DashboardTemplate setShowInkletInfo={setShowInkletInfo}>
                <MyProfile />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard/easer-inbox"
          element={
            <ProtectedRoute>
              <DashboardTemplate>
                <VendorInboxPage />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard/easer-outbox"
          element={
            <ProtectedRoute>
              <DashboardTemplate setShowInkletInfo={setShowInkletInfo}>
                <EaserOutboxPage></EaserOutboxPage>
              </DashboardTemplate>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard/easer-inbox/mail/:id"
          element={
            <ProtectedRoute>
              <DashboardTemplate setShowInkletInfo={setShowInkletInfo}>
                <MailDetail />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard/easer-outbox/mail/:id"
          element={
            <ProtectedRoute>
              <DashboardTemplate setShowInkletInfo={setShowInkletInfo}>
                <MailDetail />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardTemplate setShowInkletInfo={setShowInkletInfo}>
                <Settings />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        />

        {/* <Route path="/dashboard/freq-docs"
            element={
                    <ProtectedRoute>
                      <DashboardTemplate>
                        <FrequentDocs/>
                      </DashboardTemplate>
                    </ProtectedRoute>
                  }
          /> */}

        {/*<------------------------MESSAGES PAGE---------------------> */}
        <Route path="*" element={<NotFoundPage />}></Route>

        {/* <Route path="/coming-soon"
                element={<FeatureRelease/>}
            >
            </Route> */}

        {/* <Route path="/success"
              element={<SuccessPage/>}>
        </Route> */}

        {/* <Route path="/pricing"
              element={<VendorPricingPage/>}>
        </Route> */}

        {/* <Route path="/signup/vendor/:id" 
            element={
              <OpenRoute>
                <VendorSignup/>
              </OpenRoute>
            }
      >
      </Route> */}

        {/* <Route path="/dashboard/easer-store" 
       element={
         <ProtectedRoute>
           <DashboardTemplate>
             <Store />
           </DashboardTemplate>
         </ProtectedRoute>
       }
      /> */}

        <Route
          path="/dashboard/ongoing-orders"
          element={
            <ProtectedRoute>
              <DashboardTemplate>
                <TrackAndCancelOrders />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/vendor/ongoing-orders"
          element={
            <ProtectedRoute>
              <DashboardTemplate>
                <VendorPlaceAndTrackOrder />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/easer-outbox/mail/:id"
          element={
            <ProtectedRoute>
              <DashboardTemplate>
                <FeatureRelease />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        />

        <Route
          path="//dashboard/ongoing-order/:id"
          element={
            <ProtectedRoute>
              <DashboardTemplate>
                <OnlineOrderDetails />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/cancelled-refunds-orders"
          element={
            <ProtectedRoute>
              <DashboardTemplate>
                <CancelledCustomer />
              </DashboardTemplate>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/unreceived-orders"
          element={
            <ProtectedRoute>
              <DashboardTemplate>
                <VendorUnrecievedOrders/>
              </DashboardTemplate>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/order-history"
          element={
            <ProtectedRoute>
              <DashboardTemplate>
                <OrderHistory/>
              </DashboardTemplate>
            </ProtectedRoute>
          }
        />

        {/* <Route path="/dashboard/add-vendor" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <AddVendorPage/>
                </DashboardTemplate>
              </ProtectedRoute>
            }
      /> */}

        <Route
          path="/dashboard/college-shops"
          element={
            <ProtectedRoute>
              <DashboardTemplate>college shops</DashboardTemplate>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/print-summary"
          element={
            <ProtectedRoute>
              <DashboardTemplate>print summary</DashboardTemplate>
            </ProtectedRoute>
          }
        />

        {/* <Route path="/dashboard/place-order/shop/:id" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <OrderDashboard />
                </DashboardTemplate>
              </ProtectedRoute>
            }
      /> */}

        {/* `     <Route path="/dashboard/print-order" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <OrderDashboard />
                </DashboardTemplate>
              </ProtectedRoute>
            }
      /> */}
      </Routes>
      <Toaster />
      {showInkletInfo && <ShowInkletInfo setShowModal={setShowInkletInfo} />}
    </div>
  );
}

export default App;
