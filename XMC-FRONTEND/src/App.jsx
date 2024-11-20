import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import registerRoutes from './routes/registerRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        {registerRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element} 
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
