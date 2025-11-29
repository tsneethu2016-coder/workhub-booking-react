import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { DesktypeContext } from "./DesktypeContext";
import { SearchContext } from "./Searchcontext";


function Private() {
  const [data, setData] = useState([]);
  const {setDeskType} = useContext(DesktypeContext)
  const {searchTerm, setSearchTerm} = useContext(SearchContext)

  useEffect(() => {
    axios
      .get("http://localhost:8000/privateoffice")
      .then((res) => {
        setData(res.data);
         setDeskType(res.data)
         console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const term = searchTerm.trim().toLowerCase();

  let filterDesks = data;

  if(term === "available"){
    filterDesks = data.filter((desk)=>desk.available===true)
  }

  
  
  if(term === "unavailable"){
        filterDesks = data.filter((desk)=>desk.available===false)

  }
  if(term === "basic" || term === "2 People"){
        filterDesks = data.filter((desk)=>desk.type==="Basic" )

   }
   if(term === "basic available"){
        filterDesks = data.filter((desk)=>desk.type==="Basic"&& desk.available=== true )

   }
   if(term === "basic unavailable"){
        filterDesks = data.filter((desk)=>desk.type==="Basic"&& desk.available=== false )

   }
  if(term === "standard" ){
        filterDesks = data.filter((desk)=>desk.type==="Standard")

  }
  if(term === "standard unavailable"){
        filterDesks = data.filter((desk)=>desk.type==="Standard"&& desk.available=== false )

   }

   if(term === "standard available"){
        filterDesks = data.filter((desk)=>desk.type==="Standard"&& desk.available=== true )

   }

  if(term === "premium" ){
        filterDesks = data.filter((desk)=>desk.type==="Premium")

  }
if(term === "premium available"){
        filterDesks = data.filter((desk)=>desk.type==="Premium"&& desk.available=== true )

   }
   if(term === "premium unavailable"){
        filterDesks = data.filter((desk)=>desk.type==="Premium"&& desk.available=== false )

   }
  else if(term === "view all"|| term === ""){
    filterDesks = data;
  }


  return (
    <div className="container mt-3 mb-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-normal display-6 text-success"> Private Offices </h2>
        <p className="text-muted"> Choose Your Preferred Office </p>

        <input
          type="text"
          className="form-control w-50 h-auto"
          placeholder='Search eg:basic available/unavailable, All Available/Unavailable , View All etc'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* office */}
      <div className="row g-4 justify-content-center ">
        {/* mapping */}

        {(filterDesks)?(

        
        filterDesks.map((e) => (
          <div className="col-md-4 col-lg-4 col-sm-6 col-12">
           
            <div className="card h-100 w-100  border-0 shadow rounded-4 text-center">
              <img
                src={e.imagepath}
                className="card-img-top img-fluid "
                style={{ width: "450px", height: "250px" }}
              />
              <div className="card-body">
                <h2 className="card-title fw-bold text-success h2"> {e.id} ({e.type}) </h2> 
                <h4>{e.people}</h4>
                <h3 className="text-primary fw-bold mb-3">
                  <FaRupeeSign className="text-primary fs-4 fw-bold mb-2" />
                  {e.price}
                  <span className="fs-6"> {e.permonth}</span>
                </h3>
                <ul className="list-unstyled text-muted mb-4">

                 {e.details.map((u,i) =>(
                  <li key={i}>{u} </li>
                ))} 
                </ul>
                {
                  e.available ? (
                  <Link
                  to={`/booking/${e.id}/${e.bookingcheck}`}
                  className="btn btn-outline-success rounded-pill px-4"
                >
                  Available
                </Link>):(<Link
                  to="/Booking"
                  className="btn btn-outline-success rounded-pill px-4 disabled"
                >
                  Unvailable
                </Link>)
                }
                
              </div>
            </div>
          </div>
        ))) :
        (
           <p className="text-muted text-center mt-3">No desks found.</p>

        )}
      </div>

      {/* go to contact page Customize */}
      <div className="text-center mt-5">
        <h4 className="fw-bold">Need a custom plan for your team?</h4>
        <p className="text-muted">
          Contact us and we will help you find the right workspace solution.
        </p>
        <a href="contact" className="btn btn-primary rounded-pill px-4">
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default Private;
