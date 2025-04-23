// src/pages/services/authService.js

const authService = {
  login: async (username, password) => {
    // Replace this with real authentication logic (e.g., API call)
    if (username === "admin" && password === "password") {
      localStorage.setItem("user", JSON.stringify({ username, role: "admin" }));
      return { success: true, user: { username, role: "admin" } };
    }
    if (username === "pharma" && password === "password") {
      localStorage.setItem("user", JSON.stringify({ username, role: "pharma" }));
      return { success: true, user: { username, role: "pharma" } };
    }
    if (username === "chimiste" && password === "password") {
      localStorage.setItem("user", JSON.stringify({ username, role: "chimiste" }));
      return { success: true, user: { username, role: "chimiste" } };
    }
    if (username === "dev" && password === "password") {
      localStorage.setItem("user", JSON.stringify({ username, role: "dev" }));
      return { success: true, user: { username, role: "dev" } };
    }
    return { success: false, message: "Invalid credentials" };
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  },
};

export default authService;