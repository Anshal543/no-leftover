// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const registerUser = async (req, res, next) => {
    const { name, email, password, role, organizationName, location } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            organizationName,
            location,
        })

        // Generate token

        res.status(201).json({ newUser });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ email: existingUser.email, _id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })
        res.cookie("token", token, { httpOnly: true }).json({ message: "Login successful" })
    } catch (error) {
        next(error);

    }
}

export const logoutUser = async (req, res, next) => {

    try {
        res.clearCookie("token").json({ message: "Logout successful" })

    } catch (error) {
        next(error)
    }
}

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // const {id} = req.params;

        if (!token) {
            return res.status(401).json({ message: "you dont have any user" })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...rest } = user._doc;

        res.status(200).json({ rest });
    }
    catch (error) {
        next(error);
    }

}