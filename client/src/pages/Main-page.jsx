import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/User-context';

const MainPage = () => {
    const [foodPosts, setFoodPosts] = useState([]);
    const [userRequests, setUserRequests] = useState([]);
    const { user } = useUser(); // Get the logged-in user from context

    useEffect(() => {
        // Fetch all available food posts
        const fetchFoodPosts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/v1/foods/get-food`
                );
                setFoodPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Fetch all requests made by the logged-in user
        const fetchUserRequests = async () => {
            if (user && user.role === 'Receiver') {
                try {
                    const res = await axios.get(
                        `http://localhost:8080/api/v1/requests/get-requested-food/${user._id}`
                    );
                    setUserRequests(res.data);

                } catch (error) {
                    console.error('Failed to fetch user requests', error);
                }
            }
        };

        fetchFoodPosts();
        fetchUserRequests();
    }, [user]);

    const hasRequestedFood = (foodId) => {
        return userRequests.some(request => request.foodPost._id === foodId);
    };

    const handleRequest = async (foodId) => {
        // Logic to request the food
        try {
            const res = await axios.post(
                `http://localhost:8080/api/v1/requests/request-food`,
                { foodPostId: foodId, receiverId: user._id }  // Sending foodPostId and logged-in user ID as receiver
            );
            // Optionally, refetch user requests to update the button state
            setUserRequests([...userRequests, res.data]);
            window.location.reload();  // Reload the page to update the button state
        } catch (error) {
            console.error('Failed to request food', error);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Available Food</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {foodPosts.map(food => (
                    <div key={food._id} className="bg-white p-4 shadow-md rounded-md">
                        <h2 className="text-xl font-semibold">{food.foodName}</h2>
                        <p>{food.description}</p>
                        <p><strong>Quantity:</strong> {food.quantity}</p>
                        <p><strong>Location:</strong> {food.location}</p>
                        <p><strong>Expiry Date:</strong> {new Date(food.expiryDate).toLocaleString()}</p>
                        <p><strong>Organization:</strong> {food.donor.organizationName || 'Individual Donor'}</p>

                        {/* Only show Request Food button if user is logged in and their role is 'Receiver' */}
                        {user && user.role === 'Receiver' && (
                            <button 
                                onClick={() => handleRequest(food._id)}
                                disabled={hasRequestedFood(food._id)}  // Disable button if already requested
                                className={`mt-4 w-full py-2 px-4 text-white rounded-md transition 
                                    ${hasRequestedFood(food._id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {hasRequestedFood(food._id) ? 'Already Requested' : 'Request Food'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
