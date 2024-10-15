import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [pickupTime, setPickupTime] = useState("");

  useEffect(() => {
    // Fetch donor requests
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/requests/donor-requests"
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequest = async (requestId, foodPostId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/requests/accept`,
        {
          requestId,
          foodPostId,
          pickupTime,
        }
      );
      const updatedRequest = response.data.request; // Assuming your API returns the updated request

      // Update state without needing to reload
      setRequests(
        requests.map((req) => (req._id === requestId ? updatedRequest : req))
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to update request", error);
    }
  };

  const handleRequestReject = async (requestId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/requests/reject`,
        {
          requestId,
        }
      );
      const updatedRequest = response.data.request; // Assuming your API returns the updated request

      // Update state without needing to reload
      setRequests(
        requests.map((req) => (req._id === requestId ? updatedRequest : req))
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to update request", error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-4">{request.foodPost.foodName}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Receiver:</strong> {request.receiver.name}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  request.status === "Accepted"
                    ? "text-green-500"
                    : request.status === "Rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                } font-bold`}
              >
                {request.status}
              </span>
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Time
              </label>
              <input
                type="datetime-local"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleRequest(request._id, request.foodPost._id)}
                className={`w-full px-4 py-2 rounded-md font-medium text-white ${
                  request.status === "Accepted"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={
                  request.status === "Accepted" || request.status === "Rejected"
                }
              >
                Accept
              </button>

              <button
                onClick={() => handleRequestReject(request._id)}
                className={`w-full px-4 py-2 rounded-md font-medium text-white ${
                  request.status === "Rejected"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={
                  request.status === "Accepted" || request.status === "Rejected"
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRequest;
