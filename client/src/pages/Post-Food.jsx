import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostFood = () => {
    const [formData, setFormData] = useState({
        foodName: '',
        description: '',
        quantity: '',
        location: '',
        expiryDate: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/api/v1/foods/create-food`, formData);
            navigate('/');  // Redirect to available food page after successful post
        } catch (error) {
            console.error('Failed to post food', error);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Post Food</h1>
            <form onSubmit={handleSubmit} className="bg-white max-w-lg mx-auto p-8 shadow-md rounded-lg">
                
                {/* Food Name Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Name</label>
                    <input 
                        type="text" 
                        name="foodName" 
                        value={formData.foodName} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Enter food name"
                    />
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Describe the food (optional)"
                    />
                </div>

                {/* Quantity Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input 
                        type="text" 
                        name="quantity" 
                        value={formData.quantity} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Enter quantity (e.g., 10 servings)"
                    />
                </div>

                {/* Location Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Enter pickup location"
                    />
                </div>

                {/* Expiry Date Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date & Time</label>
                    <input 
                        type="datetime-local" 
                        name="expiryDate" 
                        value={formData.expiryDate} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Post Food
                </button>
            </form>
        </div>
    );
};

export default PostFood;
