import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Slices/AuthSlice.js';
import userReducer from '../Slices/profileSlice.js';
import logoutReducer from '../Slices/LogoutSlice.jsx';
import disableReducer from '../Slices/DisableFunctionality.jsx';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  logout: logoutReducer,
  disable: disableReducer,
});

export default rootReducer;
