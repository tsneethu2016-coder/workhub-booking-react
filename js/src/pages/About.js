import React from "react";
import image from "../assets/Aboutpage.jpg";
import image2 from "../assets/Aboutimage2.webp";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
function About() {
  return (
    <>
      <div className=" container">
        <div className="row align-items-center">
          <div className="col-md-6 ">
            <h2 className="ms-4 display-4 " style={{ color: "#00b8d9" }}>
              About Workhub
            </h2>
            <h3 className="mt-4">Empowering the Future of Work</h3>
            <p className=" fs-5">
              At Workhub, we believe that the workspace is more than just a desk
              — it's where ideas are born, connections are made, and success
              takes shape. Founded with the mission to revolutionize how people
              work, WorkHub provides dynamic coworking spaces tailored to meet
              the diverse needs of freelancers, startups, and growing
              businesses.
            </p>
          </div>
          <div className="col-md-6 mt-5" style={{ width: "600px" }}>
            <img
              src={image}
              style={{ width: "600px", height: "500px" }}
              className="img-fluid justify-content-sm-center text-center me-sm-5 ms-0"
            />
          </div>
        </div>
      </div>
      {/* next section     */}

      <div className=" container my-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={image2}
              style={{ width: "600px", height: "auto" }}
              className="img-fluid justify-content-sm-center me-sm-5"
            />
          </div>
          <div className="col-md-6  mt-3">
            <h3 className=""> Our Mission</h3>
            <p className=" fs-5">
              Our mission is to create inspiring, flexible, and collaborative
              environments that empower professionals to do their best work.
              Whether you're looking for a quiet spot to focus or a vibrant
              community to network with, WorkHub is designed to support your
              goals.
            </p>
          </div>
        </div>
      </div>
      <div className=" container mt-4">
        <div className="row align-items-center">
          <div className="col-md-12">
            <h3> What Makes Us Different?</h3>
            <ul  style ={{listStyleType: "disc" }}className=" fs-5 ">
            <li className="pt-2"> <span className="fw-bold">Flexible Memberships :</span>
             From Monthly access to dedicated desks and private offices and hourly access to conference rooms, we offer options that fit your workflow and budget.</li>

            <li className="pt-2"><pan className="fw-bold">State-of-the-Art Facilities : </pan>Enjoy high-speed internet, modern meeting rooms, and comfortable lounge areas.
</li>
           <li className="pt-2"><span className="fw-bold">Community-Driven : </span>We foster a supportive network of like-minded professionals through events, workshops, and social activities.
            </li>
         <li  className="pt-2"> <span className="fw-bold">Online Booking, 24/7 :</span> Book your workspace anytime, day or night, through our online system — available round the clock.
              </li>
            <li className="pt-2"><span className="fw-bold">Operating Hours :</span> Our physical spaces are open from 9:00 AM to 9:00 PM, ensuring a productive and comfortable environment for all.
                       </li>
                        </ul>
          </div>
        </div>
      </div>

      <div className=" container mt-4">
        <div className="row align-items-center">
          <div className="col-md-12">
            <h3> Our Vision</h3>
            <p className=" fs-5">
              We envision a future where workspaces inspire innovation and
              foster growth for individuals and businesses alike. Workhub is
              more than just an office — it's a community designed to help you
              thrive.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
