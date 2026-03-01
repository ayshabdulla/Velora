import React from "react";
import "./Editorial.css";
import { Link } from "react-router-dom";

const Editorial = () => {
  return (
    <section className="editorial">
      <div className="editorial-img">
        <img src="/Editorial.jpg" alt="Luxury Handbag" />
      </div>

      <div className="editorial-content">
        <h2>OUR STORY</h2>
        <p>
          At VELORA, every piece is designed to embody timeless elegance.
          Crafted with attention to detail and modern femininity, our
          collections redefine everyday luxury.
        </p>
        <Link to="/shop" className="editorial-btn">
          DISCOVER MORE
        </Link>
      </div>
    </section>
  );
};

export default Editorial;