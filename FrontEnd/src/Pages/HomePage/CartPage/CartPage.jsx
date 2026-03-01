import "./Cartpage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const navigate = useNavigate();

  // Fetch Cart Items
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.get(
          "https://velora-ki1r.onrender.com/api/products/getusercart",
          { withCredentials: true }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    getCartItems();
  }, [navigate]);

  // Delete From Cart
  const deleteFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `https://velora-ki1r.onrender.com/api/products/cart/delete/${productId}`,
        { withCredentials: true }
      );

      if (response.data.message === "Removed from cart") {
        setProducts((prev) =>
          prev.filter((item) => item.product._id !== productId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate Total
  const totalAmount = products.reduce(
    (acc, item) => acc + item.product.price,
    0
  );

  // Stripe Checkout
  const makePayment = async () => {
    try {
      // Validate Address
      if (
        !address.fullName ||
        !address.phone ||
        !address.address ||
        !address.city ||
        !address.state ||
        !address.pincode
      ) {
        alert("Please fill all delivery address fields");
        return;
      }

      const response = await axios.post(
        "/api/payment/create-payment",
        { products, shippingAddress: address },
        { withCredentials: true }
      );

      const session = response.data;

      // Redirect to Stripe Checkout
      window.location.href = session.url;

    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  // Empty Cart UI
  if (!products.length) {
    return (
      <div className="empty-cart">
        <h2>Your Shopping Bag is Empty</h2>
        <Link to="/" className="continue-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <h2 className="cart-heading">Shopping Bag</h2>

      <div className="cart-container">
        {/* LEFT SIDE */}
        <div className="cart-items">
          {products.map((item) => (
            <div className="cart-item" key={item.product._id}>
              <img
                src={`/${item.product.img}`}
                alt={item.product.productName}
              />

              <div className="item-details">
                <h3>{item.product.productName}</h3>
                <p className="price">₹{item.product.price}</p>

                <button
                  className="remove-btn"
                  onClick={() => deleteFromCart(item.product._id)}
                >
                  <AiOutlineDelete size={18} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="cart-summary">

          {/* Delivery Address */}
          <div className="address-section">
            <h3>Delivery Address</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={address.fullName}
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Street Address"
              value={address.address}
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>

          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{products.length}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button className="checkout-btn" onClick={makePayment}>
            Proceed to Checkout
          </button>

        </div>
      </div>
    </section>
  );
};

export default CartPage;