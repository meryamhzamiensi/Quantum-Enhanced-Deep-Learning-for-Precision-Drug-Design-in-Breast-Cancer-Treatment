// src/index.js

import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App";
import "./index.css";

// Get the root DOM element
const container = document.getElementById("root");

// Create a root instance
const root = createRoot(container);

// Render the app using the new createRoot API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);