import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const naviagte = useNavigate();
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [show, setShow] = useState(false);

  const emailChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({ ...prev, email: value }));
    if (!value) {
      setDuplicateEmail(false);
      return;
    }

    axios
      .get(`http://localhost:8000/users?email=${value}`)
      .then((res) => setDuplicateEmail(res.data.length > 0))

      .catch((err) => {
        console.log(err);
        setDuplicateEmail(false);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.password ||
      !data.confirmPassword
    ) {
      alert("Please Fill All Fields");
    }
    // Regex: starts with 6–9 and has exactly 10 digits
    else if (!phoneRegex.test(data.phone)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    // alert("Valid phone number!");
    // // send to backend here
    else if (data.password != data.confirmPassword) {
      alert("Password Must Be Match!");
    } else {
      axios
        .post("http://localhost:8000/users/", data)
        .then((res) => {
          alert("Registered Successfully");
          console.log(res);
          naviagte("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 className="fw-normal display-4 text-success">
          {" "}
          Register For Workhub
        </h2>
        <p className="text-muted">
          Create your account and start booking your workspace today!
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow p-4 bg-white rounded-4">
            <form onSubmit={handleRegister}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    name="name"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    autoComplete="off"
                    autoFocus
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Email Id</label>
                  <input
                    type="email"
                    value={data.email}
                    className={`form-control ${
                      duplicateEmail ? "is-invalid" : ""
                    }`}
                    placeholder="name@example.com"
                    name="email"
                    onChange={emailChange}
                    autoComplete="off"
                  />
                  {duplicateEmail && (
                    <div className="text-danger mt-1">Email Already Exists</div>
                  )}
                </div>

                <div className="col-12">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="9876543210"
                    name="phone"
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    autoComplete="off"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Password</label>
                  <input
                    type={show ? "password" : "text"}
                    className="form-control"
                    placeholder="Create a password"
                    name="password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    autoComplete="off"
                  />
                  <span
                    className="  mt-3 me-5 end-0  "
                    role="button"
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      top: "300px",
                    }}
                    onClick={() => setShow(!show)}
                  >
                    {/* {show ?
                                    // <FaEyeSlash /> :
                                    // <FaEye />
                                    } */}
                  </span>
                </div>

                <div className="col-12">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type={show ? "password" : "text"}
                    className="form-control "
                    placeholder="Re-enter password"
                    name="confirmPassword"
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
                    }
                    autoComplete="off"
                  />

                  <span
                    className="  mt-1 me-5 end-0  "
                    role="button"
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      top: "400px",
                    }}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="col-12 text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 rounded-pill"
                  >
                    Register
                  </button>
                </div>

                <div className="col-12 text-center mt-3">
                  <p className="text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-none">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
