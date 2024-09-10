import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = e.target.message.value;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<>
			<form
				className='flex items-center gap-3 p-2 sticky bottom-2 '
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					placeholder='Say Hi...👋'
					className='input shadow-2xl shadow-neutral input-bordered border-neutral rounded-lg w-full max-w-auto'
					name='message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					autoComplete='off'
				/>
				<button
					type='submit'
					className='border-2 border-neutral text-white rounded-full bg-neutral hover:bg-neutral-content hover:text-black p-4'
				>
					<IoSend />
				</button>
			</form>
		</>
	);
};

export default MessageInput;
