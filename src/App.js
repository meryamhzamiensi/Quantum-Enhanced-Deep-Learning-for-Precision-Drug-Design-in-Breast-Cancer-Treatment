import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Form from './components/login/Form';
import LandingPage from './components/LandingPage';
import Unauthorized from './components/Unauthorized';
import DashboardAdmin from './pages/Dashboards/dashboard-admin';
import DashboardPharma from './pages/Dashboards/DashboardPharma';
import DashboardChimistes from './pages/Dashboards/DashboardChimistes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Form />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<LandingPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard-admin" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <DashboardAdmin />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard-pharma" 
            element={
              <PrivateRoute allowedRoles={['pharma']}>
                <DashboardPharma />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard-chimistes" 
            element={
              <PrivateRoute allowedRoles={['chemist']}>
                <DashboardChimistes />
              </PrivateRoute>
            } 
          />
          
          {/* Default route redirects to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;