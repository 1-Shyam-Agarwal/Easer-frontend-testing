import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  if (token !== null) {
    return children;
  } else return <Navigate to="/login" />;
};

export default ProtectedRoute;
