import { useState } from "react";
import { useConversationContext } from "../context/ConversationContext";
import axios from "axios";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } =
		useConversationContext();
	const sendMessage = async (message) => {
		try {
			setLoading(true);
			const res = await axios.post(
				`${import.meta.env.VITE_APP_URL}/api/messages/send/${
					selectedConversation._id
				}`,
				{
					message,
				}
			);
			setMessages([...messages, res.data.newMessage]);
			setLoading(false);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return {
		loading,
		sendMessage,
	};
};
export default useSendMessage;
