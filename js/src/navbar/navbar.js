import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import pic from "../assets/workHubLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import "./navbar.css";
import { UserContext, AdminContext } from "../pages/userContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { admin, setAdmin } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  /* ---------- Logout Handlers ---------- */
  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    sessionStorage.removeItem("admin");
    navigate("/");
  };

  /* ---------- Render ---------- */
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
      {/* ---------- Brand ---------- */}
      <Link to="/" className="navbar-brand">
        <img src={pic} alt="WorkHub Logo" style={{ width: 150, height: 50 }} />
      </Link>

      {/* ---------- Mobile Toggle ---------- */}
      <button
        onClick={() => setOpen(!open)}
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* ---------- Nav Items ---------- */}

      <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {/* ----- No One Logged In ----- */}

          {!admin && !user && (
            <>
              {/* ----- Public Links ----- */}

              <li className="nav-item">
                <Link to="/" className="nav-link text-info">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link text-info"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/gallery" className="nav-link text-info">
                  Gallery
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link text-info">
                  Contact
                </Link>
              </li>

              <li className="nav-item dropdown">
                <button
                  id="loginMenu"
                  className="nav-link dropdown-toggle text-info btn btn-link pt-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </button>
                <ul
                  className=" fs-5 dropdown-menu dropdown-menu-start mt-3 mx-0 ms-3 shadow-sm border-0 "
                  style={{ background: "hsla(38, 77%, 49%, 0.05)" }}
                  aria-labelledby="loginMenu"
                >
                  <li>
                    <Link
                      to="/adminlogin"
                      className="dropdown-item  nav-item login-link  "
                      style={{ color: "#131014ff" }}
                    >
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="dropdown-item "
                      style={{ color: "#0f0c0eff" }}
                    >
                      Users
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}

          {/* ----- Admin Logged In ----- */}
          {admin && (
            <li className="nav-item dropdown">
              <button
                id="adminMenu"
                className="nav-link dropdown-toggle text-warning btn btn-link p-0 pt-2 px-1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {admin.email}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end mt-3 "
                aria-labelledby="adminMenu"
              >
                <li>
                  <Link to="/admindashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <button className="dropdown-item" onClick={handleAdminLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}

          {/* ----- User Logged In ----- */}

          {!admin && user && (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link text-info">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link text-info"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/gallery" className="nav-link text-info">
                  Gallery
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link text-info">
                  Contact
                </Link>
              </li>

              <li className="nav-item dropdown ">
                <button
                  id="userMenu"
                  className=" nav-link dropdown-toggle text-warning btn btn-link mt-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end mt-3"
                  aria-labelledby="userMenu"
                >
                  <li>
                    <Link to="/myprofile" className="dropdown-item">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="dropdown-item">
                      Membership Plans
                    </Link>
                  </li>

                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
