import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  if (token === null) {
    return children;
  } else {
    if (role === 'customer') {
      return <Navigate to="/dashboard/easer-outbox" />;
    }

    if (role === 'vendor') {
      return <Navigate to="/dashboard/easer-inbox" />;
    }
  }
};

export default OpenRoute;
