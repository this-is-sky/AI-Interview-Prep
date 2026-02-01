import {Router} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import type { AuthRequest } from "../middleware/auth.middleware.js"
import crypto from "crypto"

const router = Router();

// Validation helper
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
    // At least 6 characters, 1 uppercase, 1 number
    return password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password);
}

router.post("/register", async (req, res)=>{
    try {
        const {name, email, password, confirmPassword} = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({message: "Please enter a valid email address"});
        }

        if (password !== confirmPassword) {
            return res.status(400).json({message: "Passwords do not match"});
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({message: "Password must be at least 6 characters with 1 uppercase letter and 1 number"});
        }

        // Check if user already exists
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if (existingUser) {
            return res.status(400).json({message: "Email already registered. Please login or use a different email"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });

        // In production, send verification email here
        // For now, we'll auto-verify to keep it simple
        await User.findByIdAndUpdate(user._id, {isEmailVerified: true, verificationToken: null});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
        res.json({token, message: "Registration successful!"});
    } catch (error: any) {
        console.error("Register error:", error);
        res.status(500).json({message: "Registration failed. Please try again."});
    }
});

router.post("/login", async (req, res)=>{
    try {
        const {email, password} = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({message: "Please enter a valid email address"});
        }

        const user = await User.findOne({email: email.toLowerCase()});
        
        if(!user || !user.password) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        if (!user.isEmailVerified) {
            return res.status(401).json({message: "Please verify your email first"});
        }

        const match = await bcrypt.compare(password, user.password as string);
        if(!match) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
        res.json({token, message: "Login successful!"});
    } catch (error: any) {
        console.error("Login error:", error);
        res.status(500).json({message: "Login failed. Please try again."});
    }
});

router.get("/profile", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const user = await User.findById(req.user!.id).select("-password -verificationToken");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
});

export default router;