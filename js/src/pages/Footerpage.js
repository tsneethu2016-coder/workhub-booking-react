import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import pic from "../assets/workHubLogo.png";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-0 mt-2 ">
      <div className="container-fluid">
        <div className="row">
          {/* Brand Info */}
          <div className="col-md-4 mb-4">
            <img src={pic} style={{ width: "150px", height: "50px" }} />
            <p>
              Your trusted coworking space for productivity and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3 ms-auto">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white text-decoration-none" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/About">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/Booking">
                  Booking
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/Contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center mb-0">
          &copy; 2025 WorkHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
