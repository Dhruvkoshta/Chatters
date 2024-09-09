import React from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext.jsx";

const DrawerItem = ({ conversation }) => {
	const { selectedConversation, setSelectedConversation } =
		useConversationContext();
	let isSelected = false;
	if (selectedConversation) {
		isSelected = selectedConversation._id === conversation._id;
	}

	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<li
				className={`${
					isSelected ? "bg-neutral text-white " : ""
				} flex items-center justify-start gap-4 hover:bg-neutral hover:text-white p-2 rounded-lg cursor-pointer mb-2`}
				onClick={() => {
					setSelectedConversation(conversation);
				}}
			>
				<div className={`avatar ${isOnline ? "online" : " "} w-10 h-10`}>
					<img
						src={conversation.profilePic}
						alt='avatar '
						className=' rounded-full'
					/>
				</div>
				<p>{conversation.name}</p>
			</li>
			<div className='divider my-1 p-0 h-0.5'></div>
		</>
	);
};

export default DrawerItem;
