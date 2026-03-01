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

const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [outOfStock, setOutOfStock] = useState("instock");


    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');

    const [onEdit, setOnEdit] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const adminToken = localStorage.getItem('adminToken');

    useEffect(() => {
        if (params.id) {
            setOnEdit(true);
            const getProduct = async () => {
                try {
                    const res = await axios.get(`/api/products/single/${params.id}`);
                    const data = res.data.data || res.data;
                    setProductName(data.productName);
                    setPrice(data.price);
                    setDiscount(data.discount);
                    setOutOfStock(data.outOfStock);
                    setPreview(data.img);
                } catch (err) {
                    console.error(err);
                }
            };
            getProduct();
        }
    }, [params.id]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('outOfStock', outOfStock);

        if (file) {
            formData.append('img', file);
        }

        try {
            const url = onEdit
                ? `http://localhost:8080/api/products/update/${params.id}`
                : 'http://localhost:8080/api/products/create';

            const method = onEdit ? 'put' : 'post';
            await axios[method](url, formData, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            alert(onEdit ? "Product Updated!" : "Product Created!");
            navigate('/admin/dashboard');

        } catch (err) {
            console.error("SAVE ERROR:", err);

            // Check specifically for the 503 error to give a hint
            if (err.response && err.response.status === 503) {
                alert("Server Error (503): Database connection likely failed. Check backend terminal.");
                return;
            }

            // FIX: Access the error message safely
            const msg = err.response?.data?.errorMessage || "Something went wrong";
            alert(msg);
        }
    };

    return (
        <div className="admin-layout">
            {/* SIDEBAR */}
            <Sidebar />
            <div className="admin-container">
                <div className="form-card">
                    <h2>{onEdit ? "Edit Product" : "Create Product"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Product Name</label>
                            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label>Discount</label>
                            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" onChange={handleFileChange} accept="image/*" />
                            {preview && (
                                <img src={preview} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />
                            )}
                        </div>

                        <div className="form-group">
                            <label>Stock</label>
                            <select
                                value={outOfStock}
                                onChange={(e) => setOutOfStock(e.target.value)}
                            >
                                <option value="instock">In Stock</option>
                                <option value="outofstock">Out of Stock</option>
                            </select>

                        </div>

                        <button type="submit" className="btn-submit">
                            {onEdit ? "Update" : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;