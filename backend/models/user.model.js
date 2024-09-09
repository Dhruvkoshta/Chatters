import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
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
		gender: {
			type: String,
			enum: ["Male", "Female"],
			required: true,
		},
		profilePic: {
			type: String,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		verificationCode: String,
		verificationCodeExpiry: Date,
	},
	{ timeStamps: true }
);

export const User = mongoose.model("User", userSchema);
