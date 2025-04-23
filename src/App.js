import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./components/LandingPage"; // Assurez-vous que le chemin est correct
import Unauthorized from "./components/Unauthorized";

// Dashboards
import Dashboard from "./pages/Dashboards/Dashboard";
import DashboardChimiste from "./pages/Dashboards/DashboardChimistes";
import DashboardDev from "./pages/Dashboards/DashboardPharma";

// Auth
import PrivateRoute from "./components/PrivateRoute";

// ✅ Import du Formulaire
import Form from "./components/login/Form"; 
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/Form" element={<Form />} /> {/* ✅ Route vers le form.js */}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "chimiste", "pharma", "dev"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/chimiste"
          element={
            <PrivateRoute allowedRoles={["chimiste"]}>
              <DashboardChimiste />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/dev"
          element={
            <PrivateRoute allowedRoles={["dev"]}>
              <DashboardDev />
            </PrivateRoute>
          }
        />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Not Found */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
