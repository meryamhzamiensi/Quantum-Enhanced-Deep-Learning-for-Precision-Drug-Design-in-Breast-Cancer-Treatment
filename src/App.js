import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AdminProfile from "./components/AdminProfile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/profile" element={<AdminProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

