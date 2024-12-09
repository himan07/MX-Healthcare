import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { RegisterRoutes, AuthRoutes } from "./routes/routes";
import Navbar from "./components/Navbar/Navbar";

const AppContent = () => {
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
