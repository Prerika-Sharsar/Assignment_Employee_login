// src/components/Dashboard.js
import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import EmployeeList from './employeeList';
import CreateEmployeeForm from './CreateEmployeeForm';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data (e.g., from localStorage) and redirect to login page
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#FFFF00', padding: '10px' }}>
        <div>
          <Link to="/dashboard/home">Home</Link> |{' '}
          <Link to="/dashboard/employees">Employee List</Link>
        </div>
        <div>
          <span>Username</span> {/* Replace with actual username from localStorage or context */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/create" element={<CreateEmployeeForm />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
