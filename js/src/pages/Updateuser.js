import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { UserContext } from "./userContext";

function Updateuser() {
  const { user, setUser } = useContext(UserContext);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users?id=${id}`)
      .then((response) => {
        if (response.data.length > 0) {
          setValues(response.data[0]);
        } else {
          return alert("not found");
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(values.phone)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }
    axios
      .put(`http://localhost:8000/users/${values.id}`, values)

      .then((res) => {
        setUser(res.data);

        // navigate("/myprofile");
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8000/booking?userId=${user.id}`)

      .then((res) => {
        const bookings = res.data;
        const updatePromise = bookings.map((e) => {
          axios.put(`http://localhost:8000/booking/${e.id}`, {
            ...e,
            name: values.name,
            email: values.email,
            phone: values.phone,
          });
        });
        return Promise.all(updatePromise);
      })
      .then(() => {
        alert("Updated Successfully");
        navigate("/myprofile");
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className=" w-50">
        <h3 className="text-center display-5 mb-4 text-primary">Update User</h3>

        <div className="card shadow p-4 rounded-4 border-0">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-semibold">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter 10-digit phone number"
                value={values.phone}
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-success me-3 px-4">
                Update
              </button>
              <Link to="/myprofile" className="btn btn-secondary px-4">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updateuser;
