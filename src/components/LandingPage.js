import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/login/Form');  // Redirige vers /form, sans besoin de .html
  };

  return (
    <div style={styles.container}>
      {/* Welcome Section */}
      <div style={styles.welcomeSection}>
        <h1 style={styles.title}>Quantum-Enhanced Deep Learning</h1>
        <p style={styles.subtitle}>
          Transforming Drug Design for Breast Cancer through Innovation
        </p>
        <button onClick={handleEnterClick} style={styles.enterBtn}>
          Enter Site
        </button>
      </div>

      {/* Feature Cards Section */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Our Features</h2>
        <div style={styles.featureCards}>
          {/* Feature Cards */}
          <div style={styles.featureCard}>
            <h3 style={styles.featureHeader}>3D Visualization</h3>
            <p style={styles.featureDescription}>
              Explore molecular structures in precise 3D detail.
            </p>
          </div>
          <div style={styles.featureCard}>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    color: 'white',
    fontFamily: "'Open Sans', sans-serif",
    textAlign: 'center',
    padding: '20px',
  },
  welcomeSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
    width: '100%',
    maxWidth: '800px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px #000',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#d0d0d0',
    marginTop: '10px',
    marginBottom: '30px',
  },
  enterBtn: {
    backgroundColor: '#00c9a7',
    color: 'white',
    padding: '0.8rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  featuresSection: {
    width: '100%',
    padding: '20px 0',
  },
  featuresTitle: {
    fontSize: '1.5rem',
    fontWeight: '300',
    color: '#d0d0d0',
    marginBottom: '2rem',
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
    backgroundColor: '#e6e6e6',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
  },
  featureHeader: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#6a0dad',
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#333',
    marginTop: '10px',
  },
};

export default LandingPage;
