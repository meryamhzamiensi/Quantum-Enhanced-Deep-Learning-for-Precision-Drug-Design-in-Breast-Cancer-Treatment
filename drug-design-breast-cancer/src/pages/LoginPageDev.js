// src/pages/LoginPageDev.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./services/authService"; // Default import

const LoginPageDev = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login(email, password); // Access login method

      if (response.success && response.user.role === "dev") {
        navigate("/dashboard/developer");
      } else {
        setError("Invalid credentials or not authorized as a developer.");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>
          <span role="img" aria-label="Connexion sécurisée">🔒</span> Connexion Développeur
        </h2>

        {error && <p style={styles.error} id="login-error">{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setError("")}
            style={styles.input}
            required
            aria-describedby="login-error"
          />

          {/* Password Field */}
          <label htmlFor="password" style={styles.label}>
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError("")}
            style={styles.input}
            required
            aria-describedby="login-error"
          />

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  loginBox: {
    width: "350px",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ff69b4", // Pink theme
    textAlign: "center",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "12px",
    backgroundColor: "#8a2be2", // Purple theme
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default LoginPageDev;