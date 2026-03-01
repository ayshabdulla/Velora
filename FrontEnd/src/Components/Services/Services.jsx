import { FaTruck } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { BiPhoneCall } from "react-icons/bi";
import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <section className="services-section">

      <h2>OUR PROMISE</h2>
      <p className="services-sub">
        Thoughtfully delivered. Always refined.
      </p>

      <div className="services-container">

        <div className="service-item">
          <FaTruck className="icons" />
          <h4>Complimentary Delivery</h4>
          <p>Free shipping on orders above ₹5000.</p>
        </div>

        <div className="service-item">
          <BiPhoneCall className="icons" />
          <h4>Dedicated Support</h4>
          <p>Available anytime for assistance.</p>
        </div>

        <div className="service-item">
          <GrMail className="icons" />
          <h4>Seamless Assistance</h4>
          <p>Quick responses through email & chat.</p>
        </div>

      </div>

    </section>
  );
};

export default Services;