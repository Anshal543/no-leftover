import { FoodPost} from '../models/food.model.js';

export const createFoodPost = async (req, res) => {
    try {
        const { foodName, description, quantity, location, expiryDate } = req.body;
        const donor = req.userId;
        const newFoodPost = await FoodPost.create({
            donor,
            foodName,
            description,
            quantity,
            location,
            expiryDate,
        });
        res.status(201).json({
            success: true,
            message: "Food Post Created Successfully",
            foodPost: newFoodPost,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// controllers/foodPostController.js
export const getAllFoodPosts = async (req, res) => {
    try {
      const foodPosts = await FoodPost.find({ status: 'Available' }).populate('donor', 'name organizationName location');
      res.status(200).json(foodPosts);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  