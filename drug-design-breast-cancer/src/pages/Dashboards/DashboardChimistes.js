// src/pages/DashboardChimistes.js
import React from "react";
import { Link } from "react-router-dom";

const DashboardChimistes = () => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "CHEMIST") {
    return (
      <div style={styles.container}>
        <h1 style={styles.errorTitle}>🚨 Accès refusé</h1>
        <p style={styles.errorMessage}>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>
        <span role="img" aria-label="Microscope">🔬</span> Tableau de Bord - Chimiste
      </h1>
      <p style={styles.subtitle}>
        Bienvenue, voici vos outils principaux pour gérer les molécules :
      </p>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <h2>Soumission de Molécules</h2>
          <p>Envoyez de nouvelles molécules pour analyse.</p>
          <Link to="/submit-molecule" style={styles.link}>
            Soumettre une molécule
          </Link>
        </div>
        <div style={styles.card}>
          <h2>Visualisation 3D</h2>
          <p>Explorez les structures moléculaires en 3D.</p>
          <Link to="/molecule-viewer" style={styles.link}>
            Visualiser une molécule
          </Link>
        </div>
        <div style={styles.card}>
          <h2>Historique des Soumissions</h2>
          <p>Suivez l'état de vos soumissions précédentes.</p>
          <Link to="/submission-history" style={styles.link}>
            Voir l'historique
          </Link>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Open Sans', sans-serif",
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ff69b4",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#555",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#8a2be2",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#6c21a7",
  },
  errorTitle: {
    fontSize: "2rem",
    color: "red",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  errorMessage: {
    fontSize: "1.2rem",
    color: "#555",
  },
};

// Effets `hover`
styles.card[":hover"] = styles.cardHover;
styles.link[":hover"] = styles.linkHover;

export default DashboardChimistes;
