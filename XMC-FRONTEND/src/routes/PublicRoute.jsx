import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Cookies from "js-cookie";

const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? null : children;
};

export default PublicRoute;
