import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/User-context';
import axios from 'axios';

const Navbar = () => {
    const { user,setUser } = useUser();

    const logout = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_AUTH_URL}/logout`
            );
            if (res.data) {
                setUser(null);
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-semibold">
                    <Link to="/">No Food Leftover</Link>
                </div>
                
                <div className="space-x-4">
                    {user && (
                        <>
                            {/* Available food for both Donors and Receivers */}
                            <Link to="/" className="text-white hover:underline">
                                Available Food
                            </Link>

                            {/* Only show Post Food for Donors */}
                            {user.role === 'Donor' && (
                                <>
                                    <Link to="/post-food" className="text-white hover:underline">
                                        Post Food
                                    </Link>
                                    <Link to="/requests" className="text-white hover:underline">
                                        Manage Requests
                                    </Link>
                                </>
                            )}

                            {/* Show Request Status for Receivers */}
                            {user.role === 'Receiver' && (
                                <Link to="/my-requests" className="text-white hover:underline">
                                    My Requests
                                </Link>
                            )}

                            {/* Logout */}
                            <button 
                                onClick={logout} 
                                className="text-white hover:underline"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {/* Show Login/Sign Up if not authenticated */}
                    {!user && (
                        <>
                            <Link to="/login" className="text-white hover:underline">
                                Login
                            </Link>
                            <Link to="/signup" className="text-white hover:underline">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
