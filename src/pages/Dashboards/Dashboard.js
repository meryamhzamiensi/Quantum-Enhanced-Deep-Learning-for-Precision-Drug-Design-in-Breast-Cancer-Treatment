// src/pages/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userRole = localStorage.getItem("userRole") || ""; // Evite les erreurs si null

  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>
        <span role="img" aria-label="Microscope">🔬</span> Tableau de Bord
      </h1>
      <p style={styles.subtitle}>Bienvenue, voici vos outils principaux :</p>

      {/* Role-Specific Content */}
      <div style={styles.content}>
        {userRole === "CHEMIST" && (
          <>
            <div style={styles.card}>
              <h3>Soumission de Molécules</h3>
              <p>Envoyez de nouvelles molécules pour analyse.</p>
              <Link to="/submit-molecule" style={styles.link}>
                Soumettre une molécule
              </Link>
            </div>
            <div style={styles.card}>
              <h3>Visualisation 3D</h3>
              <p>Explorez les structures moléculaires en 3D.</p>
              <Link to="/molecule-viewer" style={styles.link}>
                Visualiser une molécule
              </Link>
            </div>
          </>
        )}

        {userRole === "PHARMACIST" && (
          <div style={styles.card}>
            <h3>Analyse Clinique</h3>
            <p>Consultez les données cliniques et les résultats d'analyse.</p>
            <Link to="/clinical-analysis" style={styles.link}>
              Accéder à l'analyse clinique
            </Link>
          </div>
        )}

        {userRole === "ADMIN" && (
          <>
            <div style={styles.card}>
              <h3>Gestion des Utilisateurs</h3>
              <p>Gérez les comptes utilisateurs et leurs permissions.</p>
              <Link to="/user-management" style={styles.link}>
                Gérer les utilisateurs
              </Link>
            </div>
            <div style={styles.card}>
              <h3>Gestion des Rôles</h3>
              <p>Attribuez ou modifiez les rôles des utilisateurs.</p>
              <Link to="/role-management" style={styles.link}>
                Gérer les rôles
              </Link>
            </div>
          </>
        )}

        {userRole === "DEVELOPER" && (
          <div style={styles.card}>
            <h3>Monitoring des Modèles</h3>
            <p>Suivez les performances des modèles IA/ML.</p>
            <Link to="/model-monitoring" style={styles.link}>
              Accéder au monitoring
            </Link>
          </div>
        )}

        {/* Message si rôle inconnu ou non défini */}
        {!["CHEMIST", "PHARMACIST", "ADMIN", "DEVELOPER"].includes(userRole) && (
          <p style={styles.errorMessage}>
            🚨 Votre rôle n'est pas reconnu. Contactez un administrateur.
          </p>
        )}
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
  errorMessage: {
    fontSize: "1.2rem",
    color: "red",
    marginTop: "20px",
  },
};

// Appliquer les effets `hover`
styles.card[":hover"] = styles.cardHover;
styles.link[":hover"] = styles.linkHover;

export default Dashboard;
