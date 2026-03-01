import './AdminLogin.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import Sidebar from './Sidebar';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [outOfStock, setOutOfStock] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  // 🔹 Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `/api/products/single/${id}`
      );

      const data = res.data.data;
      setProductName(data.productName);
      setPrice(data.price);
      setDiscount(data.discount);
      setOutOfStock(data.outOfStock);
      setPreview(`http://localhost:8080/${data.img}`);
    };

    fetchProduct();
  }, [id]);

  // 🔹 Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("outOfStock", outOfStock);

    if (file) {
      formData.append("img", file);
    }

    await axios.put(
      `/api/products/update/${id}`,
      formData,
      {
        headers: {
          Authorization: adminToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Product Updated Successfully");
    navigate("/admin/dashboard");
  };

  return (
     <div className="admin-layout">
    {/* SIDEBAR */}
    <Sidebar />
    <div className="admin-container">
      <h2>Edit Product</h2>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />

        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Discount"
        />

        <select
          value={outOfStock}
          onChange={(e) => setOutOfStock(e.target.value === "true")}
        >
          <option value={false}>In Stock</option>
          <option value={true}>Out of Stock</option>
        </select>

        {preview && <img src={preview} className="preview-img" />}

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className="btn-edit">
          Update Product
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditProduct;
