const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');


//1. Load Environment Variables
require('dotenv').config({path: './server/.env' });

const adminSchema = new mongoose.Schema({
email: {type: String, required: true, unique: true},
password: {type: String,required: true }
},{ timeStamp: true });


//use the existing model if available, or compile  a new one 
const Admin = mongoose.module.Admin || mongoose.model('Admin', adminSchema);
//-------------------------------------------------------------------------

const seedAdmin = async () => {
    try {
        console.log("Admin Seeder Script");

        //3. Get DB URL
        const dbUrl = process.env.MONGO_DB_URL;

        if (!dbUrl) {
            throw new Error("Dtabase URL not found. check .env for MONGO_DB_URL");
        }

        //4.Connect to MongoDB
        await mongoose.connect(dbUrl);
        console.log("Database Connected ");

        //5.Admin Credentials
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        //6.CHECK FOR EXISTING ADMIN
        const adminExists = await Admin.findOne({email});

        if (adminExists) {
            console.log(`⚠️Admin alredy exists: ${email}`);
            process.exit(0);
        }

        //7.CREATE NEW ADMIN
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newAdmin = new Admin({
            email:email,
            password:hashedPassword
        });

        await newAdmin.save();

        console.log("SUCCESS: Admin Account Created");
        console.log(`Email: ${email}`);
        //console.log(`Password:${password}`);
    } catch (error) {
        console.error("Error:",error.message);
    } finally{
        //8. CLEANUP
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        process.exit(0);
    }
};

seedAdmin();