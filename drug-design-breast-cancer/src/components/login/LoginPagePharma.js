import React, { useState } from 'react';

const styles = {
  body: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#f4f7fc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: '420px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
    textAlign: 'left',
  },
  input: {
    padding: '14px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

const SignUpPagePharma = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    pharmacyId: '',
    licenseNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to the server or validate
    console.log('Form submitted:', formData);
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2>Pharmacist Sign-Up</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            style={styles.input}
            value={formData.username}
            onChange={handleInputChange}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            style={styles.input}
            value={formData.password}
            onChange={handleInputChange}
          />

          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            style={styles.input}
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            style={styles.input}
            value={formData.email}
            onChange={handleInputChange}
          />

          <label style={styles.label}>Pharmacy ID</label>
          <input
            type="text"
            name="pharmacyId"
            placeholder="Enter your pharmacy ID"
            style={styles.input}
            value={formData.pharmacyId}
            onChange={handleInputChange}
          />

          <label style={styles.label}>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            placeholder="Enter your license number"
            style={styles.input}
            value={formData.licenseNumber}
            onChange={handleInputChange}
          />

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPagePharma;
