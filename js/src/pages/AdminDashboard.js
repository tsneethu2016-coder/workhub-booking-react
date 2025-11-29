
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold display-4 mb-5">
        Admin Dashboard
      </h2>

      <div className="row justify-content-center align-items-center g-4">
        {/* User Registration Card */}
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="card card-xl bg-light shadow-sm text-center h-100 mt-2 border-0 rounded-4 hover-shadow">
            <div className="card-body d-flex flex-column p-4">
              <h3 className=" display-5 card-text border-0 text-success p-0 mb-4 pt-4 text-center">
                User Registration Details
              </h3>
              <div className="mt-auto text-center">
                <Link
                  to="/ViewRegister"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* User Booking Card */}
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="card card-xl bg-light shadow-sm h-100 mt-2 border-0 rounded-4 hover-shadow">
            <div className="card-body d-flex flex-column p-4">
              <h3 className="card-text display-5 border-0 text-success p-0 mb-4 pt-4 text-center">
                User Booking Details
              </h3>
              <div className="mt-auto text-center">
                <Link
                  to="/ViewBookings"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Card */}
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="card card-xl bg-light shadow-sm h-100 mt-2 border-0 rounded-4 hover-shadow">
            <div className="card-body d-flex flex-column p-4">
              <h3 className="card-text display-5 text-center border-0 text-success p-0 mb-5 pt-4">
                Enquiry Details
              </h3>
              <div className="mt-auto text-center">
                <Link
                  to="/viewquery"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
