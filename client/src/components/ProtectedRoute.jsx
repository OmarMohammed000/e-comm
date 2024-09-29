import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'; // For redirecting

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If no user is authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // Render children if user is authenticated
};

export default ProtectedRoute;
