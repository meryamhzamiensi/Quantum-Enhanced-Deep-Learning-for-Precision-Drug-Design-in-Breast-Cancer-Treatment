import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateMedicine from "./components/UpdateMedicine";

// Core components
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import RemarquesPharmacien from "./components/RemarquesPharmacien";
import PredictionModel from "./components/PredictionModel";
// Molecule management
import MoleculeSubmissionForm from "./components/MoleculeSubmissionForm"; 
import CompoundInventory from './components/CompoundInventory';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Chemist Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/chemist" element={<Dashboard />} />
...

        {/* Admin Auth */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/remarques-pharmacien" element={<RemarquesPharmacien />} />
        <Route path="/prediction-model" element={<PredictionModel />} />

        {/* Molecule/Compound Management */}
        <Route path="/inventaire-molecules" element={<CompoundInventory />} />
        {/* Corrected route path to match the Link in CompoundInventory */}
        <Route path="/MoleculeSubmissionForm" element={<MoleculeSubmissionForm />} />
        <Route path="/update-medicine" element={<UpdateMedicine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
