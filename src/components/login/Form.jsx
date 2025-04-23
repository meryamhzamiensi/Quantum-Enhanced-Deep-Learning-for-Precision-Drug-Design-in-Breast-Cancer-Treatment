
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Remplacement de useHistory par useNavigate
import './form.css'; // Assurez-vous que le chemin est correct

const Form = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [role, setRole] = useState('admin'); // Valeur par défaut
  const navigate = useNavigate(); // Utilisation de useNavigate

  const toggleForm = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirection vers le tableau de bord approprié
    if (role === 'admin') {
      navigate('/dashboard-admin');
    } else if (role === 'pharma') {
      navigate('/dashboardpharma');
    } else if (role === 'chemist') {
      navigate('/pages/Dashboards/DashboardChimistes');
    }
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Formulaire de Connexion */}
          <form className={`sign-in-form ${isSignUpMode ? '' : 'active'}`} onSubmit={handleSubmit}>
            <h2 className="title">Connexion</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nom d'utilisateur" required />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mot de passe" required />
            </div>
            <div className="input-field">
              <i className="fas fa-user-tag"></i>
              <select className="role-select" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="admin">Administrateur</option>
                <option value="pharma">Pharmaceutique</option>
                <option value="chemist">Chimiste</option>
              </select>
            </div>
            <input type="submit" value="Connexion" className="btn solid" />
            <p className="social-text">Ou connectez-vous avec Google</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>

          {/* Formulaire d'Inscription */}
          <form className={`sign-up-form ${isSignUpMode ? 'active' : ''}`} onSubmit={handleSubmit}>
            <h2 className="title">Inscription</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nom d'utilisateur" required />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mot de passe" required />
            </div>
            <div className="input-field">
              <i className="fas fa-user-tag"></i>
              <select className="role-select" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="admin">Administrateur</option>
                <option value="pharma">Pharmaceutique</option>
                <option value="chemist">Chimiste</option>
              </select>
            </div>
            <input type="submit" className="btn" value="Inscription" />
            <p className="social-text">Ou inscrivez-vous avec Google</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* PANELS */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>N ouveau ici ?</h3>
            <button className="btn transparent" onClick={toggleForm}>Inscription</button>
          </div>
          <img src="img/log.svg" className="image" alt="Illustration de connexion" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Déjà membre ?</h3>
            <button className="btn transparent" onClick={toggleForm}>Connexion</button>
          </div>
          <img src="img/register.svg" className="image" alt="Illustration d'inscription" />
        </div>
      </div>
    </div>
  );
};

export default Form;