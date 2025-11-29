import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { RiArrowGoBackLine } from "react-icons/ri";

function Viewquery() {
  const [values, setValues] = useState([]);

  //   const { id } = useParams();
  //   const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/contactus/")
      .then((response) => setValues(response.data))
      .catch((err) => console.log(err));
  }, []);

  //   const handleUpdate = (e) => {
  //     e.preventDefault();
  //     const phoneRegex = /^[6-9]\d{9}$/;
  //     if (!phoneRegex.test(values.phone)) {
  //       alert("Enter a valid 10-digit mobile number");
  //       return;
  //     }
  //     axios
  //       .get("http://localhost:8000/contact")
  //       .then(() => navigate("/myprofile"))
  //     // return alert("Updated Successfully")
  //     .catch(err => console.log(err))
  //   };
  return (
    <div>
      <h3 className="text-center text-primary fw-normal mb-4 display-5 mt-3">
        Enquiry Details
      </h3>

      <div className="  table-responsive-sm mt-3 text-center">
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {values.map((e) => {
              return (
                <tr>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.subject}</td>
                  <td>{e.msg}</td>
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

export default Viewquery;
