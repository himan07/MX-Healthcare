import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { RegisterRoutes, AuthRoutes } from "./routes/routes";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "@clerk/clerk-react";

const AppContent = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const registerPaths = ["/", "/register/verification", "/register/professional-details"];
    
    if (isLoaded) {
      if (!isSignedIn && !registerPaths.includes(currentPath)) {
        navigate("/login");
      } else if (isSignedIn && currentPath === '/login') {
        navigate('/dashboard');
      }
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return false;
  }

  return (
    <>
      <Navbar />
      <Routes>
        {RegisterRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {AuthRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
