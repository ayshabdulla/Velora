const Admin = require('../Models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//jwt: This is the "Ticket macker." if the login is successful,it creates a digital ticket (Token) so the admin stays logged  in. 

//Seed Script: Creates the account(one time).
//Model: Defines the data structure (Always needed).
//Controller (Login): Checks the password and lets you in (Always needed).

const adminCtrl = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            //1.  We still need the Model to find the admin
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(400).json({ msg: "Admin does not exists." });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                return res.status(400).json({ msg: "Incorrect password" })
            }

            //Payload: We pack the Admin's ID and a special tag type: 'admin' inside the token. this is how your middleware later knows "This user is an Admin, not a regular customer"

            //jwt.sign: This digitally signs the token using your secret key (.env file).

            //expiresIn: '1d' : The token is valid for 1day. After that, they must log in again

            const Payload = { id: admin._id, type: 'admin' };
            const token = jwt.sign(Payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

            res.json({ token, msg: "Admin Login Success" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = adminCtrl;