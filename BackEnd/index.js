require('dotenv').config();
const express = require("express");

const cors = require("cors");
const RunServer = require('./Database/connection');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./Routes/adminRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const path = require('path');

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://velora-1-qcxg.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());

app.use(cookieParser())

RunServer()

app.use("/uploads", express.static(path.join(__dirname,"uploads")));

app.use('/api/products',productRoutes);
app.use('/api/user',userRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/admin',adminRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});