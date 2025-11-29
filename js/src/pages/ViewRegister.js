import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

function ViewRegister() {
  const [data, setData] = useState([]);

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
    <div>
      <div className="d-flex justify-content-center align-items-center">
        {" "}
        <h3 className="mt-3 text-center display-4 text-info">
          Registered User Details
        </h3>
      </div>

      <div className="table-responsive mt-3 text-center">
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => {
              return (
                <tr>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex float-end me-5">
        <Link to="/admindashboard" className="btn btn-secondary ">
          <RiArrowGoBackLine />
        </Link>
      </div>
    </div>
  );
}
export default ViewRegister;
