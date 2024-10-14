// models/requestModel.js
import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodPost',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  pickupTime: {
    type: Date, // Filled when request is accepted
  },
});

export const Request = mongoose.model('Request', requestSchema);

