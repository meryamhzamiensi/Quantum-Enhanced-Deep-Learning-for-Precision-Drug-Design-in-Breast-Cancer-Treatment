// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();

  // Redirect to login if no user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is allowed
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected component
  return children;
};

export default PrivateRoute;