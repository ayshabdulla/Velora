import React, { useState } from 'react'
import './LoginPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthcontext } from '../../Context/Authcontext'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const { setUser } = useAuthcontext()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://velora-ki1r.onrender.com/api/user/login',
                { email, password },
                { withCredentials: true }
            );

            setUser(response.data.data);
            localStorage.setItem('userLogged', JSON.stringify(response.data.data));
            navigate('/');
        } catch (error) {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleLogin}>
                <h2 className="login-title">LOGIN</h2>

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="login-btn" type="submit">
                    LOGIN
                </button>
            </form>
        </div>
    )
}