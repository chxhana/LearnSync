import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import CreateAccountPage from './components/login/CreateAccountPage'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Your header or other common components can be placed here */}

        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<Login />} />
          {/* Add other routes if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
