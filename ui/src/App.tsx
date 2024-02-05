import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import CreateAccountPage from './components/login/CreateAccountPage'; 
import Dash_Page from './components/dashboard/Dash_Page';

function App() {
  return (
    <Router>
      <div className="App">
        

        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<Login />} />
          
          <Route path="/dashboard" element={<Dash_Page />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
