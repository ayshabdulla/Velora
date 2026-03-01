import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>VELORA</h1>
          <p>Luxury Handbags, Redefined.</p>
          <Link to="/shop" className="hero-btn">
            SHOP COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;