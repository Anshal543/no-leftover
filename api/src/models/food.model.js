// models/foodPostModel.js
import mongoose from 'mongoose';

const foodPostSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    foodName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Available', 'Claimed'],
        default: 'Available',
    },
}, {
    timestamps: true,
});

export const FoodPost = mongoose.model('FoodPost', foodPostSchema);

