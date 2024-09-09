import { createContext, useContext, useState } from "react";

export const ConversationContext = createContext();

export const useConversationContext = () => useContext(ConversationContext);

export const ConversationContextProvider = ({ children }) => {
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [messages, setMessages] = useState([]);
	return (
		<ConversationContext.Provider
			value={{
				selectedConversation,
				setSelectedConversation,
				messages,
				setMessages,
			}}
		>
			{children}
		</ConversationContext.Provider>
	);
};
