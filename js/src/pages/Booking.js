import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userContext";
import { DesktypeContext } from "./DesktypeContext";

function Booking() {
  const { user } = useContext(UserContext);
  const { deskType } = useContext(DesktypeContext);
  const navigate = useNavigate();
  const { id, bookingcheck } = useParams();

  // state keys match DB schema exactly
  const [data, setData] = useState({
    userId: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    deskid: id || "",
    bookingType: bookingcheck || "",
    startDate: "",
    endDate: "",
    startTime: "", // NEW: start time for conference room
    endTime: "", // NEW: end time for conference room
    timeslot: "", // still used for dedicated desk
    fixedhHours: "09:00 AM - 9:00 PM",
    duration: "", // auto-calculated for conference rooms
    Month: "", // months difference for monthly bookings
    people: 1,
    price: "",
    notes: "",
  });

  // keep user info in sync
  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        userId: user.id || "",

        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        deskid: id || "",
        bookingType: bookingcheck || prev.bookingType,
        people: 1 || "",
      }));
    }
  }, [user]);

  const PRICE = {
    "Dedicated Desk": 5000,
    "Private Office Basic": 12000,
    "Private Office Standard": 20000,
    "Private Office Premium": 35000,
    "Conference Room Basic": 500,
    "Conference Room Standard": 1000,
    "Conference Room Premium": 1500,
  };

  const formatDate = (datestr) => {
    if (!datestr) return "";
    const d = new Date(datestr);

    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calcMonths = (start, end) => {
    if (!start || !end) return 0;

    const s = new Date(start);

    const e = new Date(end);

    return (
      (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
    );
  };

  const calcHours = (start, end) => {
    if (!start || !end) return "";

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startDate = new Date(0, 0, 0, sh, sm);
    const endDate = new Date(0, 0, 0, eh, em);
    const diff = (endDate - startDate) / 36e5;
    return diff > 0 ? diff : "";
  };

  // calculate price based on type and duration
  const calculatePrice = (type, people, duration, start, end) => {
    const p = Number(people) || 0;
    const h = Number(duration) || 0;
    const m = calcMonths(start, end);
    switch (type) {
      case "Dedicated Desk":
        return PRICE[type] * p * m;
      case "Private Office Basic":
      //  return PRICE.Private Office Basic * m;

      case "Private Office Standard":
      // return PRICE.Private Office Standard * m;

      case "Private Office Premium":
        return PRICE[type] * m;

      case "Conference Room Basic":
      // return PRICE.Conference Room Basic* (h || 1);

      case "Conference Room Standard":
      // return PRICE.Conference Room Standard * (h || 1);

      case "Conference Room Premium":
        return PRICE[type] * (h || 1);

      default:
        return 0;
    }
  };

  // auto update price, Month, and duration
  useEffect(() => {
    const { bookingType, people, duration, startDate, endDate } = data;
    if (bookingType) {
      setData((prev) => ({
        ...prev,
        price: calculatePrice(
          bookingType,
          people,
          duration,
          startDate,
          endDate
        ),
        Month: calcMonths(startDate, endDate),
      }));
    }
  }, [
    data.bookingType,
    data.people,
    data.duration,
    data.startDate,
    data.endDate,
  ]);

  // auto update duration when start/end times change for conference rooms
  useEffect(() => {
    if (
      [
        "Conference Room Basic",
        "Conference Room Standard",
        "Conference Room Premium",
      ].includes(data.bookingType)
    ) {
      const hrs = calcHours(data.startTime, data.endTime);
      setData((prev) => ({
        ...prev,
        duration: hrs,
        price: calculatePrice(
          prev.bookingType,
          prev.people,
          hrs,
          prev.startDate,
          prev.endDate
        ),
      }));
    }
  }, [data.startTime, data.endTime, data.bookingType]);

  const handleBooking = async (e) => {
    e.preventDefault();

    let desk, bookingPayload;

    const {
      userId,
      name,
      email,
      phone,
      bookingType,
      price,
      duration,
      Month,
      startDate,
      endDate,
      timeslot,
      people,
      startTime,
      endTime,
    } = data;

    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const sm = start.getMonth();
    const em = start.getMonth();

    // Remove time for comparison
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (!name || !email || !phone || !bookingType) {
      return alert("Please fill all required fields!");
    }

    // Validation for conference rooms
    if (
      [
        "Conference Room Basic",
        "Conference Room Standard",
        "Conference Room Premium",
      ].includes(data.bookingType)
    ) {
      if (!startDate) return alert("Choose booking dates");
      if (!startTime || !endTime)
        return alert("Please select start and end time");

      const [sh, sm] = data.startTime.split(":").map(Number);
      const [eh, em] = data.endTime.split(":").map(Number);

      if (sh < 9 || eh > 21)
        return alert("Booking time must be between 09:00 Am and 09:00 PM");

      if (!duration || duration < 1) return alert("Choose minimum 1 hour");
    }

    // Validation for monthly bookings
    if (
      [
        "Dedicated Desk",
        "Private Office Basic",
        "Private Office Standard",
        "Private Office Premium",
      ].includes(bookingType)
    ) {
      if (!startDate || !endDate) return alert("Choose booking dates");

      if (start < today) return alert("Start date cannot be before today");

      if (end < today || em < sm)
        return alert("End date cannot be before Start Date");

      if (!Month) return alert("Please select a period of at least 1 month");
    }

    if (bookingType === "Dedicated Desk" && (!timeslot || !people)) {
      return alert("Select time slot");
    }

    if (window.confirm("Confirm your booking?")) {
      bookingPayload = { ...data, status: "Pending" };
      await axios.post("http://localhost:8000/booking", bookingPayload);
      alert("Your space is successfully booked!");
      navigate("/Pricing");

      if (data.bookingType === "Dedicated Desk") {
        const res = await axios.get(`http://localhost:8000/dedicated?id=${id}`);

        if (res.data.length > 0) {
          desk = res.data[0];
          console.log({ id });
          console.log("res.data :", res.data);

          await axios.patch(`http://localhost:8000/dedicated/${desk.id}`, {
            available: false,
          });
        }
      } else if (data.bookingType === "Private Office Basic") {
        const res = await axios.get(
          `http://localhost:8000/privateoffice?id=${id}`
        );

        if (res.data.length > 0) {
          desk = res.data[0];
          console.log({ id });
          console.log("res.data :", res.data);

          await axios.patch(`http://localhost:8000/privateoffice/${desk.id}`, {
            available: false,
          });
        }
      } else if (data.bookingType === "Private Office Standard") {
        const res = await axios.get(
          `http://localhost:8000/privateoffice?id=${id}`
        );

        if (res.data.length > 0) {
          desk = res.data[0];

          console.log("res.data :", res.data);

          await axios.patch(`http://localhost:8000/privateoffice/${desk.id}`, {
            available: false,
          });
        }
      } else if (data.bookingType === "Private Office Premium") {
        const res = await axios.get(
          `http://localhost:8000/privateoffice?id=${id}`
        );

        if (res.data.length > 0) {
          desk = res.data[0];

          console.log("res.data :", res.data);

          await axios.patch(`http://localhost:8000/privateoffice/${desk.id}`, {
            available: false,
          });
        }
      } else if ("Conference Room Basic" === data.bookingType) {
        const res = await axios.get(`http://localhost:8000/room?id=${id}`);

        if (res.data.length > 0) {
          desk = res.data[0];
          console.log({ id });
          console.log("res.data :", res.data);

          await axios.patch(`http://localhost:8000/room/${desk.id}`, {
            available: false,
          });
        }
      } else if (data.bookingType === "Conference Room Standard") {
        const res = await axios.get(`http://localhost:8000/room?id=${id}`);

        if (res.data.length > 0) {
          desk = res.data[0];
          console.log({ id });
          console.log("res.data :", res.data);

          await axios.patch(`http://localhost:8000/room/${desk.id}`, {
            available: false,
          });
        }
      } else if (data.bookingType === "Conference Room Premium") {
        const res = await axios.get(`http://localhost:8000/room?id=${id}`);

        if (res.data.length > 0) {
          desk = res.data[0];
          console.log({ id });
          console.log("res.data :", res.data);

          await axios.patch(`http://localhost:8000/room/${desk.id}`, {
            available: false,
          });
        }
      }
    } else {
      alert("Booking failed");
    }

    if (desk) {
      const endDateObj = new Date(data.endDate);
      const startDateObj = new Date(data.startDate);
      const countTime = endDateObj.getTime() - startDateObj.getTime();

      if (countTime > 0) {
        setTimeout(async () => {
          try {
            if (["Dedicated Desk"].includes(data.bookingType)) {
              await axios.patch(`http://localhost:8000/dedicated/${desk.id}`, {
                available: true,
              });
            } else if (
              [
                "Private Office Basic",
                "Private Office Standard",
                "Private Office Premium",
              ].includes(data.bookingType)
            ) {
              await axios.patch(
                `http://localhost:8000/privateoffice/${desk.id}`,
                { available: true }
              );
            } else if (
              [
                "Conference Room Basic",
                "Conference Room Standard",
                "Conference Room Premium",
              ].includes(data.bookingType)
            ) {
              await axios.patch(`http://localhost:8000/room/${desk.id}`, {
                available: true,
              });
            }
            console.log(
              `Desk ${desk.id} is now available again after ${data.endDate}`
            );
          } catch (err) {
            console.error("Failed to reset availability:", err);
          }
        }, countTime);
      }
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-4">
        {user ? (
          <h2 className="fw-bold">Booking for {user.name}</h2>
        ) : (
          <h2>Please login first</h2>
        )}
        <p className="text-muted">Reserve your perfect spot today!</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow p-4 bg-white rounded-4">
            <form onSubmit={handleBooking}>
              <div className="row g-3">
                {/* Name */}
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    readOnly
                  />
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    readOnly
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    readOnly
                  />
                </div>

                {/* Deskid */}
                <div className="col-md-6">
                  <label className="form-label">Desk Id</label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={(e) =>
                      setData({ ...data, deskid: e.target.value })
                    }
                    readOnly
                  />
                </div>

                {/* Booking Type */}
                <div className="col-md-6">
                  <label className="form-label">Booking Type</label>

                  <input
                    type="text"
                    className="form-control"
                    value={bookingcheck}
                    readOnly
                  />
                </div>

                {/* star date */}

                <div className="col-md-6">
                  <label className="form-control label">
                    {[
                      "Conference Room Basic",
                      "Conference Room Standard",
                      "Conference Room Premium",
                    ].includes(data.bookingType)
                      ? "Booking Date"
                      : "Start Date"}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={data.startDate}
                    onChange={(e) =>
                      setData({
                        ...data,
                        startDate: e.target.value,

                        Month: calcMonths(e.target.value, data.endDate),
                        price: calculatePrice(
                          data.bookingType,
                          data.people,
                          data.duration,
                          e.target.value,
                          data.endDate
                        ),
                      })
                    }
                  />
                </div>

                {[
                  "Dedicated Desk",
                  "Private Office Basic",
                  "Private Office Standard",
                  "Private Office Premium",
                ].includes(data.bookingType) && (
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={data.endDate}
                      onChange={(e) =>
                        setData({
                          ...data,
                          endDate: e.target.value,
                          Month: calcMonths(data.startDate, e.target.value),
                          price: calculatePrice(
                            data.bookingType,
                            data.people,
                            data.duration,
                            data.startDate,
                            e.target.value
                          ),
                        })
                      }
                    />
                  </div>
                )}

                {/* Dedicated Desk Time Slot */}
                {data.bookingType === "Dedicated Desk" && (
                  <div className="col-md-6">
                    <label className="form-label">Time Slot</label>
                    <select
                      className="form-select"
                      value={data.timeslot}
                      onChange={(e) =>
                        setData({ ...data, timeslot: e.target.value })
                      }
                    >
                      <option value="">Select Time</option>
                      <option value="09:00 AM - 12:00 PM">
                        09:00 AM - 12:00 PM
                      </option>
                      <option value="12:00 PM - 03:00 PM">
                        12:00 PM - 03:00 PM
                      </option>
                      <option value="03:00 PM - 06:00 PM">
                        03:00 PM - 06:00 PM
                      </option>
                      <option value="06:00 PM - 09:00 PM">
                        06:00 PM - 09:00 PM
                      </option>
                    </select>
                  </div>
                )}

                {[
                  "Private Office Basic",
                  "Private Office Standard",
                  "Private Office Premium",
                ].includes(data.bookingType) && (
                  <div className="col-md-6">
                    <label className="form-label">Fixed Hours</label>
                    <input
                      type="text"
                      className="form-control"
                      value={data.fixedhHours}
                      readOnly
                    />
                  </div>
                )}

                {/* Conference Room Start/End Time & Duration */}
                {[
                  "Conference Room Basic",
                  "Conference Room Standard",
                  "Conference Room Premium",
                ].includes(data.bookingType) && (
                  <>
                    <div className="col-md-6">
                      <label className="form-label">Start Time</label>
                      <input
                        type="time"
                        className="form-control"
                        value={data.startTime}
                        onChange={(e) =>
                          setData({ ...data, startTime: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">End Time</label>
                      <input
                        type="time"
                        className="form-control"
                        value={data.endTime}
                        onChange={(e) =>
                          setData({ ...data, endTime: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Duration (Hours)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={data.duration}
                        placeholder="Minimum 1 hour"
                        readOnly
                      />
                    </div>
                  </>
                )}

                {/* Month count */}
                {[
                  "Dedicated Desk",
                  "Private Office Basic",
                  "Private Office Standard",
                  "Private Office Premium",
                ].includes(data.bookingType) && (
                  <div className="col-md-6">
                    <label className="form-label">Duration (Months)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={data.Month}
                      readOnly
                    />
                  </div>
                )}

                {/* People for dedicated desk */}
                {data.bookingType === "Dedicated Desk" && (
                  <div className="col-md-6">
                    <label className="form-label">Number Of People</label>
                    <input
                      type="number"
                      className="form-control"
                      value={data.people}
                      readOnly
                      onChange={(e) => {
                        setData({
                          ...data,
                          people: e.target.value,
                          price: calculatePrice(
                            data.bookingType,
                            e.target.value,
                            data.duration,
                            data.startDate,
                            data.endDate
                          ),
                        });
                      }}
                    />
                  </div>
                )}
                {/* Estimated Price */}
                <div className="col-md-6">
                  <label className="form-label">Estimated Price (₹)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.price}
                    readOnly
                  />
                </div>

                {/* Notes */}
                <div className="col-12">
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={data.notes}
                    onChange={(e) =>
                      setData({ ...data, notes: e.target.value })
                    }
                  />
                </div>

                {/* Submit */}
                <div className="col-12 text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 rounded-pill"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
