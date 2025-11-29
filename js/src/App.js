import Navbar from "./navbar/navbar.js";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { UserContext, AdminContext } from "./pages/userContext";

 import "../src/App.css";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Contact from "./pages/Contact.js";
import Booking from "./pages/Booking.js";
import Pricing from "./pages/Pricing.js";
import Footerpage from "./pages/Footerpage.js";
import Gallery from "./pages/Gallery.js";
import DedicatedDesk from "./pages/DedicatedDesk.js";
import Private from "./pages/PrivateOffice.js";
import MeetingRoom from "./pages/MeetingRoom.js";
import AdminLogin from "./pages/AdminLogin.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import ViewRegister from "./pages/ViewRegister.js";
import ViewBookings from "./pages/ViewBookings.js";
import Myprofile from "./pages/Myprofile.js";
import Updateuser from "./pages/Updateuser.js";
import Viewquery from "./pages/Viewquery.js";
import { DesktypeContext } from "./pages/DesktypeContext.js";
import { SearchContext } from "./pages/Searchcontext.js";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [deskType, setDeskType] = useState(null);
  const [searchTerm,setSearchTerm] = useState("");
  

  useEffect(() => {
    try {
      const savedUser = sessionStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (err) {
      console.error("Failed to load user", err);
    }

    try {
      const savedAdmin = sessionStorage.getItem("admin");
      if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
    } catch (err) {
      console.error("Failed to load admin", err);
    }
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <UserContext.Provider value={{ user, setUser }}>
        <AdminContext.Provider value={{ admin, setAdmin }}>
                  <DesktypeContext.Provider value={{ deskType, setDeskType }}>
                     <SearchContext.Provider value={{searchTerm, setSearchTerm}}>

          <main className="flex-grow-1">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="About" element={<About />} />
              <Route path="Gallery" element={<Gallery />} />
              <Route path="/Login" element={<Login />} />
              <Route path="adminlogin" element={<AdminLogin />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Pricing" element={<Pricing />} />
              <Route path="/Booking/:id/:bookingcheck" element={<Booking />} />
              <Route path="Contact" element={<Contact />} />
              <Route path="dedicateddesk" element={<DedicatedDesk />} />
              <Route path="/Privateoffice" element={<Private />} />
              <Route path="/meetingroom" element={<MeetingRoom />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/ViewRegister" element={<ViewRegister />} />
              <Route path="/viewBookings" element={<ViewBookings />} />
              <Route path="/myprofile" element={<Myprofile />} />
              <Route path="/updateuser/:id" element={<Updateuser />} />
              <Route path="/viewquery" element={<Viewquery />} />
            </Routes>
          </main>

          <Footerpage />
          </SearchContext.Provider>
          </DesktypeContext.Provider>
        </AdminContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
