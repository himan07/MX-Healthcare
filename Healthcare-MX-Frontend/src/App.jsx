import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Auth/RegisterPage";
import TopbarLayout from "./components/Views/Themes/TopbarLayout/TopbarLayout";
import HomeLayout from "./components/Views";
import Login from "./components/Auth/login/Login";

const App = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Router>
        <TopbarLayout setDrawerOpen={setDrawerOpen} />
        <Routes>
          <Route path="/*" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/homepage"
            element={
              <HomeLayout
                isDrawerOpen={isDrawerOpen}
                setDrawerOpen={setDrawerOpen}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
