import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Velora</h1>
        <p className="about-tagline">
          Timeless Elegance. Modern Confidence.
        </p>
      </section>

      {/* Story Section */}
      <section className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Velora was created with a vision to redefine everyday luxury.
            We design handbags that blend sophistication with functionality,
            crafted for women who embrace confidence and individuality.
          </p>

          <p>
            Each piece is thoughtfully designed using premium materials,
            ensuring timeless beauty and lasting quality.
          </p>
        </div>

        <div className="about-image">
          <img src="/about-bag.jpg" alt="Velora Bag" />
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="value-box">
          <h3>Craftsmanship</h3>
          <p>Precision in every stitch and detail.</p>
        </div>

        <div className="value-box">
          <h3>Luxury</h3>
          <p>Premium materials and timeless design.</p>
        </div>

        <div className="value-box">
          <h3>Confidence</h3>
          <p>Empowering modern women worldwide.</p>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;