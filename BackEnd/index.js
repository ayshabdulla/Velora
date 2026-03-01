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
    // <!-- we are allowing cross origin resource sharinh-->
    origin: 'https://velora-ki1r.onrender.com',
    // <!-- this line will allow frontend to send cookies to backend -->
    credentials: true
}));
app.use(express.json());

app.use(cookieParser())

RunServer()

app.use("/uploads", express.static(path.join(__dirname,"uploads")));

app.use('https://velora-ki1r.onrender.com/api/products',productRoutes);
app.use('/api/user',userRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/admin',adminRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});