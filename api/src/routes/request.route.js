// routes/requestRoutes.js
import express from 'express';
import { requestFood, getDonorRequests, acceptRequest, rejectRequest,getRequestedFood } from '../controllers/request.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/request-food', verifyToken, requestFood);
router.get('/donor-requests', verifyToken, getDonorRequests);
router.patch('/accept', verifyToken, acceptRequest);
router.patch('/reject', verifyToken, rejectRequest);
router.get('/get-requested-food/:userId', verifyToken, getRequestedFood);


export default router;
