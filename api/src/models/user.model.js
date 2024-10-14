// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Donor', 'Receiver'],
        required: true,
        default: 'Receiver',
    },
    organizationName: {
        type: String, 
        trim: true,
    },
    location: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
});

export const User = mongoose.model('User', userSchema);

