import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const trackStep = localStorage.getItem("activeStep");
  const email = sessionStorage.getItem("userEmail");

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate("/dashboard");
      } else {
        switch (trackStep) {
          case "0":
            navigate("/");
            break;
          case "1":
            navigate("/register/personal-details");
            break;
          case "2":
            if (trackStep === "2" && email) navigate("/register/verification");
            break;
          case "3":
            navigate("/register/professional-details");
            break;
          default:
            navigate("/");
        }
      }
    }
  }, [isLoaded, isSignedIn, trackStep, email, navigate]);

  if (!isLoaded) {
    return null;
  }

  return children;
};

export default PublicRoute;
