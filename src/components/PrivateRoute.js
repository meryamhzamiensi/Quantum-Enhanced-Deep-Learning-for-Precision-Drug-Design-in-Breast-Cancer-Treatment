import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; 
import { useAuth } from './AuthContext';  

const PrivateRoute = ({ children, allowedRoles }) => {
  const { userType, isAuthenticated, isLoading } = useAuth();   
  const location = useLocation();    
  
  // Show loading while checking authentication status
  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component   
  }    
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;   
  }    
  
  // Check role authorization
  if (allowedRoles && !allowedRoles.includes(userType)) {
    console.log('Access denied - User type:', userType, 'Allowed roles:', allowedRoles);
    return <Navigate to="/unauthorized" replace />;   
  }    
  
  return children; 
};  

export default PrivateRoute;