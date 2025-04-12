import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login/roles');
  };

  return (
    <div className="container" style={styles.container}>
      {/* Header Section */}
      <div style={styles.welcomeSection}>
        
        <h1 className="section-title" style={styles.title}>Welcome to Quantum Drug Design</h1>
        <p style={styles.subtitle}>
          A platform dedicated to molecule management, clinical analysis, and scientific development.
        </p>

        {/* Login Button */}
        <button className="button-primary" style={styles.connectButton} onClick={handleLoginClick}>
          Login
        </button>
      </div>

      {/* Features Section */}
      <div className="section" style={styles.featuresSection}>
        <h2 className="section-title">Our Features</h2>
        <div className="content" style={styles.featureCards}>
          <div className="card" style={styles.featureCard}>
            <h3 style={styles.featureHeader}>Multi-Role Authentication</h3>
            <p style={styles.featureDescription}>
              Secure access for Admins, Chemists, Pharmacists, and Developers.
            </p>
          </div>
          <div className="card" style={styles.featureCard}>
            <h3 style={styles.featureHeader}>3D Visualization</h3>
            <p style={styles.featureDescription}>
              Explore molecular structures in precise 3D detail.
            </p>
          </div>
          <div className="card" style={styles.featureCard}>
            <h3 style={styles.featureHeader}>Graph Analysis</h3>
            <p style={styles.featureDescription}>
              Interactive graphs to analyze scientific data.
            </p>
          </div>
          <div className="card" style={styles.featureCard}>
            <h3 style={styles.featureHeader}>Model Monitoring</h3>
            <p style={styles.featureDescription}>
              Monitor the performance of AI/ML models in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f2f2f2', // Light gray background
    padding: '20px',
    maxWidth: '100%',
    margin: '0 auto',
  },
  welcomeSection: {
    backgroundColor: '#fff', // Clean white background for contrast
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
  },
  logo: {
    width: '450px',
    height: '250px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#6a0dad', // Purple theme for title
    textAlign: 'center',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#0044cc', // Deep blue for a professional feel
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '20px',
  },
  roleForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    marginTop: '20px',
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  selectWrapper: {
    position: 'relative',
    width: '100%',
  },
  select: {
    padding: '12px',
    border: '2px solid #33ccff', // Electric blue border for interaction
    borderRadius: '5px',
    backgroundColor: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2333ccff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px top 50%',
    backgroundSize: '12px auto',
  },
  connectButton: {
    padding: '14px 24px',
    backgroundColor: '#00ff99', // Neon green for the login button
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    width: '100%',
    fontWeight: 'bold',
  },
  featuresSection: {
    width: '100%',
    maxWidth: '1000px',
    padding: '20px 0',
  },
  featureCards: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  featureCard: {
    flex: '1 1 200px',
    maxWidth: '280px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#e6e6e6', // Light gray background for feature cards
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  featureHeader: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#6a0dad', // Purple for feature titles
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#333',
    lineHeight: '1.5',
    textAlign: 'center',
  },
};


export default LandingPage;
