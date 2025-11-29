import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, AdminContext } from "./userContext";

function Login() {
  const { setUser } = useContext(UserContext);
  const [show, setShow] = useState("false");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please Fill Both Fields");
    } else {
      axios
        .get(
          `http://localhost:8000/users?email=${data.email}&password=${data.password}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            alert("Invalid credentials");
            return;
          }

          const userObj = {
            id: res.data[0].id,
            name: res.data[0].name,
            email: res.data[0].email,
            phone: res.data[0].phone,
          };

          setUser(userObj);
          sessionStorage.setItem("user", JSON.stringify(userObj));
          alert("Login successful");
          navigate("/pricing");
        })
        .catch((err) => {
          console.error(err);
          alert("Login request failed");
        });
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 className="display-5 text-info"> User Login</h2>
        <p className="text-muted">
          Access your account and manage your bookings.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card shadow p-4 bg-white rounded-4">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  type={show ? "password" : "text"}
                  className="form-control "
                  placeholder="Enter your password "
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />

                <span
                  className="position-absolute top-50    translate-middle-y   me-5  end-0  "
                  role="button"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 rounded-pill"
                >
                  Login
                </button>
              </div>

              <div className="text-center mt-3">
                <p className="text-muted">
                  New to WorkHub?{" "}
                  <Link to="/register" className="text-decoration-none">
                    {" "}
                    Register here{" "}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
