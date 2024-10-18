import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Auth/RegisterPage";
import TopbarLayout from "./Themes/TopbarLayout/TopbarLayout";
import Login from "./components/Auth/login/Login";

const App = () => {
  return (
    <>
      <Router>
        <TopbarLayout />
        <Routes>
          <Route path="/*" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
