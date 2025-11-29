import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { RiHomeOfficeFill } from "react-icons/ri";
import { GiOfficeChair } from "react-icons/gi";
import { BsCameraReelsFill } from "react-icons/bs";
import workHubVideo from "../assets/workHubVideo.mp4";

import pic from "../assets/homepic.avif";
import "./Home.css";
import { UserContext } from "./userContext";

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div>
      {/* Hero Section */}
      <section className=" text-center py-5  pt-0 hero">
        <div
          className="container-fluid hero-content"
          style={{ width: "100%", height: "500px", marginTop: "0px" }}
        >
          <h1
            className="display-4 fw-bold pt-3 text-center"
            style={{ color: "#5055bfff" }}
          >
            Welcome to Workhub
          </h1>
          <p className="fs-5">
            Flexible coworking spaces, private offices, and meeting rooms for
            all your needs.
          </p>
          {user ? (
            <Link
              to="/login"
              className="btn btn-light btn-lg mt-3 rounded-pill disabled"
            >
              Get Started Today
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn btn-light btn-lg mt-3 rounded-pill"
            >
              Get Started Today
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}

      <section className="py-5 bg-light ">
        <div className="container text-center  ">
          <h2 className="fw-bold mb-4 section-why">
            <BsRocketTakeoffFill /> Why Choose Workhub?
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <Link to="/pricing" className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0 feature-card">
                  <div className="card-body ">
                    <h5 className="card-title">
                      <GiOfficeChair /> Dedicated Desks
                    </h5>
                    <p
                      className="card-text fs-5"
                      style={{ maxWidth: "300px", margin: "0 auto" }}
                    >
                  Your own desk in a shared space, available 24/7 for booking (access between 9 AM – 9 PM).  
                         </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/pricing" className="text-decoration-none">
                <div className="card h-100   border-0 feature-card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <RiHomeOfficeFill /> Private Offices
                    </h5>
                    <p
                      className="card-text fs-5 "
                      style={{ maxWidth: "300px", margin: "0 auto" }}
                    >
                      Quiet, fully-equipped offices for individuals or teams.
                      Operating Hours: 9:00 AM – 9:00 PM
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            

            <div className="col-md-4">
              <Link to="/pricing" className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0 feature-card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <BsCameraReelsFill /> Meeting Rooms
                    </h5>
                    <p
                      className="card-text fs-5"
                      style={{ maxWidth: "300px", margin: "0 auto" }}
                    >
                     Bookable rooms with AV equipment for meetings and presentations.
Book anytime online — available for use during working hours.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 reviews">What Our Clients Say</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card shadow-sm p-4 text-center border-0 h-100 ">
                <p className="fst-italic pt-4 quote">
                  “Workhub has been a game-changer for my freelance design
                  business. The private offices and super-fast Wi-Fi let me
                  focus.”
                </p>
                <h6 className="mt-3 mb-0 fw-bold">— Aarav S.</h6>
                <small className="text-muted">Graphic Designer</small>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card shadow-sm h-100 p-4 text-center border-0">
                <p className="fst-italic pt-4 quote">
                  “Our early team needed a flexible space with meeting rooms on
                  demand. Workhub gave us professional facilities without a long
                  lease.”
                </p>
                <h6 className="mt-3 mb-0 fw-bold">— Meera K.</h6>
                <small className="text-muted">TechStart Co-founder</small>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card shadow-sm h-100 p-4 text-center border-0">
                <p className="fst-italic pt-4 quote">
                  “I work remotely and need a reliable workspace. Workhub's 24/7
                  access and friendly staff make every day easy.”
                </p>
                <h6 className="mt-3 mb-0 fw-bold">— Ravi P.</h6>
                <small className="text-muted">Software Engineer</small>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card shadow-sm h-100 p-4 text-center border-0">
                <p className="fst-italic pt-4 quote">
                  “Clients are always impressed when they visit our dedicated
                  office here. The atmosphere is vibrant but never distracting.”
                </p>
                <h6 className="mt-3 mb-0 fw-bold">— Divya L.</h6>
                <small className="text-muted">Marketing Consultant</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5 ">
        <div className=" d-flex justify-content-center" >
        <video width="850" height="450" controls>
          <source src ={workHubVideo} type="video/mp4"/>
           Your browser does not support the video tag.


        </video>
              </div>
        </div>
      

      {/* Call to Action */}
      <section className="bg-secondary text-white text-center py-5  ">
        <div className="container-fluid">
          <h3 className="fw-bold pt-2">Ready to work smarter?</h3>
          <p className="mb-0">
            Join WorkHub today and find your perfect workspace.
          </p>
          {user ? (
            <Link
              to="register"
              className="btn btn-light btn-lg rounded-pill disabled mt-2"
            >
              Register Now
            </Link>
          ) : (
            <Link
              to="register"
              className="btn btn-light btn-lg rounded-pill mt-2"
            >
              Register Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
