import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import CreateAccountPage from './components/login/CreateAccountPage'; 
import DashPage from './components/dashboard/Dash_Page';
import Home from './components/dashboard/home'; 
import Student  from './components/dashboard/Student';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashPage />} />
          <Route path="/home/:id" element={<Home />} /> 
          <Route path="/student" element={<Student />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
