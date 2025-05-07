import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import './Sidebar.css';

const Sidebar = ({ collapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="photo">
            <img src={user?.profilePic || "assets/img/profile4.jpg"} alt="Profile" />
          </div>
          {!collapsed && (
            <div className="info">
              <span>
                {user?.username || "Guest"}
                <span className="user-level">{user?.user_type || "User"}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      <ul className="nav">
        <li className="nav-item">
          <Link to="/dashboard-admin">
            <i className="la la-dashboard"></i>
            {!collapsed && <p>Liste utilisateurs</p>}
          </Link>
        </li>
        
        <li className="nav-item">
          <a onClick={handleLogout}>
            <i className="la la-power-off"></i>
            {!collapsed && <p>Déconnexion</p>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;