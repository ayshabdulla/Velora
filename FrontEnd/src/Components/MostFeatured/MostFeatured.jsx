import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './MostFeatured.css'

const MostFeatured = ({ products = [] }) => {

    return (
        <section className="most-featured">
            <h2>MOST FEATURED</h2>
            <p>Timeless pieces loved by our community.</p>

            <div className="featured-grid">
                {products.slice(5, 8).map((product) => (
                    <ProductCard
                        key={product._id}
                        productid={product._id}
                        name={product.productName}
                        img={product.img}
                        price={product.price}
                    />
                ))}
            </div>
        </section>
    );
}

export default MostFeatured