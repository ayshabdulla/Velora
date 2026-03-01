import React from 'react'
import './PopularProducts.css'
import ProductCard from '../ProductCard/ProductCard'

const PopularProducts = ({ products = [] }) => {

    return (
        <section className='popular'>
            <h2>POPULAR PICKS</h2>
            <p>Our most sought-after designs.</p>

            <div className='popularproducts'>
                {products.slice(-3).map((product) => (
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
    )
}

export default PopularProducts