import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  const trackStep = parseInt(localStorage.getItem("activeStep"), 10) || 0;
  const email = sessionStorage.getItem("userEmail") || "";

  useEffect(() => {
    if (!isLoaded) return;
  
    if (isSignedIn) {
      navigate("/dashboard");
      return;
    }
  
    if (trackStep === 0) {
      navigate("/register/personal-details");
    } else if (trackStep === 1 && email) {
      navigate("/register/verification");
    } else if (trackStep === 2) {
      navigate("/register/professional-details");
      return
    } else {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, trackStep, email, navigate]);
  

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? null : children;
};

export default PublicRoute;
