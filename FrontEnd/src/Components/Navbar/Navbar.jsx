import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuthcontext } from "../../Context/Authcontext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, setUser } = useAuthcontext();
  const [cartCount, setCartCount] = useState(0);

  // 🔥 Fetch Cart Count
  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/products/getusercart", {
        withCredentials: true,
      });

      console.log("Cart API response:", res.data);

      const items = res.data?.data || [];
setCartCount(items.length);
    } catch (error) {
      console.log("Cart fetch error:", error);
    }
  };

  if (user) {
    fetchCart();
  }
}, [user]);

  // 🔐 Logout Function
  const LogoutUser = async () => {
    try {
      const response = await axios.post(
        "/api/user/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.removeItem("userLogged");
        setUser(null);
        setCartCount(0);
      }
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">VELORA</Link>
      </div>

      {/* Center Links */}
      <div className="nav-center">
        <Link className="link" to="/shop">SHOP</Link>
        <Link className="link" to="/about">ABOUT</Link>
        <Link className="link" to="/contact">CONTACT</Link>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        {!user ? (
          <>
            <Link className="link" to="/login">LOGIN</Link>
            <Link className="register-btn" to="/register">REGISTER</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={LogoutUser}>
            LOGOUT
          </button>
        )}

        {/* Cart Icon */}
        <Link className="cart-icon-wrapper" to="/cart">
          <AiOutlineShoppingCart className="cart-icon" />

          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;