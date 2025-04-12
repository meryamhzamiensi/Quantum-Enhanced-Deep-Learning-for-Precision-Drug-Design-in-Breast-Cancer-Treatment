// src/pages/DashboardPharma.js
import React from "react";
import { Link } from "react-router-dom";

const DashboardPharma = () => {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>
        <span role="img" aria-label="Medical analysis">📋</span> Tableau de Bord - Pharmacien
      </h1>
      <p style={styles.subtitle}>
        Bienvenue, voici vos outils principaux pour l'analyse clinique :
      </p>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <h2>Analyse Clinique</h2>
          <p>Consultez les données cliniques et les résultats d'essais.</p>
          <Link to="/clinical-analysis" style={styles.link}>
            Accéder à l'analyse clinique
          </Link>
        </div>
        <div style={styles.card}>
          <h2>Visualisation des Résultats</h2>
          <p>Explorez les graphiques IC50, AUC et autres métriques.</p>
          <Link to="/results-visualization" style={styles.link}>
            Visualiser les résultats
          </Link>
        </div>
        <div style={styles.card}>
          <h2>Historique des Analyses</h2>
          <p>Suivez l'état de vos analyses précédentes.</p>
          <Link to="/analysis-history" style={styles.link}>
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
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
    transition: "transform 0.3s ease",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#8a2be2",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default DashboardPharma;