import { User } from "../models/user.model.js";

import bcryptjs from "bcryptjs";

export const getUserForSidebar = async (req, res) => {
	try {
		const loggedInUserId = await req.userId;
		const allUsers = await User.find({
			_id: { $ne: loggedInUserId }, //remove us
		}).select("-password");
		res.status(200).json({ message: "Users retrieved successfully", allUsers });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error getting user for sidebar" });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { id, name, email, password } = req.body;
		if (!id || !name || !email) {
			return res.status(400).json({ message: "Please provide all the fields" });
		}
		const user = await User.findById(id).exec();
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const duplicate = await User.findOne({ name, email }).lean().exec();
		if (duplicate && duplicate._id.toString() !== id.toString()) {
			return res.status(409).json({ message: "Duplicate username or email" });
		}
		user.name = name;
		user.email = email;

		if (password) {
			const hashedPassword = await bcryptjs.hash(password, 10);
			user.password = hashedPassword;
		}
		const updatedUser = await user.save();
		res.status(200).json({
			message: "User updated successfully",
			user: {
				...updatedUser._doc,
				password: null,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error updating user" });
	}
};
