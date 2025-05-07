import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
              {userData?.user_type || "Chimiste"} {/* Fallback to "User" if user_type is missing */}
            </span>
          </span>
          </a> {/* Closing anchor tag */}
          </div>
        </div>

        <ul className="nav">
          <li className="nav-item">
            <Link to="/chemist">
              <i className="la la-dashboard"></i>
              <p>Dashboard</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/MoleculeSubmissionForm">
              <i className="la la-flask"></i>
              <p>Soumettre Molécule</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/inventaire-molecules" className="nav-link">
              <i className="la la-list-ul"></i>
              <p>Inventaire Molécules</p>
            </Link>
          </li>


          <li className="nav-item">
            <Link to="/remarques-pharmacien">
              <i className="la la-comment"></i>
              <p>Remarque Pharmacien</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/prediction-model">
              <i className="la la-cogs"></i>
              <p>Choisir Modèle de Prédiction</p>
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
