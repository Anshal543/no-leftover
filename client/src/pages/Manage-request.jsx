import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageRequest = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch donor requests
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/requests/donor-requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Failed to fetch requests', error);
            }
        };

        fetchRequests();
    }, []);

    const handleRequest = async (requestId, foodPostId) => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/v1/requests/accept`, {
                requestId,
                foodPostId
            });
            const updatedRequest = response.data.request; // Assuming your API returns the updated request
            
            // Update state without needing to reload
            setRequests(requests.map(req => req._id === requestId ? updatedRequest : req));
               window.location.href = "/"
        } catch (error) {
            console.error('Failed to update request', error);
        }
    };

    const handleRequestReject = async (requestId) => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/v1/requests/reject`, {
                requestId
            });
            const updatedRequest = response.data.request; // Assuming your API returns the updated request
            
            // Update state without needing to reload
            setRequests(requests.map(req => req._id === requestId ? updatedRequest : req));
            window.location.href = "/"
        } catch (error) {
            console.error('Failed to update request', error);
        }
    }

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Manage Requests</h1>
            {requests.map(request => (
                <div key={request._id} className="bg-white p-4 shadow-md rounded-md mb-4">
                    <p><strong>Receiver:</strong> {request.receiver.name}</p>
                    <p><strong>Food:</strong> {request.foodPost.foodName}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    <div className="space-x-4">
                        <button 
                            onClick={() => handleRequest(request._id, request.foodPost._id)} 
                            className={`px-4 py-2 rounded-md ${request.status === 'Accepted' ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white`} 
                            disabled={request.status === 'Accepted' || request.status === 'Rejected'}
                        >
                            Accept
                        </button>
                        <button 
                            onClick={() => handleRequestReject(request._id)} 
                            className={`px-4 py-2 rounded-md ${request.status === 'Rejected' ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white`} 
                            disabled={request.status === 'Accepted' || request.status === 'Rejected'}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManageRequest;
