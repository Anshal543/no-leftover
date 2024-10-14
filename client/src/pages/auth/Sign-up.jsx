import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Receiver',
        organizationName: '',
        location: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call API to register the user
        try {
             await axios.post(
                `${import.meta.env.VITE_BACKEND_AUTH_URL}/register`,
                formData
            );
            // Update context with user data
            navigate('/login');  // Redirect after successful signup
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
                    >
                        <option value="Receiver">Receiver</option>
                        <option value="Donor">Donor</option>
                    </select>
                </div>

                {formData.role === 'Donor' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                        <input 
                            type="text"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input 
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
