// src/components/CreateEmployeeForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        course: checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value),
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.image) newErrors.image = 'Image upload is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('mobile', formData.mobile);
    data.append('designation', formData.designation);
    data.append('gender', formData.gender);
    data.append('course', JSON.stringify(formData.course));
    data.append('image', formData.image);

    try {
      const response = await axios.post('/api/employees', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Employee created successfully!');
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee');
    }
  };

  return (
    <form id="employeeForm" onSubmit={handleFormSubmit} encType="multipart/form-data">
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Mobile No:</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
      </div>
      <div>
        <label>Designation:</label>
        <select name="designation" value={formData.designation} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.designation && <p style={{ color: 'red' }}>{errors.designation}</p>}
      </div>
      <div>
        <label>Gender:</label>
        <label>
          <input type="radio" name="gender" value="M" onChange={handleChange} required /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="F" onChange={handleChange} required /> Female
        </label>
        {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
      </div>
      <div>
        <label>Course:</label>
        <label>
          <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
        </label>
        <label>
          <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
        </label>
        <label>
          <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC
        </label>
      </div>
      <div>
        <label>Image Upload:</label>
        <input type="file" name="image" accept="image/jpeg, image/png" onChange={handleChange} required />
        {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateEmployeeForm;
