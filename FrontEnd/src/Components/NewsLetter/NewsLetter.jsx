import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>STAY CONNECTED</h2>
      <p>
        Be the first to discover new collections and exclusive pieces.
      </p>

      <div className="newsletter-form">
        <input type="email" placeholder="Enter your email" />
        <button>SUBSCRIBE</button>
      </div>
    </section>
  );
};

export default Newsletter;