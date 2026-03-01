import React from 'react'
import { useState } from 'react'
import { useAuthcontext } from '../../Context/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    //Get the setAdmin function from our Context
    const { setAdmin } = useAuthcontext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://velora-ki1r.onrender.com/api/admin/login', {
                email: credentials.email,
                password: credentials.password
            });

            //1.save token to localStorage (Persist data after refresh)
            localStorage.setItem('adminToken', res.data.token);

            //2. Update Context State  (Update UI immediately)
            //This tells the rest of the app "Admin is  now loggedd in!"
            setAdmin(res.data.token);

            alert("Admin Login Successful");

            //3.Nvigate To Dashboard
            navigate('/admin/dashboard');
        } catch (error) {
            setError(err.response?.data?.msg || "Login failed");
        }
    };
    return (
        <div className='admin-login-container'>
            <div className='admin-login-card'>
                <h2>Admin Portal</h2>
                <p>Restricted Access</p>

                {error && <div className='error-msg'>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label>Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder='Enter Your Admin Email'
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label>Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Enter Admin Password'
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type='submit' className='admin-btn'>Login as Admin</button>

                </form>
            </div>

        </div>
    );
};

export default AdminLogin;
