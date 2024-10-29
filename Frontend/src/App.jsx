import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Auth/SignUp/Register';
import TopbarLayout from './Views/Themes/TopbarLayout/TopbarLayout';
import Login from './Auth/SignIn/Login';


const App = () => {
  return (
    <Router>
        <TopbarLayout />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
  )
}

export default App