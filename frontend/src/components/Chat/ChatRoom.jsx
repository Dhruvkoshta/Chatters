import React, { useEffect } from "react";
import ChatNavbar from "./ChatNavbar";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { LuMessagesSquare } from "react-icons/lu";
import { useConversationContext } from "../../context/ConversationContext";
import { useAuthContext } from "../../context/AuthContext";

const ChatRoom = () => {
	const { selectedConversation, setSelectedConversation } =
		useConversationContext();
	useEffect(() => {
		//Clean up
		return () => {
			setSelectedConversation(null);
		};
	}, []);
	return (
		<>
			<ChatNavbar selectedConversation={selectedConversation} />
			{selectedConversation ? (
				<>
					<div className='flex flex-col w-full'>
						<Messages />
						<MessageInput />
					</div>
				</>
			) : (
				noChatSelected()
			)}
		</>
	);
};

export default ChatRoom;

const noChatSelected = () => {
	const { user } = useAuthContext();
	return (
		<div
			className='flex flex-col w-full h-full gap-4 justify-center items-center mt-16 lg:mt-0  
		'
		>
			<h1 className='text-3xl'>Welcome 👋 {user.user.name} </h1>
			<h2 className='text-xl'>Select a chat to start messaging</h2>
			<LuMessagesSquare className='text-5xl mt-4' />
		</div>
	);
};
