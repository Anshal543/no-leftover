// routes/foodPostRoutes.js
import express from 'express';
import { createFoodPost, getAllFoodPosts } from '../controllers/food.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-food', verifyToken, createFoodPost);
router.get('/get-food', getAllFoodPosts);

export default router;
