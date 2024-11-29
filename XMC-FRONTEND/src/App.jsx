import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import registerRoutes from './routes/registerRoutes';
import Login from './features/auth/login/Login';
import Dashboard from './pages/DashboardPages/Dashboard';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {registerRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element} 
          />
        ))}
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </Router>
  );
};

export default App;
