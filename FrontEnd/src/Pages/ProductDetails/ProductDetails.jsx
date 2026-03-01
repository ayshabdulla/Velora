import './ProductDetails.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await axios.get(
          `/api/products/single/${id}`
        );
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const AddToCart = async () => {
    console.log("AddToCart function running");

    try {
      const response = await axios.post(
        "/api/products/addtocart",
        { productId: id, quantity: 1 },
        { withCredentials: true }
      );

      console.log("Added:", response.data);
      navigate("/cart");

    } catch (error) {
      console.log("Error:", error);

      if (error.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      }
    }
  };

  return (
    <div className="product-page">
      <h1 className="heading-tags">Product Details</h1>

      <div className="productDetails-container">
        <div className="image-section">
          <img
            src={`/${product.img}`}
            alt={product.productName}
            className="product-details-image"
          />
        </div>

        <div className="details-section">
          <h1 className="product-name">{product.productName}</h1>
          <p>₹{product.price}</p>

          <button className="cart" onClick={AddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;