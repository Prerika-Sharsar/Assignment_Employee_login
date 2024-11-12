import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import EmployeeList from './components/employeeList';
import CreateEmployee from './components/CreateEmployeeForm';

function App() {
  // Check if the user is logged in
  const isAuthenticated = localStorage.getItem('userName') !== null;

  return (
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/employee-list" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} />
        <Route path="/create-employee" element={isAuthenticated ? <CreateEmployee /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
