import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null; 
  }

  return isSignedIn ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
