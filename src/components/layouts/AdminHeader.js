import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure to install axios

export default function AdminHeader(props) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    emailAddress: ""
  });
  
  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}` // or your auth method
          }
        });
        setUserData({
          userName: response.data.username,
          emailAddress: response.data.email
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, []);

  return (
    <>
      <div className="main-header">
        <div className="logo-header">
          <Link to="/" className="logo">
            Design4care
          </Link>
          <button
            className="navbar-toggler sidenav-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="collapse"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <button className="topbar-toggler more">
            <i className="la la-ellipsis-v"></i>
          </button>
        </div>
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="container-fluid">
            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li className="nav-item dropdown">
                <a
                  href="#"
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="dropdown-toggle profile-pic">
                  {" "}
                  <img
                    src={`assets/img/profile4.jpg`}
                    alt="user-img"
                    width="36"
                    className="img-circle"
                  />
                  <span>{userData.userName || "Username"}</span>{" "}
                </a>
                <ul className={`dropdown-menu dropdown-user ${showDropDown ? "show" : ""}`}>
                  <li>
                    <div className="user-box">
                      <div className="u-img">
                        <img src={`assets/img/profile4.jpg`} alt="user" />
                      </div>
                      <div className="u-text">
                        <h4>{userData.userName || "Username"}</h4>
                        <p className="text-muted">{userData.emailAddress || "Email"}</p>
                      </div>
                    </div>
                  </li>
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-divider"></div>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}