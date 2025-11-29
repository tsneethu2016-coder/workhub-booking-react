import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    msg: "",
  });
const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.subject ||
      !data.msg
    ) {
      alert("Please Fill All Fields");
    } else {
      axios
        .post("http://localhost:8000/contactus/", data)
        .then((res) => {
          console.log(res);
           navigate("/")
          return alert("Submited succesfully")
         
        })
        .catch((err) => {
          console.log(err);
          return alert("Failed");
        });
    }
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 className="display-4" style={{ color: "#00b8a9" }}>
          {" "}
          Contact Us
        </h2>
        <p className="text-muted">
          We would love to hear from you! Reach out with any questions or
          booking needs.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow p-4 bg-white rounded-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    name="name"
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    name="email"
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="9876543210"
                    name="phone"
                    onChange={(e) => {
                      setData({ ...data, phone: e.target.value });
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject of your message"
                    name="subject"
                    onChange={(e) => {
                      setData({ ...data, subject: e.target.value });
                    }}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Type your message here..."
                    name="msg"
                    onChange={(e) => {
                      setData({ ...data, msg: e.target.value });
                    }}
                  ></textarea>
                </div>

                <div className="col-12 text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 rounded-pill"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="text-center mt-5">
            <p className="fw-bold mb-1"> Workhub Address:</p>
            <p className="text-muted">V Mall ,Thrissur</p>
            <p className="fw-bold mb-1"> Email:workhubthrissur.gmail.com</p>
            <p className="text-muted">support@workhub.com</p>
            <p className="fw-bold mb-1"> Phone:</p>
            <p className="text-muted">+91 904887 3458</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
