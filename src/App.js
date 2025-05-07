import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AdminProfile from "./components/AdminProfile";
import MedicineTypes from "./components/MedicineTypes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/profile" element={<AdminProfile />} />
        <Route exact path="/types" element={<MedicineTypes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

