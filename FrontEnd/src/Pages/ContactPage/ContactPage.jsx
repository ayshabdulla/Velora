import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <h1>Contact Velora</h1>
        <p className="contact-tagline">
          We would love to hear from you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-container">

  {/* LEFT SIDE - IMAGE */}
  <div className="contact-image">
    <img src="/contact-luxury.jpg" alt="Velora Luxury" />
  </div>

  {/* RIGHT SIDE - FORM & INFO */}
  <div className="contact-right">

    <div className="contact-info">
      <h2>Get In Touch</h2>
      <p>Email: support@velora.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>Location: Kochi, India</p>
    </div>

    <form className="contact-form">
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit">SEND MESSAGE</button>
    </form>

  </div>

</section>

    </div>
  );
};

export default ContactPage;