import React, { useState } from "react";
import { IoDocumentAttachOutline, IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { IoMdAttach } from "react-icons/io";
import { FaImage } from "react-icons/fa6";

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
				<div className='dropdown dropdown-top'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-neutral rounded-full '
					>
						<IoMdAttach className='text-lg' />
					</div>
					<ul
						tabIndex={0}
						className='dropdown-content bg-neutral-content menu rounded-box z-[1] w-40 p-2 m-4 shadow'
					>
						<li>
							<button className='dropdown-item'>
								<FaImage />
								Image
							</button>
						</li>
						<li>
							<button className='dropdown-item'>
								<IoDocumentAttachOutline />
								Document
							</button>
						</li>
					</ul>
				</div>
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
