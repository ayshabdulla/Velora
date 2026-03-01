import React, { useEffect, useRef, useState } from "react";
import "./NewArrivals.css";
import ProductCard from "../ProductCard/ProductCard";

const NewArrivals = ({ products }) => {
  const featured = products.slice(0, 4);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`new-arrivals ${visible ? "show" : ""}`}
    >
      <h2>NEW ARRIVALS</h2>
      <p>Curated silhouettes for the modern wardrobe.</p>

      <div className="arrivals-grid">
        {featured.map((product, index) => (
          <div
            key={product._id}
            className={`stagger-item ${visible ? "show" : ""}`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <ProductCard
              productid={product._id}
              name={product.productName}
              price={product.price}
              img={product.img}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;