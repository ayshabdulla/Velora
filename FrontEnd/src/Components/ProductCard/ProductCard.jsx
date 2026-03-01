import React from 'react'

import './ProductCard.css'
import { Link } from 'react-router-dom'


const ProductCard = ({
  productid,
  name,
  price,
  img,
  discount = 0,
  stock
}) => {
  const isOutOfStock = stock === "outofstock";

  const discountedPrice =
    discount > 0
      ? Math.round(price - (price * discount) / 100)
      : price;

  const CardContent = (
    <>
      <div className='img-wrapper'>
        <img className='prdct-img' src={`/${img}`} alt={name} />
        {discount > 0 && (
          <span className="discount-badge">-{discount}%</span>
        )}

        {isOutOfStock && (
          <span className="stock-badge">Out of Stock</span>
        )}
      </div>

      <div className="card-body">
        <h1>{name}</h1>

        <div className="price-box">
          {discount > 0 && (
            <span className="old-price">₹{price}</span>
          )}
          <span className="new-price">₹{discountedPrice}</span>
        </div>
      </div>

    </>
  );
  return isOutOfStock ? (
    <div className='productCard disable'>{CardContent}</div>
  ) : (
    <Link to={`/product/${productid}`} className="productCard">

      {CardContent}
    </Link>
  );
};

export default ProductCard;



