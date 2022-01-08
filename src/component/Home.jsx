import React from "react";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="hero">
      <div className="card bg-dark text-secondary border-0">
        <img
          src="./images/img.jpg"
          className="card-img"
          alt="background"
          height="600px"
        />
        <div className="card-img-overlay">
          <div className="container">
            <h5 class="card-title display-3 fw-bolder mb-0">
              NEW YEAR ARRIVALS
            </h5>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
