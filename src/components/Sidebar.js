// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import authentication context

const Sidebar = () => {
  const { user } = useAuth(); // Get user from context

  // If user is not logged in, do not render sidebar
  if (!user || !user.role) return null;

  return (
    <aside style={styles.sidebar}>
      {/* Sidebar Title */}
      <h2 style={styles.title}>
        <span role="img" aria-label="Microscope">🔬</span> Menu
      </h2>

      {/* Navigation Links */}
      <ul style={styles.menu}>
        {/* Common Dashboard Link */}
        <li>
          <Link to="/dashboard" style={styles.link}>
            Tableau de bord
          </Link>
        </li>

        {/* Role-Based Navigation */}
        {user.role === "chemist" && (
          <>
            <li>
              <Link to="/submit-molecule" style={styles.link}>
                Soumettre une molécule
              </Link>
            </li>
            <li>
              <Link to="/molecule-viewer" style={styles.link}>
                Visualisation 3D
              </Link>
            </li>
          </>
        )}

        {user.role === "pharmacist" && (
          <li>
            <Link to="/clinical-analysis" style={styles.link}>
              Analyse clinique
            </Link>
          </li>
        )}

        {user.role === "admin" && (
          <>
            <li>
              <Link to="/user-management" style={styles.link}>
                Gestion des utilisateurs
              </Link>
            </li>
            <li>
              <Link to="/role-management" style={styles.link}>
                Gestion des rôles
              </Link>
            </li>
          </>
        )}

        {user.role === "developer" && (
          <li>
            <Link to="/model-monitoring" style={styles.link}>
              Monitoring des modèles
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

// Styles
const styles = {
  sidebar: {
    width: "250px",
    background: "#ffffff",
    padding: "20px",
    height: "100vh",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    borderRight: "2px solid #eee",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    color: "#444",
    borderRadius: "5px",
    marginBottom: "10px",
    transition: "background-color 0.3s ease",
  },
};

export default Sidebar;
