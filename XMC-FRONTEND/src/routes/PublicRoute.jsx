import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const isRegistered = localStorage.getItem("isRegistered")

  if (!isLoaded) {
    return null;
  }

  return isSignedIn && !isRegistered ? (
    <Navigate to="/login" />
  ) : isSignedIn || isRegistered ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );
};

export default PublicRoute;
