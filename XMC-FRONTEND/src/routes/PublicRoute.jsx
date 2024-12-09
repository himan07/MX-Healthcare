import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Cookies from 'js-cookie'; 



const PublicRoute = ({ children }) => {
  const token = Cookies.get("__session")
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();


  const trackStep = parseInt(localStorage.getItem("activeStep"), 10);
  const email = sessionStorage.getItem("userEmail") || "";

  // useEffect(() => {
  //   if (!isLoaded) return;
  
  //   if (token) {
  //     navigate("/dashboard");
  //     return;
  //   }
  
  //   switch (trackStep) {
  //     case 1:
  //       navigate("/register/personal-details");
  //       break;
  //     case 1:
  //       if (email) {
  //         navigate("/register/verification");
  //       }
  //       break;
  //     case 2:
  //       navigate("/register/professional-details");
  //       return;
  //     default:
  //       navigate("/");
  //   }
  // }, [isLoaded, token, trackStep, email, navigate]);
  

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? null : children;
};

export default PublicRoute;
