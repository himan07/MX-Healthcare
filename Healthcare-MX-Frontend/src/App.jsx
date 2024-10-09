import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Auth/RegisterPage";
import TopbarLayout from "./Themes/TopbarLayout/TopbarLayout";

const App = () => {
  return (
    <>
      <TopbarLayout />
      <Router>
        <Routes>
          <Route path="/*" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
