// src/components/EmployeeList.js
import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  return (
    <div>
      <h2>Employee List</h2>
      <button>
        <Link to="/dashboard/employees/create">Create New Employee</Link>
      </button>
      {/* List of employees would be displayed here */}
    </div>
  );
};

export default EmployeeList;
