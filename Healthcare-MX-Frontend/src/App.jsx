import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Auth/RegisterPage";
import Login from "./components/Auth/login/Login";
import TopbarLayout from "./components/Views/Themes/TopbarLayout/TopbarLayout";
import HomeLayout from "./components/Views";

const App = () => {
  return (
    <>
      <Router>
        <TopbarLayout />
        <Routes>
          <Route path="/*" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<HomeLayout />}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
