import React from "react";
import "./VeloraStandard.css";

const VeloraStandard = () => {
  return (
    <section className="velora-standard">

      <h2>THE VELORA STANDARD</h2>
      <p className="standard-sub">
        Crafted with intention. Designed for presence.
      </p>

      <div className="standard-grid">

        <div className="standard-card">
          <h3>01</h3>
          <h4>Premium Materials</h4>
          <p>Only the finest textures and finishes make it to our collections.</p>
        </div>

        <div className="standard-card">
          <h3>02</h3>
          <h4>Timeless Design</h4>
          <p>Minimal silhouettes created to outlast trends and seasons.</p>
        </div>

        <div className="standard-card">
          <h3>03</h3>
          <h4>Crafted to Last</h4>
          <p>Attention to detail in every stitch, structure and form.</p>
        </div>

      </div>

    </section>
  );
};

export default VeloraStandard;