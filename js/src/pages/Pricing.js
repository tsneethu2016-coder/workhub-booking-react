import React, { useContext, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";

import { RiHomeOfficeFill } from "react-icons/ri";
import { GiOfficeChair } from "react-icons/gi";
import { BsCameraReelsFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userContext";

function Pricing({ setuser }) {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        setData(res.data);
        console.log("fetched ");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-5 mb-5">
      {/* Header */}

      {/* <div className='dropdown  d-flex justify-content-end mt-0 me-0'>
        <button className='btn  dropdown-toggler' data-bs-toggle="dropdown">{name}</button>
        <ul className='dropdown-menu'>
          <li><Link to ="/myprofile" className='dropdown-item text-decoration-none'>My Profile</Link></li>
          <li><Link to ="/" className='dropdown-item text-decoration-none'>Logout</Link></li>


        </ul>
        
        </div> */}
      <div className="text-center mb-4">
        <h2 className="display-4"> Workhub Membership Plans</h2>
        <p className="text-muted">
          Choose the perfect plan for your work style and team size.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="row g-4 justify-content-center mt-4">
        {/* Plan 1 - Dedicated Desk */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 border-0 shadow rounded-4 text-center">
            <div className="card-body">
              <h5 className="card-title fw-bold">
                <GiOfficeChair style={{ color: "#4d2f6b" }} /> Dedicated Desk
              </h5>
              {/* <h3 className="text-primary fw-bold mb-3">
                ₹5,000<span className="fs-6"> /month</span>
              </h3> */}
              <ul className="list-unstyled text-muted mb-4">
                <li className="mt-4">
                  <FcApproval /> Personal desk in shared space
                </li>
                <li>
                  <FcApproval /> Book anytime online (24-hour availability)
                </li>
                <li>
                  <FcApproval /> High-Speed Wi-Fi
                </li>
                <li>
                  <FcApproval /> Complimentary Drinks
                </li>
                   <li> <FcApproval />Booking Per Month Only</li>
              </ul>
              {user ? (
                <Link
                  to="/dedicateddesk"
                  className="btn btn-outline-primary rounded-pill px-4 mt-4"
                >
                  Choose Plan
                </Link>
              ) : (
                <button
                  className="btn btn-outline-primary rounded-pill px-4 mt-4"
                  onClick={() => {
                    navigate("/login");
                    return alert("Please Login First");
                  }}
                >
                  Choose Plan
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Plan 2 - Private Office */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 border-0 shadow-lg rounded-4 text-center bg-light">
            <div className="card-body">
              <h5 className="card-title fw-bold">
                <RiHomeOfficeFill style={{ color: "#992249" }} /> Private Office
              </h5>
              {/* <h3 className="text-success fw-bold mb-3">
                ₹12,000<span className="fs-6"> /month</span>
              </h3> */}
              <ul className="list-unstyled text-muted mb-4">
                <li className=" mt-4">
                  <FcApproval /> Fully-equipped office space
                </li>
                <li>
                  <FcApproval /> Book anytime online (24-hour availability)
                </li>
                <li>
                  <FcApproval /> High-Speed Wi-Fi
                </li>
                <li>
                  <FcApproval /> Complimentary Drinks
                </li>
                <li>
                  <FcApproval /> Mail & Package Handling
                </li>
                   <li> <FcApproval />Booking Per Month </li>

              </ul>
              {user ? (
                <Link
                  to="/Privateoffice"
                  className="btn  rounded-pill  btn-outline-success px-4 "
                >
                  Choose Plan
                </Link>
              ) : (
                <button
                  className="btn btn-outline-primary rounded-pill px-4 "
                  onClick={() => {
                    navigate("/login");
                    return alert("Please Login First");
                  }}
                >
                  Choose Plan
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Plan 3 - Conference Room */}
        <div className="col-lg-4 col-md-6 ">
          <div className="card h-100 border-0 shadow rounded-4 text-center">
            <div className="card-body">
              <h5 className="card-title fw-bold">
                <BsCameraReelsFill style={{ color: "#8c6a20" }} /> Conference
                Room
              </h5>
              {/* <h3 className="text-danger fw-bold mb-3">
                ₹500<span className="fs-6"> /hour</span>
              </h3> */}
              <ul className="list-unstyled text-muted mb-4">
                
                <li className="mt-4">
                  <FcApproval /> A/V Equipment Included
                </li>
                <li>
                  <FcApproval /> Book anytime online (24-hour availability)
                </li>
                <li>
                  <FcApproval /> High-Speed Wi-Fi
                </li>
                <li>
                  <FcApproval /> Tea/Coffee Service
                </li>
                    <li>
                  <FcApproval />  Booking Per Hour
                </li>


              </ul>
              {user ? (
                <Link
                  to="/MeetingRoom"
                  className="btn btn-outline-danger rounded-pill px-4 mt-4"
                >
                  Choose Plans
                </Link>
              ) : (
                <button
                  className="btn btn-outline-primary rounded-pill px-4 mt-4"
                  onClick={() => {
                    navigate("/login");
                    return alert("Please Login First");
                  }}
                >
                  Choose Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* go to contact page */}
      <div className="text-center " style={{ marginTop: "100px" }}>
        <h4 className="fw-bold">Need a custom plan for your team?</h4>
        <p className="text-muted">
          Contact us and we will help you find the right workspace solution.
        </p>
        <a href="contact" className="btn btn-primary rounded-pill px-4">
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default Pricing;
