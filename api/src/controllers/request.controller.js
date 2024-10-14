// controllers/requestController.js
import { Request } from '../models/request.model.js';
import { FoodPost } from '../models/food.model.js';

export const requestFood = async (req, res) => {
    const { foodPostId } = req.body;

    try {
        // Check if food is available
        const foodPost = await FoodPost.findById(foodPostId);
        if (!foodPost || foodPost.status !== 'Available') return res.status(400).json({ message: 'Food not available' });

        const newRequest = await Request.create({
            receiver: req.userId, // Authenticated user ID
            foodPost: foodPostId,
        });

        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};


// controllers/requestController.js
export const getDonorRequests = async (req, res) => {
    try {
      // Step 1: Find all FoodPosts for the donor
      const foodPosts = await FoodPost.find({ donor: req.userId }).select('_id');
  
      // Step 2: Use the FoodPost IDs to find corresponding requests
      const requests = await Request.find({ foodPost: { $in: foodPosts.map(post => post._id) } })
        .populate('receiver', 'name')
        .populate('foodPost', 'foodName');
  
      // Respond with the list of requests
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };


// controllers/requestController.js
export const acceptRequest = async (req, res) => {
    const { requestId, foodPostId } = req.body;

    try {
        // Find request
        const request = await Request.findById(requestId);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Update request status to 'Accepted'
        request.status = 'Accepted';
        await request.save();

        // Update food post status to 'Claimed'
        const foodPost = await FoodPost.findById(foodPostId);
        if (!foodPost) return res.status(404).json({ message: 'Food post not found' });

        foodPost.status = 'Claimed';
        await foodPost.save();

        res.status(200).json({ message: 'Request accepted and food claimed', request, foodPost });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};


// controllers/requestController.js
export const rejectRequest = async (req, res) => {
    const { requestId } = req.body;

    try {
        // Find request
        const request = await Request.findById(requestId);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Update request status to 'Rejected'
        request.status = 'Rejected';
        await request.save();

        res.status(200).json({ message: 'Request rejected', request });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
