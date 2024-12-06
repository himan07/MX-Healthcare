import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const trackStep = localStorage.getItem("activeStep");
  const email = sessionStorage.getItem("userEmail");

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate("/dashboard");
      } else {
        const currentPath = location.pathname;
        const allowedPaths = [
          "/",
          "/register/personal-details",
          "/register/verification",
          "/register/professional-details",
          "/login",
        ];

        if (allowedPaths.includes(currentPath)) {
          return;
        }

        switch (trackStep) {
          case "0":
            navigate("/");
            break;
          case "1":
            navigate("/register/personal-details");
            break;
          case "2":
            if (email) navigate("/register/verification");
            break;
          case "3":
            navigate("/register/professional-details");
            break;
          default:
            navigate("/");
        }
      }
    }
  }, [isLoaded, isSignedIn, trackStep, email, navigate, location]);

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? null : children;
};

export default PublicRoute;
