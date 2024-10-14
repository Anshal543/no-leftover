// routes/requestRoutes.js
import express from 'express';
import { requestFood, getDonorRequests, acceptRequest, rejectRequest } from '../controllers/request.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/request', verifyToken, requestFood);
router.get('/donor-requests', verifyToken, getDonorRequests);
router.patch('/accept', verifyToken, acceptRequest);
router.patch('/reject', verifyToken, rejectRequest);


export default router;
