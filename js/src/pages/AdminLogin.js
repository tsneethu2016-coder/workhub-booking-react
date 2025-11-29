import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminContext, UserContext } from "./userContext";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function AdminLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { Admin, setAdmin } = useContext(AdminContext);
  const [show, setShow] = useState("false");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please Fill Both Fields");
    } else {
      axios
        .get(
          `http://localhost:8000/admin?email=${data.email}&password=${data.password}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            alert("Invalid credentials");
            return;
          }

          const userObj = {
            name: res.data[0].email,
            email: res.data[0].password,
          };

          setAdmin(userObj);
          sessionStorage.setItem("admin", JSON.stringify(userObj));
          alert("Login successful");
          navigate("/admindashboard");
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
        <h2 className="display-5 text-info"> Admin Login</h2>
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
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <span
                  className="position-absolute top-50  translate-middle-y mt-4   me-5 end-0  "
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

              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
