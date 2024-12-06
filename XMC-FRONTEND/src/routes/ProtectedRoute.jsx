import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const isRegistered = localStorage.getItem("isRegistered");

  if (!isLoaded) {
    return null;
  }

  return isSignedIn || isRegistered ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
