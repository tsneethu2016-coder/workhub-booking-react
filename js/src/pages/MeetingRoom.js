import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import { DesktypeContext } from "./DesktypeContext";

function MeetingRoom() {
  const [data, setData] = useState([]);
   const {setDeskType} = useContext(DesktypeContext)

  useEffect(() => {
    axios
      .get("http://localhost:8000/room")
      .then((res) => {
        setData(res.data);
         setDeskType(res.data[0])
         
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-2 mb-5">
      {/* Header */}
      <div className="text-center mb-5 pt-4">
        <h2 className="fw-normal display-6 text-warning">Conference Rooms</h2>
        <p className="text-muted"> Choose Your Space </p>
      </div>

      {/* Conference Rooms*/}
      <div className="row g-4 justify-content-center ">
        {/* Mapping */}

        {data.map((e) => (
          <div  className="col-md-4 col-lg-4 col-sm-6 col-12">
            <div className="card h-100 w-100  border-0 shadow rounded-4 text-center">
              <img
                src={e.imagepath}
                className="card-img-top img-fluid "
                style={{ width: "500px", height: "300px" }}
              />
              <div className="card-body">
                <h2 className="card-title fw-bold text-success">{e.id}({e.type}) </h2>
                <h4>{e.people}</h4>
                <h3 className="text-primary fw-bold mb-3">
                  <FaRupeeSign className="text-primary fs-4 fw-bold mb-2" />
                  {e.price}
                  <span className="fs-6"> {e.perhour}</span>
                </h3>
                <ul className="list-unstyled text-muted mb-4">
                  {e.details.map((u, i) => (
                    <li key="i">{u}</li>
                  ))}
                </ul>
                {
                  e.available?(<Link
                  to={`/booking/${e.id}/${e.bookingcheck}`}
                  className="btn btn-outline-success rounded-pill px-4"
                >
                  Available
                </Link>):
                (
                  <Link
                  to="/booking"
                  className="btn btn-outline-success rounded-pill px-4 disabled"
                >
                  Unvailable
                </Link>
                )
                }
                
              </div>
            </div>
          </div>
        ))}

        {/* go to contact page Customize */}
        <div className="text-center mt-5">
          <h4 className="fw-bold">Need a custom plan for your team?</h4>
          <p className="text-muted">
            Contact us and we will help you find the right workspace solution.
          </p>
          <Link to="contact" className="btn btn-primary rounded-pill px-4">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MeetingRoom;
