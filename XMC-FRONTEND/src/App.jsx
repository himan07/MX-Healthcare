import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { RegisterRoutes, AuthRoutes } from "./routes/routes";
import Navbar from "./components/Navbar/Navbar";

const AppContent = () => {
  const navigate = useNavigate();
  const trackStep = localStorage.getItem("activeStep");
  const email = sessionStorage.getItem("userEmail")
  useEffect(() => {
    {
      trackStep === 0
        ? navigate("/")
        : trackStep === 1
        ? navigate("/register/personal-details")
        : trackStep === 2 && email
        ? navigate("/register/verification")
        : trackStep === 3
        ? navigate("/register/professional-details")
        : navigate("/");
    }
  }, [trackStep]);
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
