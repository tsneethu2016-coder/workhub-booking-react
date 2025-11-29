import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";

function Update() {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/" + id)
      .then((response) => setValues(response.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleUpdate = () => {
    axios
      .put("http://localhost:8000/users/" + id, values)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update A User</h1>

        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>

            <input
              type="text"
              name="names"
              className="form-control"
              placeholder="Enter name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email:</label>

            <input
              type="text"
              name="email1"
              className="form-control"
              placeholder="Enter email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div>
            <button className="btn btn-success">Update</button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
