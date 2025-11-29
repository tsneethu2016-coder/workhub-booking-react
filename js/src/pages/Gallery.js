import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import pic1 from "../assets/gallerypic2.webp";
import pic2 from "../assets/gallerypic3.jpg";
import pic3 from "../assets/gallerypic4.jpg";
import pic4 from "../assets/galleryPic1.jpeg";
import pic5 from "../assets/gallerypic5.jpg";
import pic6 from "../assets/gallerypic6.jpg";
import pic7 from "../assets/gallerypic7.jpg";
import pic8 from "../assets/gallerypic8.jpg";
import pic9 from "../assets/gallerypic9.jpg";

function Gallery() {
  return (
    <div>
      <div className="conatiner ">
        <h2
          className="text-center  mt-4  display-4"
          style={{ color: "#135f58ff" }}
        >
          Gallery
        </h2>
        <div className="row mt-2 justify-content-center mx-1 gap-lg-5 flex-wrap d-flex aligin-items-center  mt-5  ">
          <img src={pic1} style={{ width: "400px", height: "300px" }} />

          <img
            src={pic2}
            style={{ width: "400px", height: "300px" }}
            className="mt-1"
          />

          <img
            src={pic3}
            style={{ width: "400px", height: "300px" }}
            className="mt-1"
          />

          <img
            src={pic4}
            style={{ width: "400px", height: "300px" }}
            className="mt-1"
          />

          <img
            src={pic5}
            style={{ width: "400px", height: "300px" }}
            className="mt-1"
          />

          <img
            src={pic6}
            style={{ width: "400px", height: "300px" }}
            className="mt-1"
          />

          <img
            src={pic7}
            style={{ width: "400px", height: "300px" }}
            className="mt-1"
          />

          <img
            src={pic8}
            style={{ width: "400px", height: "300px" }}
            className="mt-1"
          />

          <img
            src={pic9}
            style={{ width: "400px", height: "300px" }}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
