import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext";

const useListernMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversationContext();

	useEffect(() => {
		if (socket) {
			socket.on("newMessage", (newMessage) => {
				setMessages([...messages, newMessage]);
			});
		}
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};

export default useListernMessages;
