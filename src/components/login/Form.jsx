import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './form.css';
import { useAuth } from '../AuthContext';

const Form = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    user_type: ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:8000/api/';
  const { login } = useAuth();

  const toggleForm = () => {
    setIsSignUpMode(!isSignUpMode);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log("Role selected:", value); // Debug
  };

  // Modified handleLogin to properly use the context login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      // Use the context login function instead of direct axios call
      const result = await login({
        username: formData.username,
        password: formData.password,
        user_type: formData.user_type
      });
      
      if (result.success) {
        // Navigate based on user_type returned from the login function
        switch(result.userType) {
          case 'admin':
            navigate('/dashboard-admin');
            break;
          case 'pharma':
            navigate('/dashboard-pharma');
            break;
          case 'chemist':
            navigate('/dashboard-chimistes');
            break;
          default:
            navigate('/dashboard'); // Fallback
        }
      } else {
        setError(result.error || 'Erreur de connexion');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.user_type) {
      setError("Veuillez sélectionner un rôle");
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      const response = await axios.post(`${API_URL}register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        user_type: formData.user_type
      });
  
      // After successful registration, use the login function from context
      const result = await login({
        username: formData.username,
        password: formData.password,
        user_type: formData.user_type
      });
      
      if (result.success) {
        // Navigate based on user_type returned from the login function
        switch(result.userType) {
          case 'admin':
            navigate('/dashboard-admin');
            break;
          case 'pharma':
            navigate('/dashboard-pharma');
            break;
          case 'chemist':
            navigate('/dashboard-chimistes');
            break;
          default:
            navigate('/dashboard'); // Fallback
        }
      } else {
        setError(result.error || 'Erreur après inscription');
      }
      
    } catch (err) {
      const backendError = err.response?.data;
      console.log("Backend error details:", backendError); // Debug détaillé
      
      if (backendError) {
        // Affichez les erreurs de validation spécifiques
        if (backendError.username) {
          setError(`Nom d'utilisateur: ${backendError.username.join(', ')}`);
        } else if (backendError.email) {
          setError(`Email: ${backendError.email.join(', ')}`);
        } else if (backendError.password) {
          setError(`Mot de passe: ${backendError.password.join(', ')}`);
        } else if (backendError.user_type) {
          setError(`Rôle: ${backendError.user_type.join(', ')}`);
        } else {
          setError(backendError.detail || "Erreur technique lors de l'inscription");
        }
      } else {
        setError("Problème de connexion au serveur");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Login Form */}
          <form 
            className={`sign-in-form ${isSignUpMode ? '' : 'active'}`} 
            onSubmit={handleLogin}
          >
            <h2 className="title">Connexion</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                name="username"
                placeholder="Nom d'utilisateur" 
                value={formData.username}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input 
                type="password" 
                name="password"
                placeholder="Mot de passe" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user-tag"></i>
              <select 
              name="user_type"
              className="role-select" 
              value={formData.user_type}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner un rôle</option>
              <option value="admin">Administrateur</option>
              <option value="pharma">Pharmaceutique</option>
              <option value="chemist">Chimiste</option>
              </select>

            </div>
            <input 
              type="submit" 
              value={isLoading ? 'Chargement...' : 'Connexion'} 
              className="btn solid" 
              disabled={isLoading}
            />
            <p className="social-text">Ou connectez-vous avec Google</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>

          {/* Registration Form */}
          <form 
            className={`sign-up-form ${isSignUpMode ? 'active' : ''}`} 
            onSubmit={handleRegister}
          >
            <h2 className="title">Inscription</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                name="username"
                placeholder="Nom d'utilisateur" 
                value={formData.username}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input 
                type="password" 
                name="password"
                placeholder="Mot de passe" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user-tag"></i>
              <select 
                name="user_type"
                className="role-select" 
                value={formData.user_type}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner un rôle</option>
                <option value="admin">Administrateur</option>
                <option value="pharma">Pharmaceutique</option>
                <option value="chemist">Chimiste</option>
              </select>
            </div>
            <input 
              type="submit" 
              className="btn" 
              value={isLoading ? 'Chargement...' : 'Inscription'} 
              disabled={isLoading}
            />
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
            <h3>Nouveau ici ?</h3>
            <button 
              className="btn transparent" 
              onClick={toggleForm}
              disabled={isLoading}
            >
              Inscription
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="Illustration de connexion" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Déjà membre ?</h3>
            <button 
              className="btn transparent" 
              onClick={toggleForm}
              disabled={isLoading}
            >
              Connexion
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="Illustration d'inscription" />
        </div>
      </div>
    </div>
  );
};

export default Form;