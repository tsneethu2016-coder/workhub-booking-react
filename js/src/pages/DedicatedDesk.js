import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
 import pic1 from "../assets/DDeskA1.png";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { DesktypeContext } from "./DesktypeContext";
import { SearchContext } from "./Searchcontext";

function DedicatedDesk() {
  const [data, setData] = useState([]);
  const {deskType,setDeskType}= useContext(DesktypeContext);
    const{searchTerm,setSearchTerm} = useContext(SearchContext)
  


  useEffect(()=>{
    axios.get("http://localhost:8000/dedicated")
    .then((res)=>{
      setData(res.data)
      
      setDeskType(res.data[0])
      console.log(deskType)
      
      
      console.log(res.data)
    })
  .catch(err=>console.log(err))

  },[])

  const term = searchTerm.trim().toLowerCase();

  let filterDesks = data;

  if(term === "available"){
    filterDesks = data.filter((desk)=>desk.available===true)


  }
  if(term === "unavailable"){
        filterDesks = data.filter((desk)=>desk.available===false)

  }
  else if(term === "view all"|| term === ""){
    filterDesks = data;
  }

  return (
    <div className="container mt-3 mb-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-normal display-6 text-info"> Dedicated Desks </h2>
        <p className="text-muted"> Choose Your Space </p>
        <input
          type="text"
          className="form-control w-25 h-auto"
          placeholder='Search eg: Available / Unavailable/ View all '
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
       autoComplete="on"/>
      </div>

      {/* Desk 1*/}
      
      <div className="row g-4 justify-content-center ">
        {/* Plan 1 - Dedicated Desk */}

{/* mapping */}

{  (filterDesks )? (

filterDesks.map((e,index)=>(

       <div className="col-md-4 col-lg-4 col-sm-6 col-12">
          
          <div className="card h-100 w-100  border-0 shadow rounded-4 text-center">
              <img
              // src={pic1}
              src ={e.imagepath}
              className="card-img-top img-fluid "
              style={{ width: "450px", height: "250px" }}
            />
          
      
            <div className="card-body">
            
              <h5 className="card-title fw-bold"> {e.id}</h5>
              <h3 className="text-primary fw-bold mb-3">
                <FaRupeeSign className="text-primary fs-4 fw-bold mb-2" />
                {e.price}<span className="fs-6"> {e.per}</span>
              </h3>
              {/* <ul className="list-unstyled text-muted mb-4">
                
                {e.details.map((u,i) =>(
                  <li key={i}>{u} </li>
                )

                )

                }  
               
                
              </ul> */}
              {/* checking true or false */}
              {e.available ?
              (
              <Link to={`/booking/${e.id}/${e.type}`}
                className="btn btn-outline-success rounded-pill px-4"
              >
                Available
              </Link>):
              (
              <Link 
                to="/booking"
                className="btn btn-outline-success rounded-pill px-4 disabled"
              >
                Unavailable
              </Link>)
              }
                  
          
            </div>
           
           </div>
              
         </div>
          )
        )
        ):(
                    <p className="text-muted text-center mt-3">No desks found.</p>

        )
      } 
</div>
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

export default DedicatedDesk;

            
              


      