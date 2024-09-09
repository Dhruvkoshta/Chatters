import { User } from "../models/user.model.js";
import express from "express";
import bcryptjs from "bcryptjs";
import { generateTokenAndCookie } from "../utils/generateTokenAndCookie.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const authRoutes = express.Router();

authRoutes.get("/check-auth", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ success: true, user });
	} catch (error) {
		res.status(500).json({ message: "Error checking auth" });
	}
});

authRoutes.post("/register", async (req, res) => {
	const { name, email, password, gender } = req.body;
	try {
		if (!name || !email || !password || !gender) {
			return res.status(400).json({ message: "Please provide all the fields" });
		}
		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await bcryptjs.hash(password, 10);
		const malePic = `https://ui-avatars.com/api/?name=${name}`;
		const femalePic = `https://ui-avatars.com/api/?name=${name}`;

		const user = new User({
			name,
			email,
			password: hashedPassword,
			gender,
			profilePic: gender === "Male" ? malePic : femalePic,
		});

		await user.save();

		generateTokenAndCookie(res, user._id);

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			user: {
				...user._doc,
				password: null,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error registering user" });
	}
});

authRoutes.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const isPasswordCorrect = await bcryptjs.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "Incorrect password" });
		}
		generateTokenAndCookie(res, user._id);

		user.lastLogin = Date.now();
		await user.save();

		res.status(200).json({
			success: true,
			message: "User logged in successfully",
			user: {
				...user._doc,
				password: null,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error logging in" });
	}
});

authRoutes.post("/logout", async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "User logged out successfully" });
});
