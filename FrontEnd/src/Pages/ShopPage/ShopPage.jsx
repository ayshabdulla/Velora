import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ShopPage.css";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/api/products")
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // 🔍 Filter Logic
    const filteredProducts = products.filter((item) => {
        const matchesSearch = item.productName
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesPrice =
            priceFilter === "all" ||
            (priceFilter === "low" && item.price < 3000) ||
            (priceFilter === "mid" &&
                item.price >= 3000 &&
                item.price <= 6000) ||
            (priceFilter === "high" && item.price > 6000);

        return matchesSearch && matchesPrice;
    });

    const handleAddToCart = async (productId) => {
        try {
            await axios.post(
                "/api/products/addtocart",
                { productId, quantity: 1 },
                { withCredentials: true }
            );

            alert("Added to cart!");
        } catch (error) {
            if (error.response?.status === 401) {
                navigate("/login");
            }
        }
    };

    return (
        <div className="shop-page">
            <h1>Shop Velora Bags</h1>

            {/* 🔎 Search + Filter */}
            <div className="shop-controls">
                <input
                    type="text"
                    placeholder="Search bags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                >
                    <option value="all">All Prices</option>
                    <option value="low">Below ₹3000</option>
                    <option value="mid">₹3000 - ₹6000</option>
                    <option value="high">Above ₹6000</option>
                </select>
            </div>

            {/* 🛍 Product Grid */}
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <div key={item._id} className="product-card">
                            <img
                                src={`/${item.img}`}
                                alt={item.productName}
                            />
                            <h3>{item.productName}</h3>
                            <p>₹{item.price}</p>

                            <div className="button-group">
                                <Link to={`/product/${item._id}`}>
                                    <button className="details-btn">View</button>
                                </Link>

                                <button
                                    className="cart-btn"
                                    onClick={() => handleAddToCart(item._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ShopPage;