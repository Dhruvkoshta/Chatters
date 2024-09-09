import { useState } from "react";
import { useConversationContext } from "../context/ConversationContext";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } =
		useConversationContext();
	const getMessages = async () => {
		try {
			setLoading(true);
			const res = await axios.get(
				`${import.meta.env.VITE_APP_URL}/api/messages/${
					selectedConversation._id
				}`
			);
			setMessages(res.data.messages);
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { loading, getMessages };
};

export default useGetMessages;
