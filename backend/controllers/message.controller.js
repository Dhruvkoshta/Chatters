import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/messages.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.userId;

		let conversation = await Conversation.findOne({
			participants: {
				$all: [senderId, receiverId],
			},
		});
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});
		await conversation.messages.push(newMessage._id);

		//run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		//socket io funtions
		const recieverSocketId = getRecieverSocketId(receiverId);
		if (recieverSocketId) {
			io.to(recieverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json({ message: "Message sent successfully", newMessage });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Error sending message" });
	}
};

export const getMessage = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.userId;
		const conversation = await Conversation.findOne({
			participants: {
				$all: [senderId, userToChatId],
			},
		}).populate("messages");
		if (!conversation) {
			return res.status(200).json([]);
		}
		const messages = conversation.messages;
		res.status(200).json({
			message: "Message retrieved successfully",
			messages,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Error retrieving message" });
	}
};
