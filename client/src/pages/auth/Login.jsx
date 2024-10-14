import React, { useState } from 'react';
import { useUser } from '../../context/User-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call API to log in
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_AUTH_URL}/login`,
                { email, password }
            );
            window.location.href="/"  // Redirect after successful login
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
