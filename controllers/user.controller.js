import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.model.js'
import dotenv from 'dotenv';
import { generateTokens } from "../utils/tokenGenerator.js";

dotenv.config();
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = generateTokens(user,res);


        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}


export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Welcome to your profile", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}


export const logoutUser = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
        });

        res.json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
