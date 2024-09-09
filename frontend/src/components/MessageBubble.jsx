import React from "react";
import { extractTime } from "../utils/DateTimeFormat";
import { useAuthContext } from "../context/AuthContext";
const MessageBubble = ({ message, selectedConversation }) => {
	const { user } = useAuthContext();
	const sent = message.senderId === selectedConversation._id;
	return (
		<div className={`chat ${sent ? "chat-start" : "chat-end"}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img
						alt='Tailwind CSS chat bubble component'
						src={sent ? selectedConversation.profilePic : user.user.profilePic}
					/>
				</div>
			</div>
			{/* Name  */}
			<div className='chat-header'>
				{sent ? selectedConversation.name : user.user.name}
			</div>
			{/* Message */}
			<div className='chat-bubble'>{message.message}</div>
			{/* Time */}
			<div className='chat-footer opacity-50 justify-between'>
				Delivered{" "}
				<time className='text-xs opacity-50'>
					{extractTime(message.createdAt)}
				</time>
			</div>
		</div>
	);
};

export default MessageBubble;
