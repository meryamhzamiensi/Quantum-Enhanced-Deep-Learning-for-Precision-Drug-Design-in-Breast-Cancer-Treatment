import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { jwtDecode } from "jwt-decode";  // Updated import statement
export default function AdminSideBar(props) {
  const [userData, setUserData] = useState({
    username: "",
    user_type: ""
  });

  useEffect(() => {
    const fetchUserData = () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const decoded = jwtDecode(token);  // Now using the named import
          setUserData({
            username: decoded.username || decoded.email,
            user_type: decoded.user_type || "Admin"
          });
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    fetchUserData();
  }, [])
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "http://localhost:3001/login";
      })
      .catch((err) => {
        console.error("Logout error: ", err);
      });
  };
  return (
    <div className="sidebar">
      <div className="scrollbar-inner sidebar-wrapper">
        <div className="user">
          <div className="photo">
            <img src={`assets/img/profile4.jpg`} alt="User profile" />
          </div> {/* Closing div for photo */}
          <div className="info">
          <a href="/profile"> {/* Valid link with href for accessibility */}
          <span>
            {userData?.username || "Guest"} {/* Fallback to "Guest" if username is missing */}
            <span className="user-level">
              {userData?.user_type || "Admin"} {/* Fallback to "User" if user_type is missing */}
            </span>
          </span>
          </a> {/* Closing anchor tag */}
          </div>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/">
              <i className="la la-users"></i>
              <p>Liste d'utilisateurs</p>
            </Link>
          </li>
        
          <li className="nav-item">
            <Link onClick={handleLogout}>
              <i className="la la-power-off"></i>
              <p>Déconnexion</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}