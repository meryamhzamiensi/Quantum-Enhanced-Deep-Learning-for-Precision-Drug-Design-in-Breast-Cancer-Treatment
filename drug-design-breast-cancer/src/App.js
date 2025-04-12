import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPageAdmin from "./components/login/LoginPageAdmin"; 
import LoginPageChimiste from "./components/login/LoginPageChimiste"; 
import LoginPagePharma from "./components/login/LoginPagePharma"; 
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboards/Dashboard";
import LoginRolesPage from "./components/login/roles"; 

// Importing Sign-Up Pages for each role
import SignUpPageAdmin from "./components/signup/SignUpPageAdmin"; 
import SignUpPageChimiste from "./components/signup/SignUpPageChimiste"; 
import SignUpPagePharma from "./components/signup/SignUpPagePharma"; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* New Login Roles Page */}
        <Route path="/login/roles" element={<LoginRolesPage />} /> {/* New route for role selection */}

        {/* Role-Specific Login Pages */}
        <Route path="/login/admin" element={<LoginPageAdmin />} />
        <Route path="/login/chimiste" element={<LoginPageChimiste />} />
        <Route path="/login/pharma" element={<LoginPagePharma />} />

        {/* Role-Specific Sign-Up Pages */}
        <Route path="/signup/admin" element={<SignUpPageAdmin />} />
        <Route path="/signup/chimiste" element={<SignUpPageChimiste />} />
        <Route path="/signup/pharma" element={<SignUpPagePharma />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "chimiste", "pharma", "dev"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Unauthorized Access Route */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

        {/* Fallback Route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
