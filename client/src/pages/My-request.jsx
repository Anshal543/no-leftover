import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/User-context';

const MyRequests = () => {
    const [myRequests, setMyRequests] = useState([]);
    const {user} = useUser()
    console.log(myRequests)

    useEffect(() => {
        // Fetch receiver requests
        const fetchRequests = async () => {
           const {data} = await axios.get(`http://localhost:8080/api/v1/requests/get-requested-food/${user._id}`)
            setMyRequests(data);
        };

        fetchRequests();
    }, []);

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">My Requests</h1>
            {myRequests.map(request => (
                <div key={request._id} className="bg-white p-4 shadow-md rounded-md mb-4">
                    <p><strong>Food:</strong> {request.foodPost.foodName}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    {request.status === 'Accepted' && (
                        <p><strong>Pickup Time:</strong> {new Date(request.pickupTime).toLocaleString()}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MyRequests;
