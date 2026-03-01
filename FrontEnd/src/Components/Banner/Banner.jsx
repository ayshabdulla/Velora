import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h2>NEW COLLECTION</h2>
        <p>
          Discover timeless silhouettes crafted for the modern woman.
        </p>
        <Link to="/shop" className="banner-btn">
          SHOP NOW
        </Link>
      </div>
    </section>
  );
};

export default Banner;