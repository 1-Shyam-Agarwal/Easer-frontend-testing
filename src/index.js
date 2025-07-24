import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers/index.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "682721477002-9dd0g6eqf4igqgacv6mmn578scp9l93u.apps.googleusercontent.com";
const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
  </Provider>
);
