import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:8000/booking")
      .then((res) => setBookings(res.data))

      .catch(console.error);
  }, []);

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hourstr, minute] = timeStr.split(":");
    let hour = parseInt(hourstr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  // Use PUT and send the entire booking object with the new status
  const updateStatus = (id, status) => {
    const current = bookings.find((b) => b.id === id);

    if (!current) return;

    if (current.status === status) {
      return alert("This booking is already confirmed");
    }
    if (!window.confirm("Are you sure want to confirm the booking?")) return;

    const updatedBooking = { ...current, status }; // replace status

    axios
      .put(`http://localhost:8000/booking/${id}`, updatedBooking)
      .then((res) => {
        // update local state so UI refreshes
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? updatedBooking : b))
        );
      })
      .catch((err) => console.log(err));
  };

  

  return (
    <div className="container-fluid py-4">
      <>
        <h3
          className="text-center text-primary fw-normal mb-4 display-5"
          style={{ background: "white", padding: "20px 0" }}
        >
          Users Booking Details 
        </h3>
      
      </>
      

      <div
        className="  table-responsive shadow rounded-3 bg-white mb-0 "
        style={{ maxHeight: "800px", overflowY: "none" ,scrollbarWidth:"none"}}
      >
        <table className=" table table-hover align-middle text-center mb-0 mt-0 w-100">
          <thead
            className="table-light "
            style={{
              position: "sticky",
              top: "0px",
              zIndex: 1000,
            }}
          >
            <tr>
              <th>User ID</th>
              {/* <th>Name</th> */}
              <th>Email</th>
              
              <th>Desk Id</th>
              <th>Booking Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Time Slot</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Fixed Hours </th>
              <th>Conference Duration</th>
              <th>Months</th>
              <th>No. of People</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((e) => (
              <tr key={e.id}>
                <td className="fw-semibold">{e.userId}</td>
                {/* <td>{e.name}</td> */}

                <td>{e.email}</td>
                {/* <td>{e.phone}</td> */}
                <td>{e.deskid}</td>
                <td>{e.bookingType}</td>
                <td>{e.startDate}</td>
                <td>{e.endDate}</td>
                <td>{e.timeslot}</td>
                <td>{formatTime(e.startTime)}</td>
                <td>{formatTime(e.endTime)}</td>
                <td>{e.fixedhHours}</td>
                <td>{e.duration}</td>
                <td>{e.Month}</td>
                <td>{e.people}</td>
                <td className="fw-semibold">₹{e.price}</td>
                <td className="text-truncate" style={{ maxWidth: "150px" }}>
                  {e.notes}
                </td>
                <td>
                  <span
                    className={
                      e.status === "Confirmed"
                        ? "badge bg-success px-3 py-2"
                        : "badge bg-warning text-dark px-3 py-2"
                    }
                  >
                    {e.status}
                  </span>
                </td>

                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => updateStatus(e.id, "Confirmed")}
                    >
                      Confirm
                    </button>
                    {/* <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateStatus(e.id, "Pending")}
                    >
                      Pending
                    </button>  */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex float-end  mt-3 ">
        <Link to="/admindashboard" className="btn btn-secondary ">
          <RiArrowGoBackLine />
        </Link>
      </div>
    </div>
  );
}

export default ViewBookings;
