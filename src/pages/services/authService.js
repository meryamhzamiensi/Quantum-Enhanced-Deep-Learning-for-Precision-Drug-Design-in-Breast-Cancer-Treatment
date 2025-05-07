// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}login/`, {
        email,    // Changed from username
        password
      });
      
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_role', response.data.user?.role);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (email, username, password, role) => {
    try {
      const response = await axios.post(`${API_URL}register/`, {
        email,
        username,
        password, 
        role
      });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
  },

  getCurrentUser: () => {
    return {
      role: localStorage.getItem('user_role') || null,
      token: localStorage.getItem('access_token') || null
    };
  },

  handleGoogleAuth: () => {
    window.location.href = `${API_URL}google/`;
  }
};
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
  window.postMessage({ type: 'AUTH_TOKEN', token }, '*'); // Pour communication entre apps
};

export default authService;