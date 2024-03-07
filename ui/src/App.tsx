import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import CreateAccountPage from './components/login/CreateAccountPage'; 
import DashPage from './components/dashboard/Dash_Page';
import Home from './components/dashboard/home'; 
import Student  from './components/dashboard/Student';
import AssignmentDetails from './components/dashboard/Assignment';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashPage />} />
          <Route path="/home/:id" element={<Home />} /> 
          <Route path="/student/:id" element={<Student />} />
          <Route path="/home/:id/:assignmentId" element ={<AssignmentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
