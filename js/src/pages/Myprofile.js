import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";
import axios from "axios";

function Myprofile() {
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`http://localhost:8000/users?id=${user.id}`)
      .then((res) => setUserData(res.data))
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`http://localhost:8000/booking?userId=${user.id}`)
      .then((res) => setBookingData(res.data))
      .catch(console.error);
  }, [user]);

  const bookingColumns = [
    { key: "deskid", label: "Desk Id" },
    { key: "bookingType", label: "Booking Type" },
    { key: "startDate", label: "Start Date (yyyy-mm-dd)" },
    { key: "endDate", label: "End Date (yyyy-mm-dd)"},
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },

    { key: "timeslot", label: "Time Slot" },
    { key: "fixedhHours", label: "Fixed Duration" },
    { key: "duration", label: "Duration (Hours)" },
    { key: "Month", label: "Duration (Months)" },
    { key: "people", label: "No. of People" },
    { key: "price", label: "Amount" },
    { key: "notes", label: "Notes" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];
  const activeBookingColumns = bookingColumns.filter((c) =>
    bookingData.some(
      (r) =>
        r[c.key] !== undefined &&
        r[c.key] !== null &&
        r[c.key] !== "" &&
        r[c.key] != "0"
    )
  );

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hourstr, minute] = timeStr.split(":");
    let hour = parseInt(hourstr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  const handleDelete = async (id, status, deskid, bookingType) => {
    if (status === "Pending") {
      const confirmDelete = window.confirm(
        "Are you sure to cancel your booking?"
      );
      if (!confirmDelete) return;
      try {
        if (bookingType === "Dedicated Desk") {
          await axios.delete(`http://localhost:8000/booking/${id}`);

          setBookingData((prev) => prev.filter((item) => item.id !== id));

          await axios.patch(`http://localhost:8000/dedicated/${deskid}`, {
            available: true,
          });

          alert("Booking Cancelled");
        } else if (
          bookingType === "Private Office Basic" ||
          bookingType === "Private Office Standard" ||
          bookingType === "Private Office Premium"
        ) {
          await axios.delete(`http://localhost:8000/booking/${id}`);

          setBookingData((prev) => prev.filter((item) => item.id !== id));

          await axios.patch(`http://localhost:8000/privateoffice/${deskid}`, {
            available: true,
          });

          alert("Booking Cancelled");
        } else if (
          bookingType === "Conference Room Basic" ||
          bookingType === "Conference Room Standard" ||
          bookingType === "Conference Room Premium"
        ) {
          await axios.delete(`http://localhost:8000/booking/${id}`);

          setBookingData((prev) => prev.filter((item) => item.id !== id));

          await axios.patch(`http://localhost:8000/room/${deskid}`, {
            available: true,
          });

          alert("Booking Cancelled");
        }
      } catch (err) {
        alert("Failed");
        console.log(err);
      }
    } else {
      return alert("Could not Cancel");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container-fluid px-4" style={{ maxWidth: "100%" }}>
        {/* --------- Personal Info --------- */}
        <h2 className="fw-bold text-success border-bottom pb-2 mb-3">
          My Profile
        </h2>
        <div className="table-responsive mb-5">
          <table className="table table-hover table-striped align-middle  text-center w-100">
            <thead className="table-light ">
              <tr>
                <th>Name</th>
                <th> Email</th>
                <th>Contact number</th>
              </tr>
            </thead>
            <tbody className="fs-6">
              {userData.map((u) => {
                return (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>

                    <td className="d-flex justify-content-end gap-1 me-4">
                      <Link
                        to={`/updateuser/${u.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --------- Booking Details --------- */}
        <h2 className="fw-bold text-info border-bottom pb-2 mb-3">
          Booking Details
        </h2>
        <div
          className="table-responsive"
          style={{ maxHeight: "500px", overflowX: "auto" }}
        >
          <table className="table table-hover table-striped align-middle text-center w-100">
            <thead
              className="table-light"
              style={{
                position: "sticky",
                top: "30 px",
                zIndex: 10,
              }}
            >
              <tr>
                {activeBookingColumns.map((col) => (
                  <th key={col.key} className="text-wrap">{col.label}</th>
                ))}
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody className="fs-6">
              {bookingData.map((b) => (
                <tr key={b.id}>
                  {activeBookingColumns.map((col) => (
                    <td key={col.key}>
                      {col.key === "startTime" ? (
                        formatTime(b.startTime)
                      ) : col.key === "endTime" ? (
                        formatTime(b.endTime)
                      ) : col.key === "status" ? (
                        <span
                          className={
                            b.status === "Confirmed"
                              ? "badge bg-success"
                              : "badge bg-warning text-dark"
                          }
                        >
                          {b.status}
                        </span>
                      ) : (
                        b[col.key] || "-"
                      )}
                    </td>
                  ))}
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        handleDelete(b.id, b.status, b.deskid, b.bookingType)
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Myprofile;
