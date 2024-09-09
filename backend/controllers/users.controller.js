import { User } from "../models/user.model.js";

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
