import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() === "") return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="footer">

      <div className="footer-top">
        <h2 className="footer-logo">VELORA</h2>
        <div className="gold-line"></div>
      </div>

      <div className="footer-newsletter">
        <h3>Join The Velora Circle</h3>
        <p>Be the first to discover new collections & exclusive releases.</p>

        <div className="newsletter-box">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>

        {subscribed && (
          <div className="success-message">
            ✨ Welcome to Velora. You're now part of our circle.
          </div>
        )}
      </div>

      <div className="footer-bottom">
        <div className="gold-line"></div>
        <p>© 2026 Velora. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;