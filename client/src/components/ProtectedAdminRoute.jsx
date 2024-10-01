import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'; // For redirecting
import {jwtDecode} from 'jwt-decode'; // Ensure you have jwt-decode installed

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    // Check if the token is expired
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Return true if the token is invalid or cannot be decoded
  }
};

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  // Check if there's an accessToken in localStorage and if it's not expired
  const token = localStorage.getItem('accessToken');
  
  // If no token or the token is expired, redirect to login page
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return children; // Render children if user is authenticated and JWT is valid
};

export default ProtectedAdminRoute;
