import React, { useEffect, useRef } from "react";
import { useConversationContext } from "../../context/ConversationContext";
import MessageBubble from "./MessageBubble";
import useGetMessages from "../../hooks/useGetMessages";
import useListernMessages from "../../hooks/useListernMessages";
import Loader from "../Loader";

const Messages = () => {
	const messagesEndRef = useRef(null);
	const { messages, selectedConversation } = useConversationContext();
	const { loading, getMessages } = useGetMessages();

	useListernMessages();

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		getMessages();
	}, [selectedConversation]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className='w-full min-h-screen overflow-scroll flex flex-col flex-1 justify-end '>
			{loading ? (
				<Loader />
			) : (
				messages &&
				messages.map((message) => (
					<MessageBubble
						message={message}
						selectedConversation={selectedConversation}
						key={message._id}
					/>
				))
			)}

			<div ref={messagesEndRef} />
		</div>
	);
};

export default Messages;
