// src/pages/DashboardDev.js
import React from "react";
import { Link } from "react-router-dom";

const DashboardDev = () => {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>
        <span role="img" aria-label="Developer tools">🔧</span> Tableau de Bord - Développeur
      </h1>
      <p style={styles.subtitle}>
        Bienvenue, voici vos outils principaux pour le développement et le monitoring :
      </p>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <h2>Monitoring des Modèles</h2>
          <p>Suivez les performances des modèles IA/ML.</p>
          <Link to="/model-monitoring" style={styles.link}>
            Accéder au monitoring
          </Link>
        </div>
        <div style={styles.card}>
          <h2>Upload de Modèles</h2>
          <p>Soumettez de nouveaux modèles pour validation et déploiement.</p>
          <Link to="/upload-model" style={styles.link}>
            Upload un modèle
          </Link>
        </div>
        <div style={styles.card}>
          <h2>Logs et Erreurs</h2>
          <p>Consultez les logs système et les erreurs pour débogage.</p>
          <Link to="/logs" style={styles.link}>
            Voir les logs
          </Link>
        </div>
        <div style={styles.card}>
          <h2>Documentation API</h2>
          <p>Accédez à la documentation complète de l'API pour intégration.</p>
          <Link to="/api-docs" style={styles.link}>
            Accéder à la documentation
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
    color: "#ff69b4", // Rose thématique
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
    backgroundColor: "#8a2be2", // Mauve thématique
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default DashboardDev;