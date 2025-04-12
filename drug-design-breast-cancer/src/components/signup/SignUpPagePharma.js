import React, { useState } from 'react';

// Define styles for this page
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
    transition: 'box-shadow 0.3s ease',
  },
  containerHover: {
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
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
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

const SignUpPagePharma = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.body}>
      <div
        style={{
          ...styles.container,
          ...(isHovered && styles.containerHover),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2>Pharma Sign Up</h2>
        <form style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input type="text" placeholder="Enter your full name" style={styles.input} />

          <label style={styles.label}>Email</label>
          <input type="email" placeholder="Enter your email" style={styles.input} />

          <label style={styles.label}>Username</label>
          <input type="text" placeholder="Enter your username" style={styles.input} />

          <label style={styles.label}>Password</label>
          <input type="password" placeholder="Enter your password" style={styles.input} />

          <label style={styles.label}>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" style={styles.input} />

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isHovered && styles.buttonHover),
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPagePharma;
