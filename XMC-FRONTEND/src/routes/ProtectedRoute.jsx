import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null; 
  }

  return isSignedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
