import './AdminLogin.css'; // We will create this CSS file next

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    
    // 1. Get the Admin Token from storage (saved during login)
    const adminToken = localStorage.getItem('adminToken');

    // 2. Function to fetch all products from backend
    const getProducts = async () => {
        try {
            const res = await axios.get('/api/products/all');
            // We assume your backend sends data inside res.data.data based on your controller
            setProducts(res.data.data); 
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    // 3. Run this when page loads
    useEffect(() => {
        getProducts();
    }, []);

    // 4. Function to Delete a Product
    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            try {
                // Call the Delete API with the Admin Token in header
                await axios.delete(`/api/products/delete/${id}`, {
                    headers: { Authorization: adminToken }
                });
                
                alert("Product Deleted!");
                getProducts(); // Refresh the list automatically
            } catch (err) {
                alert("Failed to delete. You might not be an admin.");
            }
        }
    };

   return (
   <div className="admin-layout">
    {/* SIDEBAR */}
    <Sidebar />
  <div className="admin-container">
    <h2 className="admin-title">Admin Dashboard</h2>


    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          
          <div className="image-box">
            <img
              src={`http://localhost:8080/${product.img}`}
              alt={product.productName}
            />
          </div>

          <div className="card-body">
            <h4>{product.productName}</h4>
            <p className="price">₹{product.price}</p>
           <span
  className={`stock ${
    product.outOfStock === "outofstock" ? "out" : "in"
  }`}
>
  {product.outOfStock === "outofstock"
    ? "Out of Stock"
    : "In Stock"}
</span>


            <div className="card-actions">
              <Link
                to={`/admin/edit/${product._id}`}
                className="btn-edit"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(product._id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
    </div>

);

};

export default AdminDashboard;